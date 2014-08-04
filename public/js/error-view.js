define([
  'underscore',
  'backbone',
  'handlebars',
  'text!tmpl/error.hbs',
  'bus'
], function (
  _,
  Backbone,
  Handlebars,
  tmpl,
  Bus
) {
  return Backbone.View.extend({
    el: '.errors',
    initialize: function () {
      this.render();
      this.errors = [];
      this.listenTo(Bus, 'error', function (errors) {
        this.errors = errors;
        this.render();
      });
    },
    render: function () {
      this.$el.html(Handlebars.compile(tmpl)(this.errors));
    }
  });
});
