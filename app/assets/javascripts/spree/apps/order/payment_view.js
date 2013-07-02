SpreeStore.module('Order',function(Order, SpreeStore, Backbone,Marionette,$,_){
  Order.paymentView = Backbone.Marionette.ItemView.extend({
    template: '#order-payment-template',

    events: {
      "submit .edit_order": "updateOrder",
    },

    updateOrder: function(e) {
      e.stopPropagation();
      e.preventDefault();
      $(e.target).find("input[type='submit']").slideUp(function() {
        $('#checkout #loading').show();  
      });
      if (this.validate()) {
        // TODO: Doing it this way because I don't know how to deal with nested attrs in Backbone
        var data = Backbone.Syphon.serialize(this)
        data['order_token'] = SpreeStore.current_order_token
        $.ajax({
          type: 'PUT',
          dataType: 'json',
          url: '/store/api/checkouts/' + this.model.attributes.number,
          data: data,
          success: function(data) {
            var order = new SpreeStore.Models.Order(data)
            SpreeStore.Order.Controller.renderFor(order)
          },
          error: function(xhr) {
            alert(xhr.responseText)
          }
        })
      }
    },

    validate: function() {
      return true;
    }
  })
})