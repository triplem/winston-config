/*global describe, it */
"use strict";

var path = require('path')
  , should = require('should');

describe('winston-config', function () {

  it('should read config from given file', function () {

    require('../lib/winston-config').fromFile(path.join(__dirname, '../config/example-winston-config.json'), function (error, winston) {
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
  });

  it('should read config from given file (synchronous)', function () {

    var winston = require('../lib/winston-config').fromFileSync(path.join(__dirname, '../config/example-winston-config.json'));

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

  it('throws an error if an incorrect path is given', function () {
    var winston = require('winston');

    require('../lib/winston-config').fromFile('./test.js', function (error) {
      should.exist(error);
    });

    // reset all loggers
    winston.loggers = new winston.Container();
  });

  it('return empty winston if an incorrect path is given on sync function', function () {
    var winston = require('winston');

    var logger = require('../lib/winston-config').fromFileSync('./test.js');

    logger.loggers.get('testsync').should.equal(winston.loggers.get('testsync'));
    logger.loggers.get('testsync').level.should.equal('info');

    // reset all loggers
    winston.loggers = new winston.Container();
    logger.loggers = new logger.Container();
  });

  it('returns a default logging level for console (winston default - info) for the not configured logging level', function () {

    require('../lib/winston-config').fromFile(__dirname + '/./test-winston-config-wo-level.json', function (error, winston) {
      if (error) {
        error.should.be.null;
      }

      should.exist(winston.loggers.get('testing'));

      winston.loggers.get('testing').transports['console'].level.should.equal('info');
      winston.loggers.get('testing').transports['console'].colorize.should.be.ok;
      winston.loggers.get('testing').transports['console'].timestamp.should.be.ok;

      // reset all loggers
      winston.loggers = new winston.Container();
    });
  });

});
