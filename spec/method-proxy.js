/* global MethodProxy:false */
/* global describe:false    */
/* global it:false          */
/* global beforeEach:false  */
/* global spyOn:false       */
/* global expect:false      */
describe('MethodProxy', function() {
  'use strict';

  var FB, FBMethodProxy;

  beforeEach(function() {
    FB = {
      aMethod : function() {},
      anObject : {
        anotherMethod : function() {}
      },
      callbackRunner : function(callback) {
        callback();
      },
      thisIsSubEnqueued : function() {}
    };
  });

  describe('after initialization', function() {
    beforeEach(function() {
      FBMethodProxy = new MethodProxy(FB, []);
    });

    describe('when pushed to', function() {
      it('calls the pushed methods with the correct arguments', function() {
        spyOn(FB, 'aMethod');
        FBMethodProxy.push(['aMethod', 'this is a string', 2]);
        expect(FB.aMethod).toHaveBeenCalledWith('this is a string', 2);
      });

      it('runs methods on the root object with the root object context', function() {
        spyOn(FB, 'aMethod').andCallFake(function() {
          expect(this).toBe(FB);
        });
        FBMethodProxy.push(['aMethod', true]);
      });

      it('runs methods on sub-objects with the sub-object context', function() {
        spyOn(FB.anObject, 'anotherMethod').andCallFake(function() {
          expect(this).toBe(FB.anObject);
        });
        FBMethodProxy.push(['anObject.anotherMethod', true]);
      });
    });
  });

  describe('with an existing queue', function() {
    var queue;

    beforeEach(function() {
      queue = [
        ['aMethod', 'my argument'],
        ['anObject.anotherMethod', 'my other argument', 'one more']
      ];
    });

    it('calls the methods in the queue with the arguments in the queue', function() {
      spyOn(FB, 'aMethod');
      spyOn(FB.anObject, 'anotherMethod');

      queue = new MethodProxy(FB, queue);
      expect(FB.aMethod).toHaveBeenCalledWith('my argument');
      expect(FB.anObject.anotherMethod)
        .toHaveBeenCalledWith('my other argument', 'one more');
    });

    describe('one of the items enqueues another item', function() {
      it('evalutes the newly enqueued item', function() {
        queue.push(['callbackRunner', function() {
          queue.push(['thisIsSubEnqueued', 'an argument']);
        }]);

        spyOn(FB, 'thisIsSubEnqueued');

        queue = new MethodProxy(FB, queue);

        expect(FB.thisIsSubEnqueued).toHaveBeenCalledWith('an argument');
      });
    });
  });
});
