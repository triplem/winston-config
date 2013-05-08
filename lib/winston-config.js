"use strict";

var fs = require('fs')
  , _ = require('lodash')
  , winston = require('winston');

// initialize Winston logging mechanism from config (JSON) object
// each logger can be accessed via
// winston.loggers.get(NAME) in all modules
// running in this nodejs app
function fromJson(winstonConf, callback) {
  if (_.isEmpty(winstonConf)) {
    callback(new Error('Empty winston configuration'), winston);
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

      fromJson(winstonConf, callback);
    } else {
      callback(new Error('No config file found (at least provide a config/winston-config.json) with winston configuration'), winston);
    }
  });
}

// initialize Winston logging mechanism from file (Synchronous, no callback)
function fromFileSync(logger, filename) {
  var configFile = filename || '../config/winston-config.json';

  var exists = fs.existsSync(configFile);

  if (exists) {
    var winstonConf = require(configFile).logging;

    if (_.isEmpty(winstonConf)) {
      console.log('Empty winston configuration');
    } else {
      for (var loggerName in winstonConf) {
        logger.loggers.add(loggerName, winstonConf[loggerName]);
      }
    }

  } else {
    console.log('No config file found (at least provide a config/winston-config.json) with winston configuration');
  }

  return logger;
}

module.exports.fromJson = fromJson;
module.exports.fromFile = fromFile;
module.exports.fromFileSync = fromFileSync;

// these are for backward compatibility
module.exports.configWithName = fromJson;
module.exports.configFromFile = fromFile;
