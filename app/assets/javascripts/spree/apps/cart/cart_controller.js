SpreeStore.module('Cart',function(Cart, SpreeStore, Backbone,Marionette,$,_){
  Cart.Controller = {
    showCartInfo: function() {
      if (SpreeStore.current_order_id !== undefined) {
        model = new SpreeStore.Entities.Order({ 
          id: SpreeStore.current_order_id,
          total_quantity: window.localStorage['total_quantity'],
          display_item_total: window.localStorage['display_item_total']
        })
        var cart_info_view = new Cart.CartInfoView({
          model: model
        })

        cart_info_view.on("cart:preview", function() {
          SpreeStore.Cart.Controller.preview()
        })
        SpreeStore.cartInfo.show(cart_info_view)
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
      cart_info_view = new Cart.CartInfoView({
        model: model
      })
      Cart.Controller.preview()
    },

    preview: function() {
      // console.log("previewing cart")
      model = new SpreeStore.Entities.Order({ id: SpreeStore.current_order_id })
      model.fetch({
        success: function(data) {
          cart_view = new Cart.CartView({
            model: data,
            collection: new SpreeStore.Entities.LineItems(data.attributes.line_items)
          })

          SpreeStore.mainRegion.show(cart_view)
          SpreeStore.noSidebar()

          // console.log(line_items_view.el.innerHTML)
        }
      });
    }
  }
})