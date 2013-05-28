# method-proxy-js

Serves as a proxy between your code and an object. Useful for working with
asynchronously loaded objects, such as Facebook's API.

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
