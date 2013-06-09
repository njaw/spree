SpreeStore.module('Products.Show',function(Show, SpreeStore, Backbone,Marionette,$,_){
  Show.Controller = {
    showProduct: function(id) {
      product = new SpreeStore.Entities.Product({ id: id });
      product.fetch({ 
        success: function(model) {
          model.initialize()
          var product_view = new Show.Product({
            model: model
          })

          product_view.on("product:addToCart", function(model, quantity){
            SpreeStore.Cart.Controller.addToCart(model, quantity)
          });
          $('.pagination').hide();
          $('#sidebar').hide();
          $('#content').attr('class', 'columns sixteen');
          SpreeStore.mainRegion.show(product_view)
        }
      })
    }
  }
});