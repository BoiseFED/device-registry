define(['underscore', 'res-model'], function (_, BaseModel) {
  var model = new BaseModel({type: 'locations', name: 'location'});
  model.fetch();
  return model;
});
