SpreeStore.module('Cart',function(Cart, SpreeStore, Backbone,Marionette,$,_){
  Cart.CartView = Backbone.Marionette.ItemView.extend({
    template: "#cart-template",
    tagName: 'a'
  });
});