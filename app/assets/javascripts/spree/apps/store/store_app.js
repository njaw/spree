SpreeStore.module('StoreApp',function(StoreApp, SpreeStore, Backbone,Marionette,$,_){
  StoreApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "products": "listProducts",
      "products/:id": "showProduct",
      "products/page/:number": "listProducts"
    }
  });

  var API = {
    listProducts: function(pageNumber) {
      SpreeStore.Taxonomies.List.Controller.listTaxonomies();
      SpreeStore.Products.List.Controller.listProducts(pageNumber);
    },

    listTaxonomies: function() {
      SpreeStore.Taxonomies.List.Controller.listTaxonomies();
    },

    showProduct: function(id) {
      SpreeStore.Products.Show.Controller.showProduct(id);
    },

    showCartInfo: function() {
      SpreeStore.Cart.Controller.showCartInfo();
    }
  }

  SpreeStore.on("products:list", function() {
    SpreeStore.navigate("products")
    API.listProducts();
    API.listTaxonomies();
  })

  SpreeStore.addInitializer(function() {
    new StoreApp.Router({
      controller: API
    })
    API.showCartInfo();
  })
})