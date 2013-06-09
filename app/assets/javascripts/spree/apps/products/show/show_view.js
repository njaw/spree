SpreeStore.module('Products.Show',function(Show, SpreeStore, Backbone,Marionette,$,_){
  Show.Product = Backbone.Marionette.ItemView.extend({
    tagName: 'div',
    className: 'product',
    template: "#product-template",

    events: {
      "click button": "addToCart"
    },

    addToCart: function (e) {
      var quantity = $(this.el).find("input").val()
      this.trigger("product:addToCart", this.model.id, quantity)
    },

    templateHelpers: {
      displayImage: function(type) {
        if (this.variants[0].images[0]) {
          return this.variants[0].images[0][type + '_url'];
        } else {
          return "/assets/noimage/" + type + ".png";
        }
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