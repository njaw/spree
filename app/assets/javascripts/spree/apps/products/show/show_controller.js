SpreeStore.module('Products.Show',function(Show, SpreeStore, Backbone,Marionette,$,_){
  Show.Controller = {
    showProduct: function(model) {
      var product_view = new Show.Product({
        model: model
      })

      SpreeStore.mainRegion.show(product_view)
    }
  }
});