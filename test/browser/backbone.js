define([
  'device-collection',
  'device-model',
  'location-model',
  'filter-model',
  'filter-view',
  'json!fixtures/device.json'
], function (
  DeviceCollection,
  DeviceModel,
  locationModel,
  filterModel,
  FilterView,
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

        describe('system comment', function () {
          it('should add comment when calling system comment', function () {
            this.model._systemComment('test',
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit.');
            var comments = this.model.get('comments');
            expect(comments[0].type).to.equal('test');
            expect(comments[0].author).to.equal('system');
            expect(comments[0].body).to.equal(
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit.');
          });
        });

        describe('checkout', function () {
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

          it('should not checkout to an empty string', function () {
            this.model.checkin();
            this.model.checkout('');
            expect(this.model.isCheckedOut()).to.equal(false);
            expect(this.triggerSpy).to.be.calledOnce;
            expect(this.triggerSpy.args[0][0]).to.equal('invalid');
            expect(this.triggerSpy.args[0][2])
              .to.equal('The owner you\'ve provided is invalid.');
          });

          it('should not checkout to an non string', function () {
            this.model.checkin();
            this.model.checkout({});
            expect(this.model.isCheckedOut()).to.equal(false);
            expect(this.triggerSpy).to.be.calledOnce;
            expect(this.triggerSpy.args[0][0]).to.equal('invalid');
            expect(this.triggerSpy.args[0][2])
              .to.equal('The owner you\'ve provided is invalid.');
          });
        });

        describe('checkin', function () {
          it('should checkin', function () {
            this.model.checkin();
            expect(this.model.isCheckedOut()).to.equal(false);
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
        });

        describe('location', function () {
          it('should move the device to a new location', function () {
            this.model.move('Chicago');
            expect(this.model.get('location')).to.equal('Chicago');
          });

          it('should not move the device with a bad location', function () {
            this.model.move('chicago');
            expect(this.model.get('location')).to.equal('Boise');
            expect(this.triggerSpy.args[0][0]).to.equal('invalid');
            expect(this.triggerSpy.args[0][2])
              .to.equal('You can\'t move this device. chicago not valid');
          });

          it('should not move a device already at that location', function () {
            this.model.move('Boise');
            expect(this.model.get('location')).to.equal('Boise');
            expect(this.triggerSpy.args[0][0]).to.equal('invalid');
            expect(this.triggerSpy.args[0][2])
              .to.equal('You can\'t move this device. It\'s already at this location.');
          });
        });

        describe('name', function () {
          it('should rename the device', function () {
            this.model.rename('iPhone 4');
            expect(this.model.get('name')).to.equal('iPhone 4');
          });

          it('should not rename with an empty string', function () {
            this.model.rename('');
            expect(this.model.get('location')).to.equal('Boise');
            expect(this.triggerSpy.args[0][0]).to.equal('invalid');
            expect(this.triggerSpy.args[0][2])
              .to.equal('The name you\'ve provided is invalid.');
          });

          it('should not rename with a non string', function () {
            this.model.rename({});
            expect(this.model.get('location')).to.equal('Boise');
            expect(this.triggerSpy.args[0][0]).to.equal('invalid');
            expect(this.triggerSpy.args[0][2])
              .to.equal('The name you\'ve provided is invalid.');
          });
        });

        describe('validation', function () {
          it('should validate all the fields', function () {
            var model = {},
              valiationModel = new DeviceModel(),
              errors = valiationModel.validate(model);

            expect(errors).to.have.length(6);
            expect(errors[0]).to.equal('Name is either empty or missing.');
            expect(errors[1]).to.equal('Location is either empty or missing.');
            expect(errors[2]).to.equal('Formfactor is either empty or missing.');
            expect(errors[3]).to.equal('Serial is either empty or missing.');
            expect(errors[4]).to.equal('Version is either empty or missing.');
            expect(errors[5]).to.equal('Os is either empty or missing.');
          });
        });
      });
      describe('filter', function () {
        beforeEach(function () {
          filterModel.filters = {
            location: ['Boise', 'Chicago', 'NewYork'],
            formfactor: ['Phone', 'Tablet', 'Laptop'],
            version: ['{userinput}'],
            checkedIn: ['true', 'false']
          };
        });
        it('should filter with mutliple filters', function () {
          var result = filterModel.filter('location:Boise formfactor:');
          expect(result).to.be.array;
          expect(result).to.have.length(3);
          expect(result[0]).to.equal('Phone');
        });
        it('should return all fields on empty', function () {
          var result = filterModel.filter('');
          expect(result).to.be.array;
          expect(result).to.have.length(4);
          expect(result[0]).to.equal('location');
        });
        it('should return all fields on empty', function () {
          var result = filterModel.filter('x');
          expect(result).to.be.array;
          expect(result).to.have.length(4);
          expect(result[0]).to.equal('location');
        });
        it('should return location when loc is typed', function () {
          var result = filterModel.filter('loc');
          expect(result).to.be.array;
          expect(result).to.have.length(1);
          expect(result[0]).to.equal('location');
        });
        it('should return all values when : is typed', function () {
          var result = filterModel.filter('location:');
          expect(result).to.be.array;
          expect(result).to.have.length(3);
          expect(result[0]).to.equal('Boise');
        });
        it('should return all values when no match is found', function () {
          var result = filterModel.filter('location:Texas');
          expect(result).to.be.array;
          expect(result).to.have.length(3);
          expect(result[0]).to.equal('Boise');
        });
        it('should prompt for string when empty array is found', function () {
          var result = filterModel.filter('version:');
          expect(result).to.be.array;
          expect(result).to.have.length(1);
          expect(result[0]).to.equal('{userinput}');
        });
      });
    });
    describe('views', function () {
      describe('filter', function () {
        beforeEach(function () {
          this.filterView = new FilterView();
        });
      });
    });
    describe('collections', function () {
      describe('device', function () {
        beforeEach(function () {
          this.collection = new DeviceCollection();
        });

        it('should add system comment "Device Created" on add', function () {
          this.collection.validateAndAddDevice(device);
          var comments = this.collection.models[0].get('comments');
          expect(comments).to.have.length(1);
          expect(comments[0].author).to.equal('system');
          expect(comments[0].body).to.equal('Device Created');
        });

        it('should add filters to the url', function () {
          this.collection.filterBy('location:Boise os:Android');
          var url = this.collection.url();
          expect(url)
            .to.equal('/api/devices?select=-comments&location__nocase=Boise&os__nocase=Android' +
              '&sort=name');
        });

        it('should clear filters', function () {
          this.collection.filterBy('location:Boise os:Android');
          this.collection.clearFilter();
          var url = this.collection.url();
          expect(url)
            .to.equal('/api/devices?select=-comments&sort=name');
        });

        it('should add sort to the url', function () {
          this.collection.sortBy('location');
          var url = this.collection.url();
          expect(url)
            .to.equal('/api/devices?select=-comments&sort=-location');
        });

        it('should add desc sort to the url', function () {
          this.collection.sortBy('location', '-');
          var url = this.collection.url();
          expect(url)
            .to.equal('/api/devices?select=-comments&sort=location');
        });

        it('should clear sort', function () {
          this.collection.sortBy('location');
          this.collection.clearSort();
          var url = this.collection.url();
          expect(url)
            .to.equal('/api/devices?select=-comments');
        });
      });
    });
  });
});
