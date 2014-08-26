define(['backbone', 'localStorage'], function (Backbone, localStorage) {
  var AuthorModel = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage('Author'),
    parse: function (response) {
      return response;
    },
    getName: function () {
      if (!this.get('name')) {
        var name = prompt('Please provide your accenture username');
        this.set('name', name, {silent: true});
        this.save();
        return name;
      } else {
        return this.get('name');
      }
    }
  }),
    authorModel = new AuthorModel({id: '0000'});

  authorModel.fetch();
  return authorModel;

});
