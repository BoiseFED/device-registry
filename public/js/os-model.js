define(['underscore', 'res-model'], function (_, BaseModel) {
  var model = new BaseModel({type: 'os'});
  model.fetch();
  return model;
});
