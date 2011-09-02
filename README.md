 __                      ____                __      __
/\ \                    /\  _`\             /\ \    /\ \
\ \ \        ___      __\ \ \L\ \  __  __   \_\ \   \_\ \  __  __
 \ \ \  __  / __`\  /'_ `\ \  _ <'/\ \/\ \  /'_` \  /'_` \/\ \/\ \
  \ \ \L\ \/\ \L\ \/\ \L\ \ \ \L\ \ \ \_\ \/\ \L\ \/\ \L\ \ \ \_\ \
   \ \____/\ \____/\ \____ \ \____/\ \____/\ \___,_\ \___,_\/`____ \
    \/___/  \/___/  \/___L\ \/___/  \/___/  \/__,_ /\/__,_ /`/___/> \
                      /\____/                                  /\___/
                      \_/__/                                   \/__/

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


