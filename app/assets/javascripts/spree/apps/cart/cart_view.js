SpreeStore.module('Cart',function(Cart, SpreeStore, Backbone,Marionette,$,_){
  Cart.CartInfoView = Backbone.Marionette.ItemView.extend({
    template: "#cart-info-template",
    tagName: 'a',

    events: {
      "click": "viewCart"
    },

    viewCart: function(e) {
      SpreeStore.navigate("cart", true)
      this.trigger("cart:preview")
    }
  });

  Cart.CartView = Backbone.Marionette.ItemView.extend({
    template: '#cart-template'
  })

  Cart.LineItem = Backbone.Marionette.ItemView.extend({
    tagName: 'tr',
    template: "#line-item-template",
    className: 'line-item',

    events: {
      "click .cart-item-image": "viewProduct",
      "click h4": "viewProduct"
    },

    templateHelpers: {
      displayImage: function(type) {
        if (this.variant.images[0]) {
          return this.variant.images[0][type + '_url'];
        } else {
          return "/assets/noimage/" + type + ".png";
        }
      },
      permalink: function() {
        return this.variant.permalink
      }
    },

    viewProduct: function(e) {
      var permalink = $(e.target).data('product-permalink')
      SpreeStore.navigate("/products/" + permalink, true)
      e.preventDefault();
      e.stopPropagation();
    }
  })

  Cart.LineItems = Backbone.Marionette.CompositeView.extend({
    tagName: 'table',
    id: 'cart-detail',
    template: "#line-items-template",
    itemView: Cart.LineItem
  })
});