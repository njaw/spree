SpreeStore.module('Products.Show',function(Show, SpreeStore, Backbone,Marionette,$,_){
  Show.Controller = {
    showProduct: function(permalink) {
      product = new SpreeStore.Models.Product({ permalink: permalink });
      product.fetch({
        success: function(model) {
          model.initialize()
          var product_view = new Show.Product({
            model: model
          })

          product_view.on("product:addToCart", function(model, quantity){
            SpreeStore.Cart.Controller.addToCart(model, quantity)
            SpreeStore.navigate("cart")
          });
          $('.pagination').hide();
          SpreeStore.noSidebar()
          SpreeStore.mainRegion.show(product_view)
        }
      })
    }
  }
});