SpreeStore.module('Products.List',function(ProductsList, SpreeStore, Backbone,Marionette,$,_){
  ProductsList.Controller = {
    listProducts: function(page) {
      var products = new SpreeStore.Entities.Products;
      products.fetch({data: $.param({ page: page}),
        success: function(products) {
          $(".pagination").pagination({
            items: products.total_count,
            itemsOnPage: products.per_page,
            hrefTextPrefix: "#products/page/",
            currentPage: page,
            onPageClick: function(pageNumber, event) {
              SpreeStore.navigate("products/page/" + pageNumber, true)  
            }
          });
          $(".pagination").show();
        }
      });
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