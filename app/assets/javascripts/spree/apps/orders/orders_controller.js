SpreeStore.module('Orders',function(Orders, SpreeStore, Backbone,Marionette,$,_){
  Orders.Controller = {
    show: function(number) {
      order = new SpreeStore.Models.Order({ number: number })
      order.fetch({
        data: {
          order_token: SpreeStore.current_order_token
        },
        success: function(data) {
          view = new SpreeStore.Orders.ShowView({ model: order})
          SpreeStore.mainRegion.show(view)
        }
      })
    }
  }
})