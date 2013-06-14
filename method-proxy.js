var MethodProxy = function(object, queue) {
  this.init = function(object, queue) {
    this.object = object;

    for (var i = 0, len = queue.length; i < len; ++i) {
      this.forward(queue[i]);
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
