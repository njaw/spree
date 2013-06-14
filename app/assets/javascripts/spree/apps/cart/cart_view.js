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

  Cart.LineItem = Backbone.Marionette.ItemView.extend({
    tagName: 'tr',
    template: "#line-item-template",
    className: 'line-item',

    events: {
      "click .cart-item-image": "viewProduct",
      "click h4": "viewProduct",
      "change .line_item_quantity": "updateQuantity",
      "click .delete": "delete"
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
    },

    updateQuantity: function(e) {
      this.model.setQuantity(e.target.value);
      this.$el.find(".cart-item-total").html(this.model.get('display_total_amount'))
    },

    delete: function() {
      this.model.destroy()
    }
  })


  Cart.CartView = Backbone.Marionette.CompositeView.extend({
    template: '#cart-template',
    itemView: Cart.LineItem,
    itemViewContainer: "#line_items",

    collectionEvents: {
      "change": "updateTotalPrice"
    },

    updateTotalPrice: function(model) {
      var amount = _.reduce(model.collection.models, function(amount, line_item) {
        return amount + parseFloat(line_item.get('total'))
      }, 0)
      this.$el.find('.order-total').html(Spree.Money.format(amount))
    },

    templateHelpers: {
      line_items_total: function() {
        var amount = _.reduce(this.line_items, function(amount, line_item) {
          return amount + parseFloat(line_item.total)
         }, 0)
        return Spree.Money.format(amount);
      }
    }
  })

  Cart.EmptyCart = Backbone.Marionette.CompositeView.extend({
    template: '#empty-cart-template',

    events: {
      "click button": function() {
        SpreeStore.navigate("/products", true);
      }
    }
  })

  Cart.LineItems = Backbone.Marionette.CompositeView.extend({
    tagName: 'table',
    id: 'cart-detail',
    template: "#line-items-template",
    itemView: Cart.LineItem
  })
});