SpreeStore.module('Cart',function(Cart, SpreeStore, Backbone,Marionette,$,_){
  Cart.Controller = {
    showCartInfo: function() {
      if (SpreeStore.current_order_id !== undefined) {
        model = new SpreeStore.Entities.Order({ 
          id: SpreeStore.current_order_id,
          total_quantity: window.localStorage['total_quantity'],
          display_item_total: window.localStorage['display_item_total']
        })
        var cart_view = new Cart.CartView({
          model: model
        })
        SpreeStore.cartInfo.show(cart_view)
      }
    },
    addToCart: function(id, quantity) {
      if (SpreeStore.current_order_id === undefined) {
        Cart.Controller.newCheckout(id, quantity)
      } else {
        Cart.Controller.updateOrder(id, quantity)
      }
    },

    newCheckout: function(id, quantity) {
      $.ajax({
        type: 'POST', 
        url: '/store/api/checkouts',
        data: {
          order: {
            line_items_attributes: [
              {
                variant_id: id,
                quantity: quantity
              }
            ]
          }
        },
        success: function(data) {
          Cart.Controller.updateCart(data)
        }
      })
    },

    updateOrder: function(id, quantity) {
      $.ajax({
        type: 'PUT', 
        url: '/store/api/orders/' + SpreeStore.current_order_id,
        data: {
          order: {
            line_items_attributes: [
              {
                variant_id: id,
                quantity: quantity
              }
            ]
          }
        },
        success: function(data) {
          Cart.Controller.updateCart(data)
        }
      })
    },

    updateCart: function(data) {
      window.localStorage['current_order_id'] = SpreeStore.current_order_id = data.number
      window.localStorage['total_quantity'] = data.total_quantity
      window.localStorage['display_item_total'] = data.display_item_total
      
      model = new SpreeStore.Entities.Order(data)
      cart_view = new Cart.CartView({
        model: model
      })
      $(cart_view.el).animate({opacity: 0.25})
      SpreeStore.cartInfo.show(cart_view)
      $(cart_view.el).animate({opacity: 1})
    }
  }
})