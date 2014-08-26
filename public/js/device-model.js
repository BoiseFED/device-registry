define([
  'backbone',
  'underscore',
  'location-model',
  'author-model'
], function (
  Backbone,
  _,
  locationModel,
  Author
) {
  return Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: '/api/devices',
    fields: ['name', 'location', 'formfactor', 'serial', 'version', 'os'],
    validate: function (model) {
      var errors = _.reduce(this.fields, function (errors, field) {
        this._validateEmptyAndUndefined(errors, model, field);
        return errors;
      }, [], this);

      if (errors.length > 0) {
        return errors;
      }
    },
    save: function (values, options) {
      options = _.extend({
        headers: {
          'If-Match': this.etag
        }
      }, options);
      Backbone.Model.prototype.save.call(this, values, options);
    },
    parse: function (response, data) {
      if (data.xhr && !_.isArray(data.xhr.responseJSON)) {
        this.etag = data.xhr.getResponseHeader('etag');
      } else {
        this.etag = 'blank';
      }

      return response;
    },
    checkout: function () {
      if (this.isCheckedOut()) {
        this.trigger('invalid', this,
          'You can\'t check-out this device. It\'s already checked out to ' +
          this.get('checkedOutTo') + '.');
        return false;
      }

      this.set('isCheckedOut', true, {silent: true});
      this.set('checkedOutTo', Author.getName(), {silent: true});
      this.set('checkedOutOn', Date.now(), {silent: true});
      this.set('checkedInOn', null, {silent: true});
      this._systemComment('checkout', 'Checked-out', Author.getName());

      this.save();
      return true;
    },
    checkin: function () {
      if (!this.isCheckedOut()) {
        this.trigger('invalid', this, 'You can\'t check-in this device. It\'s not checked out.');
        return false;
      }

      this.set('isCheckedOut', false, {silent: true});
      this.set('checkedInOn', Date.now(), {silent: true});
      this._systemComment('checkin', 'Checked-in', Author.getName());

      this.save();
      return true;
    },
    move: function (location) {
      var l = this.get('location');
      if (!locationModel.contains(location)) {
        this.trigger('invalid', this,
          'You can\'t move this device. ' + location + ' not valid');
        return false;
      }

      if (l === location) {
        this.trigger('invalid', this,
          'You can\'t move this device. It\'s already at this location.');
        return false;
      }



      this.set('location', location, {silent: true});
      this._systemComment('moved', 'This device was moved from ' + l + ' to ' + location, Author.getName());
      this.save();
      return true;
    },
    rename: function (name) {
      if (!_.isString(name) || _.isEmpty(name)) {
        this.trigger('invalid', this,
          'The name you\'ve provided is invalid.');
        return false;
      }

      this.set('name', name, {silent: true});
      this._systemComment('renamed', 'This device was renamed to ' + name);
      this.save();
      return true;
    },
    update: function (obj) {
      var changedAttr = this.changedAttributes(obj),
        change = _.map(changedAttr, function (value, key) {
          return '"' + key + '" was "' + this.get(key) + '" is now "' + value + '"';
        }, this).join(' and ');

      this._systemComment('updated', change, Author.getName());
      this.save(obj);
    },
    isCheckedOut: function () {
      return this.get('isCheckedOut');
    },
    comment: function (body, author) {
      if (!_.isString(author) || _.isEmpty(author)) {
        this.trigger('invalid', this,
          'The author you\'ve provided is invalid.');
        return false;
      }

      if (!_.isString(body) || _.isEmpty(body)) {
        this.trigger('invalid', this,
          'The body you\'ve provided is invalid.');
        return false;
      }

      var comments = this.get('comments');
      if (!_.isArray(comments)) {
        comments = [];
      }

      comments.unshift({
        body: body,
        author: author,
      });

      this.set('comments', comments);
      this.save();
    },
    _validateEmptyAndUndefined: function (errors, model, fieldName) {
      var field = model[fieldName];
      if (_.isUndefined(field) || _.isEmpty(field)) {
        errors.push(_.capitalize(fieldName) + ' is either empty or missing.');
      }
    },
    _systemComment: function (type, comment, author) {
      var comments = this.get('comments');
      if (!_.isArray(comments)) {
        comments = [];
      }

      if (!author) {
        author = 'system';
      }

      comments.unshift({
        author: author,
        date: Date.now(),
        body: comment,
        type: type
      });

      this.set('comments', comments, {silent: true});
    }
  });
});
