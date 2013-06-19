SpreeStore.module('Order',function(Order, SpreeStore, Backbone,Marionette,$,_){
  Order.deliveryView = Backbone.Marionette.ItemView.extend({
    template: '#order-delivery-template',
  })
})