SpreeStore.module('Checkout',function(Checkout, SpreeStore, Backbone,Marionette,$,_){
  Checkout.deliveryView = Backbone.Marionette.ItemView.extend({
    template: '#order-delivery-template',

    templateHelpers: {
      displayImage: SpreeStore.helpers.displayImage
    },

    events: {
      "submit .edit_order": "updateOrder",
      "click .shipping-methods input[type='radio']": "hideValidation"
    },

    updateOrder: function(e) {
      $(e.target).attr('disabled', 'disabled');
      e.stopPropagation();
      e.preventDefault();
      if (this.validate()) {
        var data = Backbone.Syphon.serialize(this)
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
            alert(xhr.responseText);
            $(e.target).attr('disabled', '');
          }
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
          $(e.target).attr('disabled', '');
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