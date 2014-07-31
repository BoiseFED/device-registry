define(['underscore', 'res-model'], function (_, BaseModel) {
  var model = new BaseModel({type: 'formfactors', name: 'formfactor'});
  model.fetch();
  return model;
});
