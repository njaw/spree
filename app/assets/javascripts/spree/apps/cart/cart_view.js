SpreeStore.module('Cart',function(Cart, SpreeStore, Backbone,Marionette,$,_){
  Cart.CartInfoView = Backbone.Marionette.ItemView.extend({
    template: "#cart-info-template",
    tagName: 'a',

    events: {
      "click": "viewCart"
    },

    viewCart: function(e) {
      SpreeStore.navigate("/cart")
      this.trigger("cart:preview")
    }
  });

  Cart.CartView = Backbone.Marionette.ItemView.extend({
    template: '#cart-template',

    templateHelpers: {
      displayImage: function(line_item, type) {
        if (line_item.variant.images[0]) {
          return line_item.variant.images[0][type + '_url'];
        } else {
          return "/assets/noimage/" + type + ".png";
        }
      },
      permalink: function(line_item) {
        return line_item.variant.permalink
      }
    }
  })
});