SpreeStore.module('Checkout',function(Checkout, SpreeStore, Backbone,Marionette,$,_){
  Checkout.paymentView = Backbone.Marionette.ItemView.extend({
    template: '#order-payment-template',

    events: {
      "submit .edit_order": "updateOrder",
      "change .payment-method": "updatePaymentMethod"
    },

    onShow: function() {
      $('.payment-method').first().attr("checked", "checked").trigger("change")
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
            SpreeStore.Checkout.Controller.renderFor(order)
          },
          error: function(xhr) {
            alert(xhr.responseText)
          }
        })
      }
    },

    validate: function() {
      return true;
    },

    updatePaymentMethod: function(e) {
      var target = $(e.target);
      var method_type = target.data("payment-method-type");
      var id_pieces = target.attr('id').split("-");
      var id = id_pieces[id_pieces.length-1];
      template = _.template($('#order-' + method_type + '-payment-method-template').html(), { payment_method_id: id, order: this.model.attributes })
      console.log(template)
      $('#payment-method-info').html(template)
    }
  })
})