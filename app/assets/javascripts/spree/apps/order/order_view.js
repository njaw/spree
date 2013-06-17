SpreeStore.module('Order',function(Order, SpreeStore, Backbone,Marionette,$,_){
  Order.View = Backbone.Marionette.ItemView.extend({
    getTemplate: function() {
      return '#order-' + this.model.get('state') + '-template'
    },

    events: {
      "click .continue": "updateOrder"
    },

    updateOrder: function(e) {
      e.stopPropagation();
      e.preventDefault();
      this.model.save({
        data: $.param({ order_token: SpreeStore.current_order_token, order: $('edit_order').serialize() }),
        success: function() {
          console.log('hi')
        },
        fail: function() {
          console.log('bye') 
        }
      })
      this.render();
    }
  })
})