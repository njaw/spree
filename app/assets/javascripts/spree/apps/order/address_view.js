SpreeStore.module('Order',function(Order, SpreeStore, Backbone,Marionette,$,_){
  Order.addressView = Backbone.Marionette.ItemView.extend({
    template: '#order-address-template',

    events: {
      "submit .edit_order": "updateOrder",
      "change #bcountry select": "updateStates",
      "change #order_use_billing": "useBilling"
    },

    onShow: function() {
      // TODO: I didn't do this with a Backbone.Collection because it was too hard.
      // Seriously.
      $.get('/store/api/countries', { per_page: 1000 }, function(data) {
        console.log(data)
         _.each(data.countries, function(country) {
          console.log("appending " + country.name)
          option_tag = "<option value='" + country.id + "'>" + country.name + "</option>"
          $('#bcountry select').append(option_tag)  
          $('#scountry select').append(option_tag)  
          $('#bcountry select').val(Spree.Settings.default_country_id).change();
        })
      })
    },

    useBilling: function(e) {
      var shipping_inner = $('#shipping .inner')
      if ($(e.target).is(':checked')) {
        shipping_inner.hide()
        shipping_inner.find("input, select").prop('disabled', true)
      } else {
        shipping_inner.show()
        shipping_inner.find("input, select").prop('disabled', false)
      }
    },

    updateStates: function(e) {
      $.get('/store/api/states', { country_id: e.target.value, per_page: 100 },
        function(data) {
          var fieldset = $(e.target).parents("fieldset")
          var states_select = fieldset.find(".states")
          var states_input = fieldset.find("input.state_name")
          if (data.states.length > 0) {
            _.each(data.states, function(state) {
              option_tag = "<option value='" + state.id + "'>" + state.name + "</option>"
              states_select.append(option_tag)
            })
            states_select.show();
            states_input.hide();
          } else {
            states_input.show();
            states_select.hide();
          }
        }
      )
    },

    updateOrder: function(e) {
      // TODO: Doing it this way because I don't know how to deal with nested attrs in Backbone
      // jQuery is easier, again.
      var data = Backbone.Syphon.serialize(this)
      data['order_token'] = SpreeStore.current_order_token
      console.log(this.model.attributes.number)
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
          var errors = JSON.parse(xhr.responseText).errors
          var error_markup = _.template($('#errors_template').text(), { errors: errors })
          $('#errorExplanation').show().html(error_markup)
        }
      })
      e.preventDefault();
      // this.render();
    }
  })
})