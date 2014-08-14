define([
  'underscore',
  'backbone',
  'handlebars',
  'text!tmpl/device.hbs',
  'text!tmpl/content-loading.hbs'
], function (
  _,
  Backbone,
  Handlebars,
  tmpl,
  loadingTmpl
) {
  return Backbone.View.extend({
    tagName: 'div',
    className: '.content',
    events: {
      'click .check-in': 'checkin',
      'click .check-out': 'checkout',
      'click .comment': 'comment'
    },
    initialize: function () {
      this.listenTo(this.model, 'request', this.renderLoading);
      this.listenTo(this.model, 'sync', this.render);
      this.listenTo(this.model, 'invalid', function () {
        console.log(arguments);
      });
    },
    renderLoading: function () {
      this.$el.html(Handlebars.compile(loadingTmpl)({}));
    },
    render: function () {
      var model = this.model.toJSON();
      this.$el.html(Handlebars.compile(tmpl)(model));
    },
    checkin: function (ev) {
      console.log('checkin');
      ev.preventDefault();
      this.model.checkin();
      this.model.fetch({reset: true});
    },
    checkout: function (ev) {
      console.log('checkout');
      ev.preventDefault();
      var username = prompt('please provide your username', 'adam.m.clark');
      console.log(this.model.checkout(username));
      this.model.fetch({reset: true});
    },
    comment: function (ev) {
      ev.preventDefault();
      var author =  this.$('.author').val(),
        comments = this.model.get('comments');

      this.model.comment(comments, author);
    }
  });
});
