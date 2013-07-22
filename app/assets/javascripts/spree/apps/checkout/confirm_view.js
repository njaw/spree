SpreeStore.module('Checkout',function(Checkout, SpreeStore, Backbone,Marionette,$,_){
  Checkout.confirmView = Backbone.Marionette.ItemView.extend({
    template: '#order-confirm-template',

    templateHelpers: {
      displayImage: SpreeStore.helpers.displayImage
    },

    events: {
      "click .continue": "updateOrder",
    },

    updateOrder: function(e) {
      $(e.target).attr('disabled', true)
      e.stopPropagation();
      e.preventDefault();
      data = {} // There is no data to be submitted on the confirmation screen
      data['order_token'] = SpreeStore.currentOrderToken
      $.ajax({
        type: 'PUT',
        dataType: 'json',
        url: '/store/api/checkouts/' + this.model.attributes.number,
        data: data,
        success: function(data) {
          var order = new SpreeStore.Models.Order(data)
          SpreeStore.Checkout.Controller.renderFor(order)
        },
        error: function(xhr) {
          alert(xhr.responseText)
          $(e.target).attr('disabled', false)
        }
      })
    },
  })
})