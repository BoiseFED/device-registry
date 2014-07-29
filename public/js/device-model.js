define(['backbone', 'bus'], function (Backbone, bus) {
  return Backbone.Model.extend({
    validate: function () {
      return false;
<<<<<<< HEAD
=======
    },
    parse: function (response) {
      console.log(response);
      return response;
>>>>>>> fixing weird git merge issue
    }
  });
});
