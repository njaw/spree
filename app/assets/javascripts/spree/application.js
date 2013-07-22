//= require_self
//= require_tree ../spree/helpers
//= require_tree ../spree/models
//= require_tree ../spree/apps/store
//= require_tree ../spree/apps/cart
//= require_tree ../spree/apps/checkout
//= require_tree ../spree/apps/orders
//= require_tree ../spree/apps/taxonomies/list
//= require_tree ../spree/apps/taxonomies/show
//= require_tree ../spree/apps/products/list
//= require_tree ../spree/apps/products/show
Spree = {}
SpreeStore = new Backbone.Marionette.Application()
SpreeStore.currentOrderId = window.localStorage['currentOrderId']
SpreeStore.currentOrderToken = window.localStorage['currentOrderToken']

SpreeStore.MainRegion = Backbone.Marionette.Region.extend({
  el: '.fast-freddy'
});

SpreeStore.Sidebar = Backbone.Marionette.Region.extend({
  el: '#sidebar'
});

SpreeStore.addRegions({
    mainRegion: SpreeStore.MainRegion,
    cartInfo: '#link-to-cart',
    sidebar: SpreeStore.Sidebar,
    cart: "#cart"
});

SpreeStore.noSidebar = function() {
  SpreeStore.sidebar.close();
  $('#content').attr('class', 'columns sixteen');
}

SpreeStore.navigate = function(route, options) {
  options || (options = {});
  Backbone.history.navigate(route, options)
}

SpreeStore.getCurrentRoute = function() {
  return Backbone.history.fragment;
}

SpreeStore.on("initialize:before", function(){
  $.ajax({
    async: false,
    url: '/store/api/config/money',
    success: function(data) {
      Spree.Money.Settings = data
    }
  })

  $.ajax({
    async: false,
    url: '/store/api/config/',
    success: function(data) {
      Spree.Settings = data
    }
  })
})

SpreeStore.on("initialize:after", function(){
  if (Backbone.history) {
    Backbone.history.start();
  }
  if (this.getCurrentRoute() === "") {
    SpreeStore.trigger("products:list")
  }
});
