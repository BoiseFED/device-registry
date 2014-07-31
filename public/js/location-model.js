define(['underscore', 'res-model'], function (_, BaseModel) {
  var model = new BaseModel({type: 'locations'});
  model.fetch();
  return model;
});
