"use strict";

var fs = require('fs')
  , winston = require('winston');

// initialize Winston logging mechanism from config (JSON) object
// each logger can be accessed via
// winston.loggers.get(NAME) in all modules
// running in this nodejs app
function winstonConfig(winstonConf) {
  for (var loggerName in winstonConf) {
    winston.loggers.add(loggerName, winstonConf[loggerName]);
  }
}

// initialize Winston logging mechanism from file
function winstonConfigFromFile(filename) {
  var configFile = filename || '../config/winston-config.json';

  var exists = fs.existsSync(configFile);
  if (exists) {
    var winstonConf = require(configFile).logging;

    winstonConfig(winstonConf);
  }
}

module.exports.winstonConfig = winstonConfig;
module.exports.winstonConfigFromFile = winstonConfigFromFile;
