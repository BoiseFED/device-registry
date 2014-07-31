define(['backbone', 'underscore', 'location-model'], function (Backbone, _, locationModel) {
  return Backbone.Model.extend({
    url: '/api/devices',
    validate: function () {
      return false;
    },
    checkout: function (owner) {
      if (_.isUndefined(owner)) {
        this.trigger('invalid', this,
          'The owner you\'ve provided is empty.');
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
      this.systemComment('checkout', 'Checked-out by ' + owner);

      this.save();
    },
    checkin: function () {
      if (!this.isCheckedOut()) {
        this.trigger('invalid', this, 'You can\'t check-in this device. It\'s not checked out.');
        return false;
      }

      this.set('isCheckedOut', false, {silent: true});
      this.set('checkedInOn', Date.now(), {silent: true});
      this.systemComment('checkin', 'Checked-in');

      this.save();
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
      }
      this.set('location', location, {silent: true});
      this.systemComment('moved', 'This device was moved to ' + location);
      this.save();
    },
    rename: function (name) {
      if (_.isUndefined(name)) {
        this.trigger('invalid', this,
          'The name you\'ve provided is empty.');
        return false;
      }

      this.set('name', name);
      this.systemComment('renamed', 'This device was renamed to ' + name);
    },
    update: function (obj) {
      var change = _.map(obj, function (value, key) { return key + ':' + value; }).join(' and ');
      this.systemComment('updated', 'This device was updated with:' + change);
      this.save(obj);
    },
    isCheckedOut: function () {
      return this.get('isCheckedOut');
    },
    systemComment: function (type, comment) {
      var comments = this.get('comments');
      if (_.isUndefined(comments)) {
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
