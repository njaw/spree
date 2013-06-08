SpreeStore.module('Products.List',function(ProductsList, SpreeStore, Backbone,Marionette,$,_){
  ProductsList.Controller = {
    listProducts: function() {
      var products = new SpreeStore.Entities.Products;
      products.fetch();
      var products_list_view = new ProductsList.ProductsView({
        collection: products
      });

      products_list_view.on("itemview:product:view", function(childView, model){
        SpreeStore.Products.Show.Controller.showProduct(model.id)
      });
      $('#sidebar').show();
      $('#content').attr('class', 'columns twelve');
      SpreeStore.mainRegion.show(products_list_view);
    }
  }
});