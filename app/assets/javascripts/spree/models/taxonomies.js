SpreeStore.module('Models',function(Models, SpreeStore, Backbone,Marionette,$,_){

  Models.Taxonomy = Backbone.Model.extend({})

  Models.Taxonomies = Backbone.Collection.extend({
    model: Models.Taxonomy,
    url: '/store/api/taxonomies',

    parse: function(data) {
      return data.taxonomies;
    }
  })
});