define(['backbone', 'handlebars', 'text!tmpl/footer.hbs'], function (Backbone, Handlebars, tmpl) {
  return Backbone.View.extend({
    el: '.footer',
    initialize: function () {
      this.render();
    },
    render: function () {
      this.$el.html(Handlebars.compile(tmpl)({}));
    }
  });
});
