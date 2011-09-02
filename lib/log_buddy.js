var fs = require('fs')
,   util = require('util')
,   LogBuddy;

LogBuddy = function () {
  var args = Array.prototype.slice.call(arguments)
  , LogBuddyVariableName;

  /**
   * Used internally to log output to stdout
   * via console.log
   */
  function debug() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = "====> " + args[0];
    }
    console.log.apply(this, args);
  };

  /**
   * Retrieve arguments from this LogBuddy call
   *
   * @param {String} line (within which call to this LogBuddy fn happens)
   *
   * @return {Array} list of original arguments to LogBuddy
   */
  function parseArgs(line) {
    var regexp = LogBuddyVariableName + '\\(([\\w,]+)\\)'
    ,   args = line.match(new RegExp(regexp))[1].split(',');
    return args;
  };

  /**
   * Extract the variable name used to hold this LogBuddy function
   *
   * @param {Buffer}   data
   *
   * @return {String}  Name of variable
   */
  function extractLogBuddyVariableName(data) {
    var lines = data.toString('utf8').split("\n")
    ,  log_buddy = lines.filter(function(l) { return /log_buddy/.test(l) || /log-buddy/.test(l);})[0];

    log_buddy = log_buddy && log_buddy.match(/(\w+)\s*=\s*require/)[1];
    return log_buddy || 'd';
  }

  /**
   * Get original line that called log_buddy
   *
   * @param {String}   path
   * @param {Integer}  line_number
   * @param {Function} callback
   *
   * @return {String} line
   */
  function parseLine(data, line_number) {
    return data.toString('utf8').split("\n")[line_number-1].trim();
  }

  /**
   * Get original line that called log_buddy
   *
   * @param {String}   path
   * @param {Integer}  line_number
   * @param {Function} callback (err, [list of original arguments]
   */
  function readLine(path, line_number, callback) {
    fs.readFile(path, 'utf8', function(err, data) {
      if(err) {
        console.error("Could not open file: %s", err);
        callback(true);
      }
      else {
        LogBuddyVariableName = extractLogBuddyVariableName(data);
        var line = parseLine(data, line_number);
        callback(false, parseArgs(line));
      }
    });
  };

  /**
   * Log arguments along with their names
   *
   * @param {Boolean} err
   * @param {Array} _argNames
   */
  function printArgs(err, _argNames) {
    if (err) {
      console.error('Could not read variable names!');
    }
    else {
      var argNames = _argNames;

      args.forEach(function(arg, i) {
        debug(argNames[i] + ": ", arg);
      });
    }
  };

  /**
   * Search stack for line where log_buddy was called
   *
   * @param {Error} err
   */
  function parseStackTrace(err) {
    var frame = err.stack.split("\n", 3)[2].split(':')
    ,   path = frame[0].match(/(\/[\w\s\/]+\.js).*$/)[1].trim()
    ,   line_number = parseInt(frame[1]);

    readLine(path, line_number, printArgs);
  };


  //Throw and catch undefined variable exception to get stack trace
  try {
    throw new Exception();
  }
  catch(err) {
    parseStackTrace(err);
  }
};

//exports
module.exports = LogBuddy;
