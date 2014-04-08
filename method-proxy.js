window.MethodProxy = function(object, queue) {
  'use strict';

  this.init = function(object, queue) {
    var item;

    this.object = object;

    while(item = queue.shift()) {
      this.forward(item);
    }
  };

  // payload : ['methodName', arguments*]
  this.push = this.forward = function(payload) {
    var methodName = payload.shift().split('.'),
        object     = this.object,
        method;
    while (methodName.length) {
      // dig into the object as many levels as needed (e.g. `FB.XFBML.parse`)
      if (method) {
        object = object[method];
      }
      method = methodName.shift();
    }
    return object[method].apply(object, payload);
  };

  this.init(object, queue);
};
