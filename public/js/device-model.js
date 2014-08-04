define(['backbone', 'underscore', 'location-model'], function (Backbone, _, locationModel) {
  return Backbone.Model.extend({
    url: '/api/devices',
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
    checkout: function (owner) {
      if (!_.isString(owner) || _.isEmpty(owner)) {
        this.trigger('invalid', this,
          'The owner you\'ve provided is invalid.');
        return false;
      }

      if (this.isCheckedOut()) {
        this.trigger('invalid', this,
          'You can\'t check-out this device. It\'s already checked out to ' +
          this.get('checkedOutTo') + '.');
        return false;
      }

      this.set('isCheckedOut', true, {silent: true});
      this.set('checkedOutTo', owner, {silent: true});
      this.set('checkedOutOn', Date.now(), {silent: true});
      this.set('checkedInOn', null, {silent: true});
      this._systemComment('checkout', 'Checked-out by ' + owner);

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
      this._systemComment('checkin', 'Checked-in');

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
      this._systemComment('moved', 'This device was moved to ' + location);
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
      var change = _.map(obj, function (value, key) { return key + ':' + value; }).join(' and ');
      this._systemComment('updated', 'This device was updated with:' + change);
      this.save(obj);
    },
    isCheckedOut: function () {
      return this.get('isCheckedOut');
    },
    _validateEmptyAndUndefined: function (errors, model, fieldName) {
      var field = model[fieldName];
      if (_.isUndefined(field) || _.isEmpty(field)) {
        errors.push(_.capitalize(fieldName) + ' is either empty or missing.');
      }
    },
    _systemComment: function (type, comment) {
      var comments = this.get('comments');
      if (!_.isArray(comments)) {
        comments = [];
      }
      comments.push({
        author: 'system',
        date: Date.now(),
        body: comment,
        type: type
      });

      this.set('comments', comments, {silent: true});
    }
  });
});
