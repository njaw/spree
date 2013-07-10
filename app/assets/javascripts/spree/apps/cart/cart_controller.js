SpreeStore.module('Cart',function(Cart, SpreeStore, Backbone,Marionette,$,_){
  Cart.Controller = {
    showCartInfo: function() {
      if (SpreeStore.currentOrderId !== undefined) {
        model = new SpreeStore.Models.Order({
          number: SpreeStore.currentOrderId
        })
        model.fetch({
          data: $.param({ order_token: SpreeStore.currentOrderToken}),
          success: function(data) {
            var cart_info_view = new Cart.CartInfoView({
              model: data
            })
            SpreeStore.cartInfo.show(cart_info_view)
          },
        })
      }
    },
    addToCart: function(id, quantity) {
      if (SpreeStore.currentOrderId === undefined) {
        Cart.Controller.newCheckout(id, quantity)
      } else {
        Cart.Controller.addLineItem(id, quantity)
      }
    },

    newCheckout: function(id, quantity) {
      $.ajax({
        type: 'POST',
        url: '/store/api/orders',
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
          window.localStorage['currentOrderToken'] = SpreeStore.currentOrderToken = data.token
          window.localStorage['currentOrderId'] = SpreeStore.currentOrderId = data.number
          Cart.Controller.updateCart(data)
        }
      })
    },

    addLineItem: function(id, quantity) {
      $.ajax({
        type: 'post',
        url: '/store/api/orders/' + SpreeStore.currentOrderId + '/line_items',
        data: {
          order_token: SpreeStore.currentOrderToken,
          line_item: {
            variant_id: id,
            quantity: quantity
          }
        },
        success: function(data) {
          Cart.Controller.updateCart()
        }
      })
    },

    updateCart: function(data) {
      Cart.Controller.showCartInfo()
      Cart.Controller.preview()
    },

    preview: function() {
      if (SpreeStore.currentOrderId) {
        model = new SpreeStore.Models.Order({ number: SpreeStore.currentOrderId })
        model.fetch({
          data: $.param({ order_token: SpreeStore.currentOrderToken}),
          success: function(data) {
            cart_view = new Cart.CartView({
              model: data,
              collection: new SpreeStore.Models.LineItems(data.attributes.line_items)
            })
            if (data.attributes.state != 'cart') {
              SpreeStore.navigate("/checkout/" + data.attributes.state, true)
            } else {
              SpreeStore.mainRegion.show(cart_view)
              SpreeStore.noSidebar()
            }
          }
        });
      } else {
        emptyCartView = new Cart.EmptyCart
        SpreeStore.mainRegion.show(emptyCartView)
      }
    }
  }
})