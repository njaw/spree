SpreeStore.module('Taxonomies.List',function(TaxonomiesList, SpreeStore, Backbone,Marionette,$,_){
  TaxonomiesList.Taxonomy = Backbone.Marionette.ItemView.extend({
    template: "#taxonomy-item"
  });

  TaxonomiesList.Taxonomies = Backbone.Marionette.CollectionView.extend({
    tagName: "nav",
    id: "taxonomies",
    className: 'sidebar-item',
    template: "#taxonomies-template",
    itemView: TaxonomiesList.Taxonomy
  });
});