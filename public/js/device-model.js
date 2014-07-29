define(['backbone', 'bus'], function (Backbone, bus) {
  return Backbone.Model.extend({
    validate: function () {
      return false;
<<<<<<< HEAD
    },
    parse: function (response) {
      console.log(response);
      return response;
=======
>>>>>>> d984f0aa185c195b293b4c1adb3ac96a51ed314b
    }
  });
});
