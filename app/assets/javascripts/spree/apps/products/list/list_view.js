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
      SpreeStore.navigate("/products/" + this.model.id)
      this.trigger("product:view", this.model)
    },

    templateHelpers: {
      displayImage: function(type) {
        if (this.variants[0].images[0]) {
          return this.variants[0].images[0][type + '_url'];
        } else {
          return "/assets/noimage/" + type + ".png";
        }
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