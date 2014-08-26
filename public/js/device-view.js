define([
  'underscore',
  'backbone',
  'handlebars',
  'author-model',
  'text!tmpl/device.hbs',
  'os-view',
  'formfactor-view',
  'locations-view',
  'text!tmpl/content-loading.hbs'
], function (
  _,
  Backbone,
  Handlebars,
  Author,
  tmpl,
  OSView,
  FormFactorView,
  LocationView,
  loadingTmpl
) {
  return Backbone.View.extend({
    tagName: 'div',
    className: '.content',
    events: {
      'click .check-in': 'checkin',
      'click .check-out': 'checkout',
      'click .comment': 'comment',
      'click .edit': 'edit',
      'click .cancel' : 'closeForms',
      'click .save': 'save',
      'click .move': 'move',
      'click .saveMove': 'saveMove'
    },
    initialize: function () {
      this.editing = false;
      this.moving = false;

      this.formFactorView = new FormFactorView();
      this.osView = new OSView();
      this.locationView = new LocationView();

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
      model.editing = this.editing;
      model.moving = this.moving;
      this.$el.html(Handlebars.compile(tmpl)(model));

      this.formFactorView.select(this.model.get('formfactor')).render();
      this.osView.select(this.model.get('os')).render();
      this.locationView.select(this.model.get('location')).render();

      this.$('.js-formfactor-container').html(this.formFactorView.$el);
      this.$('.js-os-container').html(this.osView.$el);
      this.$('.js-location-container').html(this.locationView.$el);
    },
    checkin: function (ev) {
      ev.preventDefault();
      this.model.checkin();
      this.model.fetch({reset: true});
    },
    checkout: function (ev) {
      ev.preventDefault();
      var authorName = Author.getName();
      if (!authorName) {
        return;
      }
      this.model.checkout(authorName);
      this.model.fetch({reset: true});
    },
    edit: function (ev) {
      ev.preventDefault();
      this.editing = true;
      this.render();
    },
    closeForms: function (ev) {
      ev.preventDefault();
      this.editing = false;
      this.moving = false;
      this.render();
    },
    move: function (ev) {
      ev.preventDefault();
      this.moving = true;
      this.render();
    },
    save: function (ev) {
      ev.preventDefault();
      var changes = {
        version: this.$('input.version').val(),
        name: this.$('input.name').val(),
        serial: this.$('input.serial').val(),
        formfactor: this.$('select.formfactor option:selected').text(),
        os: this.$('select.os option:selected').text()
      };
      this.model.update(changes);
      this.closeForms(ev);
    },
    saveMove: function (ev) {
      ev.preventDefault();
      this.model.move(this.$('select.location option:selected').text());
      this.closeForms(ev);
    },
    comment: function (ev) {
      ev.preventDefault();
      var author =  this.$('.author').val(),
        comments = this.model.get('comments');

      this.model.comment(comments, author);
    }
  });
});
