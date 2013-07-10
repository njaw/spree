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
          SpreeStore.mainRegion.show(product_view)
        }
      })
    }
  }
});