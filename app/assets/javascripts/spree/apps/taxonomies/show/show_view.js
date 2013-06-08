SpreeStore.module('Taxonomies.Show',function(Show, SpreeStore, Backbone,Marionette,$,_){
  Show.Taxonomy = Backbone.Marionette.ItemView.extend({
    tagName: 'div',
    className: 'taxonomy',
    template: "#taxonomy-template",

    events: {
      "click button": "addToCart"
    },

    addToCart: function (e) {
      var quantity = $(this.el).find("input").val()
      this.trigger("product:addToCart", this.model.id, quantity)
    },

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