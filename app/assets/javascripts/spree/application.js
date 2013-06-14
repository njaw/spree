//= require_self
//= require ../spree/money
//= require_tree ../spree/models
//= require_tree ../spree/apps/store
//= require_tree ../spree/apps/cart
//= require_tree ../spree/apps/taxonomies/list
//= require_tree ../spree/apps/taxonomies/show
//= require_tree ../spree/apps/products/list
//= require_tree ../spree/apps/products/show
Spree = {}
SpreeStore = new Backbone.Marionette.Application()
SpreeStore.current_order_id = window.localStorage['current_order_id']
SpreeStore.current_order_token = window.localStorage['current_order_token']

SpreeStore.MainRegion = Backbone.Marionette.Region.extend({
  el: '.fast-freddy',
  // open: function(view){
  //   this.$el.hide();
  //   this.$el.html(view.el);
  //   this.$el.delay(750).fadeIn(2000);
  // }
});

SpreeStore.Sidebar = Backbone.Marionette.Region.extend({
  el: '#sidebar',
  open: function(view){
    this.$el.hide();
    this.$el.html(view.el);
    this.$el.delay(500).fadeIn(2000);
  }
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
  $.get('/store/api/config/money', function(data) {
    Spree.Money.Settings = data  
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
