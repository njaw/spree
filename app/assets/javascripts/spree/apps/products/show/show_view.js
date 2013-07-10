SpreeStore.module('Products.Show',function(Show, SpreeStore, Backbone,Marionette,$,_){
  Show.Product = Backbone.Marionette.ItemView.extend({
    tagName: 'div',
    className: 'product',
    template: "#product-template",

    events: {
      "click button": "addToCart"
    },

    onShow: function() {
      $('.pagination').hide();
      SpreeStore.noSidebar()
    },

    addToCart: function (e) {
      var quantity = $(this.el).find("input").val()
      var variant_id = this.model.variants.first().id
      SpreeStore.Cart.Controller.addToCart(variant_id, quantity)
      SpreeStore.navigate("cart")
    },

    templateHelpers: {
      displayImage: SpreeStore.helpers.displayImage,
      
      thumbnails: function() {
        return _.flatten(_.map(this.variants, function(variant) {
          return _.map(variant.images, function(image) {
            return image.mini_url;
          })
        }))
      }
    }
  });
})