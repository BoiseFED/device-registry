define(['underscore', 'res-model'], function (_, BaseModel) {
  var model = new BaseModel({type: 'formfactors'});
  model.fetch();
  return model;
});
