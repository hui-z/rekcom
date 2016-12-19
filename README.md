# Rekcom

A mockserver to intercept request and respond with mock data.

# Installation

```
npm install rekcom
```

# Usage

## Specifying hostname

Pass in the hostname you want to intercept in rekcom:

```javascript
const rekcom = require('rekcom')('http://127.0.0.1:8000')
```

## Specifying patch

The request path is expected to be a string:

```javascript
const rekcom = require('rekcom')('http://127.0.0.1:8000')
    .get('/users/1')
    .reply(200, 'path matched');
```

## Specifying request query string

The query string should be wrapped into a key-value Object:

```javascript
// will intercept uri /users/1?name=rekcom
const rekcom = require('rekcom')('http://127.0.0.1:8000')
    .get('/users/1')
    .query({
        name: 'rekcom'
    })
    .reply(200, 'path matched');
```

## Specifying replies

You can specify response status, body and headers like this:

```javascript
const rekcom = require('rekcom')('http://127.0.0.1:8000')
    .get('/users/1')
    .reply(200, {
        name: 'rekcom',
        age: 18,
    }, {
        header: 'value',
    });
```

Or with errors:

```javascript
const rekcom = require('rekcom')('http://127.0.0.1:8000')
    .get('/users/1')
    .reply(400, {
        message: 'your request failed',
        code: 10001,
    });
```

Or you can access origin request uri and request body, and specify response with a callback function:

```javascript
const rekcom = require('rekcom')('http://127.0.0.1:8000')
    .get('/users/1')
    .reply(function(uri, requestBody) {
        console.log(`uri: ${uri}`);
        console.log(`request body: ${requestBody}`);
        return [
            200,
            'YOUR RESPONSE BODY',
            {'header': 'value'}
        ];
    });
```

Other http methods:

```javascript
const rekcom = require('rekcom')('http://127.0.0.1:8000');

rekcom.get('/users/1');
rekcom.post('users/1');
rekcom.put('users/1');
rekcom.patch('users/1');
rekcom.delete('users/1');
```
