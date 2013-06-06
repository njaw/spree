SpreeStore.module('Products.List',function(ProductsList, SpreeStore, Backbone,Marionette,$,_){
  ProductsList.ProductPreview = Backbone.Marionette.ItemView.extend({
    tagName: 'li',
    template: "#product-preview-template",
    className: 'product',

    events: {
      "click": "viewProduct"
    },

    viewProduct: function (e) {
      e.preventDefault();
      e.stopPropagation();
      Backbone.history.navigate("/products/" + this.model.id)
      this.trigger("product:view", this.model)
    },

    templateHelpers: {
      small_image_url: function() {
        return this.variants[0].images[0].small_url
      }
    }
  });

  ProductsList.ProductsView = Backbone.Marionette.CollectionView.extend({
    tagName: "ul",
    id: "products",
    className: "inline product-listing",
    template: "#products-template",
    itemView: ProductsList.ProductPreview
  });
});