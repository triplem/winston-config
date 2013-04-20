/*global describe, it */
"use strict";

var should = require('should');

describe('winston-config', function () {

  it('should read config from given file', function () {
    var winston = require('winston');
    require('../lib/winston-config').winstonConfigFromFile(__dirname + '/../config/example-winston-config.json');

    should.exist(winston.loggers.get('application'));

    winston.loggers.get('application').transports['console'].level.should.equal('info');
    winston.loggers.get('application').transports['console'].colorize.should.be.ok;

    winston.loggers.get('application').transports['file'].level.should.equal('info');
    winston.loggers.get('application').transports['file'].colorize.should.be.not.ok;
    winston.loggers.get('application').transports['file'].filename.should.equal('app.log');

    should.exist(winston.loggers.get('http'));

    winston.loggers.get('http').transports['console'].level.should.equal('warn');
    winston.loggers.get('http').transports['console'].colorize.should.be.ok;

    winston.loggers.get('http').transports['file'].level.should.equal('info');
    winston.loggers.get('http').transports['file'].colorize.should.be.not.ok;
    winston.loggers.get('http').transports['file'].filename.should.equal('http.log');

    // reset all loggers
    winston.loggers = new winston.Container();
  });

  it('returns a default logger (winston default - silly) for all not configured loggers', function () {
    var winston = require('winston');
    require('../lib/winston-config').winstonConfigFromFile();

    should.exist(winston.loggers.get('application'));

    winston.loggers.get('application').transports['console'].level.should.equal('silly');
    winston.loggers.get('application').transports['console'].colorize.should.not.be.ok;

    // reset all loggers
    winston.loggers = new winston.Container();
  });

  it('returns a default logging level for console (winston default - info) for the not configured logging level', function () {
    var winston = require('winston');
    require('../lib/winston-config').winstonConfigFromFile(__dirname + '/./test-winston-config-wo-level.json');

    should.exist(winston.loggers.get('application'));

    winston.loggers.get('application').transports['console'].level.should.equal('info');
    winston.loggers.get('application').transports['console'].colorize.should.be.ok;

    // reset all loggers
    winston.loggers = new winston.Container();
  });

});
