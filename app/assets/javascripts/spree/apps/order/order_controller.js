SpreeStore.module('Order',function(Order, SpreeStore, Backbone,Marionette,$,_){
  Order.Controller = {
    show: function() {
      order = new SpreeStore.Models.Order({ number: SpreeStore.current_order_id })
      order.fetch({
        data: $.param({ order_token: SpreeStore.current_order_token}),
        success: function(data) {
          orderView = new Order.View({model: order})
          SpreeStore.mainRegion.show(orderView)
        }
      })
    }
  }
})