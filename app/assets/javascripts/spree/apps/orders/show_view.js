SpreeStore.module('Orders',function(Orders, SpreeStore, Backbone,Marionette,$,_){
  Orders.ShowView = Backbone.Marionette.ItemView.extend({
    template: "#order-template",

    templateHelpers: {
      displayImage: SpreeStore.helpers.displayImage
    }
  })
})