SpreeStore.module('StoreApp',function(StoreApp, SpreeStore, Backbone,Marionette,$,_){
  StoreApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "products": "listProducts",
      "products/:id": "showProduct"
    }
  });

  var API = {
    listProducts: function() {
      SpreeStore.Products.List.Controller.listProducts();
    },

    showProduct: function(model) {
      SpreeStore.Products.Show.Controller.showProduct(model);
    }
  }

  SpreeStore.on("products:list", function() {
    SpreeStore.navigate("products")
    API.listProducts();
  })

  SpreeStore.addInitializer(function() {
    new StoreApp.Router({
      controller: API
    })
  })
})