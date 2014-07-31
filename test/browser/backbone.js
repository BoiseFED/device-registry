define([
  'device-collection',
  'device-model',
  'json!fixtures/device.json'
], function (
  DeviceCollection,
  DeviceModel,
  device
) {
  describe('backbone', function () {
    describe('models', function () {
      describe('device', function () {
        beforeEach(function () {
          this.model = new DeviceModel(device);
          this.model.set('id', 1, {silent: true});
          this.saveStub = sinon.stub(this.model, 'save');
          this.triggerSpy = sinon.spy(this.model, 'trigger');
        });

        afterEach(function () {
          this.saveStub.restore();
          this.triggerSpy.restore();
        });

        it('should add comment when calling system comment', function () {
          this.model.systemComment('test',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.');
          var comments = this.model.get('comments');
          expect(comments[0].type).to.equal('test');
          expect(comments[0].author).to.equal('system');
          expect(comments[0].body).to.equal(
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.');
        });

        it('should return checkedout status', function () {
          expect(this.model.isCheckedOut()).to.equal(true);
        });

        it('should update checkedout status when checking in', function () {
          this.model.checkin();
          expect(this.model.isCheckedOut()).to.equal(false);
          expect(this.model.get('comments')[0].type).to.equal('checkin');
        });

        it('should update checkedout status when checking out', function () {
          this.model.checkin();
          this.model.checkout('mstevens');
          expect(this.model.isCheckedOut()).to.equal(true);
          expect(this.model.get('checkedOutTo')).to.equal('mstevens');
          expect(this.model.get('comments')[1].type).to.equal('checkout');
        });

        it('should not checkout if already checked out', function () {
          this.model.checkout('mstevens');
          expect(this.model.isCheckedOut()).to.equal(true);
          expect(this.triggerSpy).to.be.calledOnce;
          expect(this.triggerSpy.args[0][0]).to.equal('invalid');
          expect(this.triggerSpy.args[0][2])
            .to.equal('You can\'t check-out this device. It\'s already checked out to aclark.');
        });

        it('should not checkin if already checked in', function () {
          this.model.checkin();
          this.model.checkin();
          expect(this.model.isCheckedOut()).to.equal(false);
          expect(this.triggerSpy).to.be.calledOnce;
          expect(this.triggerSpy.args[0][0]).to.equal('invalid');
          expect(this.triggerSpy.args[0][2])
            .to.equal('You can\'t check-in this device. It\'s not checked out.');
        });

  //TODO
        it('should move the device to a new location', function () {
          //this.model.move('chicago');
          //expect(this.model.get('location')).to.equal('chicago');
        });
      });
    });
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
