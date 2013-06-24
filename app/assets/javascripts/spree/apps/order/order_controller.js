SpreeStore.module('Order',function(Order, SpreeStore, Backbone,Marionette,$,_){
  Order.Controller = {
    show: function(state) {
      SpreeStore.noSidebar()
      order = new SpreeStore.Models.Order({ number: SpreeStore.current_order_id })
      order.fetch({
        data: $.param({ order_token: SpreeStore.current_order_token}),
        success: function(order) {
          Order.Controller.renderFor(order, state)
        }
      })
    },

    renderFor: function(order, state) {
      state = state || order.attributes.state
      SpreeStore.navigate("/checkout/" + state)
      orderView = Order[state + 'View']
      if (orderView != undefined) {
        SpreeStore.mainRegion.show(new orderView({model: order}))
      } else {
        SpreeStore.navigate("/checkout/" + order.attributes.state)
        this.renderFor(order, order.attributes.state)
      }
    }
  }
})