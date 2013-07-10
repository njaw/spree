SpreeStore.module('Checkout',function(Checkout, SpreeStore, Backbone,Marionette,$,_){
  Checkout.Controller = {
    show: function(state) {
      SpreeStore.noSidebar()
      order = new SpreeStore.Models.Order({ number: SpreeStore.currentOrderId })
      order.fetch({
        data: $.param({ order_token: SpreeStore.currentOrderToken}),
        success: function(order) {
          if (order.attributes.state == "complete") {
            window.localStorage.removeItem('currentOrderId');
            window.localStorage.removeItem('currentOrderToken');
            SpreeStore.navigate("/orders/" + order.attributes.number, true)
          } else {
            Checkout.Controller.renderFor(order, state)
          }
        }
      })
    },

    renderFor: function(order, state) {
      state = state || order.attributes.state
      SpreeStore.navigate("/checkout/" + state)
      orderView = Checkout[state + 'View']
      if (orderView != undefined) {
        SpreeStore.mainRegion.show(new orderView({model: order}))
      } else {
        SpreeStore.navigate("/checkout/" + order.attributes.state)
        this.renderFor(order, order.attributes.state)
      }
    }
  }
})