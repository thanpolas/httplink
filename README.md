# httplink 

`Link` HTTP Header constructor for your Restfull APIs.

[![Build Status](https://secure.travis-ci.org/thanpolas/httplink.png?branch=master)](http://travis-ci.org/thanpolas/httplink)

Constructs the `Link` HTTP Header so your API can be discoverable, check out [rfc5988](http://tools.ietf.org/html/rfc5988).

## Getting Started

Install the module with: 

```js
npm install httplink --save
```

## Examples

```javascript
var Link = require('httplink');

var link = new Link();

var result = link.protocol('http')
  .data({next: 5, previous: 3})
  .host('www.google.com')
  .port(80)
  .path('/search')
  .rel('next')
  .next()
  .rel('previous')
  .end()
  .get();
```

The variable `result` will now contain this string:

```
<http://www.google.com/search?page=5>; rel="next"'
, <http://www.google.com/search?page=3>; rel="previous"
```

Newline was added for presentation reasons, there is no newline in the actual string.

The methods have to be invoked in the order as demonstrated above. The value of the `rel()` method must be a key that can be found by the `data()` method.

[Check out the tests](https://github.com/thanpolas/httplink/blob/master/test/httplink.test.js) for a more detailed demonstration of how this works.


## Release History
- **v0.0.1**, *23 Feb 2014*
    - Big Bang
    
## License
Copyright (c) 2014 Thanasis Polychronakis. Licensed under the MIT license.
