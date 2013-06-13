# method-proxy-js

[![NPM version](https://badge.fury.io/js/method-proxy-js.png)](http://badge.fury.io/js/method-proxy-js)
[![Build Status](https://travis-ci.org/causes/method-proxy-js.png)](https://travis-ci.org/causes/method-proxy-js)

Serves as a proxy between your code and an object. Useful for working with
asynchronously loaded objects, such as Facebook's API.

Read <cite>[Working With Asynchronously Loaded JavaScript Objects][blog]</cite>
for more in-depth look at its uses.

[blog]: http://causes.github.io/blog/2013/05/28/working-with-asynchronously-loaded-javascript-objects/

## Example usage

```javascript
MyFB = window.MyFB || [];

MyFB.push(['ui', { ... }]);

window.fbAsyncInit = function() {
  FB.init({
    ...
  });

  MyFB = new MethodProxy(FB, MyFB);
};

MyFB.push(['FBML.parse', ...]);
```

## License

This project is released under the MIT license.
