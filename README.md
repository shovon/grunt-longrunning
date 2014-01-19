# grunt-longrunning

> Spawn multiple long running processes in a single grunt task.

Also features listening for changes in files, and restarting the process.

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-longrunning --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-longrunning');
```

## The "longrunning" task

### Overview
In your project's Gruntfile, add a section named `longrunning` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  longrunning: {
    all: {
      commands: [
        {
          cmd: 'node',
          args: [ 'server1.js' ]
          files: [
            // Files don't need to be `server1`-specific. The following is
            // simply an example.
            'server1/specific/files/*.js'
          ]
        },
        {
          cmd: 'node',
          args: [ 'server2.js' ]
        }
      ]
    }
  },
});
```

### Options

#### options.commands
Type: `Array`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.commands[index].cmd
Type: `String` (required)

The command name.

#### options.commands[index].args
Type: `Array`
Default: `[]`

The arguments to pass to the command.

#### options.commands[index].files
Type: `Array` or `String`
Default: `undefined`

A single glob pattern, or an array of glob patterns. Used for listening to
changes made to files that match the glob pattern or patterns.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

**v0.0.0** January 19, 2014

Initial release