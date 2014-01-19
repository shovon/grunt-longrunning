/*
 * grunt-longrunning
 * https://github.com/shovon/grunt-longrunning
 *
 * Copyright (c) 2014 Salehen Shovon Rahman
 * Licensed under the MIT license.
 */

'use strict';

var async = require('async');
var gaze = require('gaze');
var path = require('path');
var child_process = require('child_process');
var treekill = require('tree-kill');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('longrunning', 'Spawn long running processes.', function something() {
    var commands = this.data.commands;
    var done = this.async();

    commands.forEach(function (command) {
      var proc;
      function spawnChild() {
        proc = child_process.spawn(
          command.options.cmd,
          command.options.args
        );
        proc.stdout.on('data', function (data) {
          process.stdout.write(data.toString('utf8'));
        });
        proc.stderr.on('data', function (data) {
          process.stdout.write(data.toString('utf8'));
        });
        proc.on('exit', function () {
          spawnChild();
        });
      }
      gaze(command.files, function (err, watcher) {
        if (err) {
          throw err;
        }

        if (grunt.option('verbose')) {
          var watched = watcher.watched();
          Object.keys(watched).forEach(function (watchedDir) {
            watched[watchedDir].forEach(function (watchedFile) {
              grunt.log.writeln(
                'Watching ' +
                path.relative(process.cwd(), watchedFile) +
                ' for changes.'
              );
            });
          });
        }

        watcher.on('all', function () {
          if (grunt.option('verbose')) {
            grunt.log.writeln('Killing child process');
          }
          var timeout = setTimeout(function () {
            treekill(proc.pid, 'SIGKILL');
          }, 2000);
          proc.on('exit', function () {
            clearTimeout(timeout);
          });
          treekill(proc.pid, 'SIGTERM');
        });
      });
      spawnChild();
    });
  });
};
