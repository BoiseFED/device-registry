define(['device-collection', 'json!fixtures/device.json'], function (DeviceCollection, device) {
  describe('backbone', function () {
    describe('models', function () {});
    describe('views', function () {});
    describe('collections', function () {
      describe('device', function () {
        beforeEach(function () {
          this.collection = new DeviceCollection();
        });

        it('should add system comment on add', function () {
          this.collection.validateAndAddDevice(device);
          var comments = this.collection.models[0].get('comments');
          expect(comments).to.have.length(1);
          expect(comments[0].author).to.equal('system');
          expect(comments[0].body).to.equal('Device Created');
        });
      });
    });
  });
});
