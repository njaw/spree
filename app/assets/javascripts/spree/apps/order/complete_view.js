SpreeStore.module('Order',function(Order, SpreeStore, Backbone,Marionette,$,_){
  Order.completeView = Backbone.Marionette.ItemView.extend({
    template: '#order-template'
  })
})