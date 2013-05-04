"use strict";

var fs = require('fs')
  , winston = require('winston')
  , _ = require('lodash');

// initialize Winston logging mechanism from config (JSON) object
// each logger can be accessed via
// winston.loggers.get(NAME) in all modules
// running in this nodejs app
function withName(winstonConf, callback) {
  if (_.isEmpty(winstonConf)) {
    callback(new Error('Empty winston configuration'));
    return;
  }

  for (var loggerName in winstonConf) {
    winston.loggers.add(loggerName, winstonConf[loggerName]);
  }

  callback(null, winston);
}

// initialize Winston logging mechanism from file
function fromFile(filename, callback) {
  var configFile = filename || '../config/winston-config.json';

  fs.exists(configFile, function (exists) {
    if (exists) {
      var winstonConf = require(configFile).logging;

      withName(winstonConf, callback);
    } else {
      callback(new Error('No config file found (at least provide a config/winston-config.json) with winston configuration'));
    }
  });
}

module.exports.withName = withName;
module.exports.fromFile = fromFile;

// these are for backward compatibility
module.exports.configWithName = withName;
module.exports.configFromFile = fromFile;
