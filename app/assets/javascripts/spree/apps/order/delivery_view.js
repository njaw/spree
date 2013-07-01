SpreeStore.module('Order',function(Order, SpreeStore, Backbone,Marionette,$,_){
  Order.deliveryView = Backbone.Marionette.ItemView.extend({
    template: '#order-delivery-template',

    templateHelpers: {
      displayImage: SpreeStore.helpers.displayImage
    },

    events: {
      "submit .edit_order": "updateOrder",
      "click .shipping-methods input[type='radio']": "hideValidation"
    },

    updateOrder: function(e) {
      e.stopPropagation();
      e.preventDefault();
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
        })
      }
    },

    validate: function() {
      var validation_errors = 0;
      $.each($('.shipping-methods'), function(index, shipping_method_el) {
        shipping_method_el = $(shipping_method_el);
        var validation_error = shipping_method_el.find(".validation-error");
        if (shipping_method_el.find("input[type='radio']:checked").length == 0) {
          validation_errors++;
          validation_error.show();
        } else {
          validation_error.hide();
        }
      })

      return (validation_errors == 0 ? true : false)
    },

    // Hide the validation if it's there.
    hideValidation: function(e) {
      $(e.target).parents('.shipping-methods').find('.validation-error').slideUp();
    }
  })
})