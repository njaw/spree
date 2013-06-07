SpreeStore.module('Products.Show',function(Show, SpreeStore, Backbone,Marionette,$,_){
  Show.Product = Backbone.Marionette.ItemView.extend({
    tagName: 'div',
    className: 'product',
    template: "#product-template",

    templateHelpers: {
      product_image_url: function() {
        return this.variants[0].images[0].product_url
      },
      mini_image_url: function() {
        return this.variants[0].images[0].mini_url
      },
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