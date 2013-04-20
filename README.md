# winston-config [![Build Status](https://travis-ci.org/triplem/winston-config.png?branch=master)](http://travis-ci.org/triplem/winston-config)

A module to easily configure [winston](http://github.com/flatiron/winston) via json files.

## Motivation
Winston is designed to be a simple and universal logging library with support for multiple transports.
There is IMHO a need to easily configure this fine logging library via easy json files, without the need of working with
the winston api.

## Usage
You do have to put the `winston` dependency into your package.json. After this you are able to configure winston via
winston-config.

``` js
  var winston = require('winston')
    , winston-config = require('winston-config');

  winston-config.winstonConfigFromFile(__dirname + '/../config/example-winston-config.json');
```

Right now, winston-config offers two methods, one is `winstonConfigFromFile` (calling a json-file and using it for the
configuration of winston) the other one is `winstonConfig`. This method accepts a JS Object to configure winston (well
in reality this method is called by the `winstonConfigFromFile` and does nothing else then adding the config to winston).

It is very important to use the `__dirname + '/' (note the '/'), otherwise the configuration file will not be found.
A configuration file can look like (see directory config or test):

``` js
{
  "logging": {
    "application": {
      "console": {
        "level": "info",
        "colorize": true
      },
      "file": {
        "timestamp": true,
        "json": false,
        "filename": "logs/app.log",
        "maxfiles": 5,
        "maxsize": 10485760,
        "level": "info"
      }
    },
    "http": {
      "console": {
        "level": "warn",
        "colorize": true
      },
      "file": {
        "timestamp": true,
        "json": false,
        "filename": "logs/http.log",
        "maxfiles": 5,
        "maxsize": 10485760,
        "level": "info"
      }
    }
  }
}
```

The `logging` is the only fixed one, all other can be adapted by the user of the library. After the call to the
winston-config with a correct filename (using the above configuration), the logger can be called via

``` js
var winston = require('winston');

var appLogger = winston.loggers.get('application');
appLogger.info('LOGMESSAGE');
```

Like already stated, the name `application` can be configured. If there is no configuration for this logger, the default
values of winston are used. The default transport is always `console` and the default level is `silly` if there is no
logger configured, if it is configured without a level, the level `info` is used.

Detailed information can be found in the tests for this project.

Hope it helps, and you are able to use it. If there are any problems, do not hesitate to open an issue or write a message
to the author of this project.

## LICENSE

Copyright (c) 2013 Markus M. May

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
