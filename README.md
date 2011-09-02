Easy console debugging 

It is currently only a partial port of the original ruby version: 
    https://github.com/relevance/log_buddy

## Install

    npm install log-buddy

## Usage
```javascript
var d = require('log-buddy');

var a = 1
,   b = {a: a}
,   c = 'hello'
,   e = /hel/;

d(a,b,c,e);
```

prints:

     ====> a:  1
     ====> b:  { a: 1 }
     ====> c:  hello
     ====> e:  /hel/


## Limitations

Do :
```javascript
d(a,b,c);
d(e,f,g);
```

Don't :
```javascript
d(a,b,c); d(e,f,g);
```
