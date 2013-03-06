var fs    = require('fs');
var exec  = require('child_process').exec;


// List the files and perform an action
var list_files = function (app, action) {
    exec('hammer-list '+app, function(error,stdout) {
        action({ app:app, files:stdout.split('\n').slice(0,-1) });
    });   
}

// Read the file and perform an action
var read_file = function (app, doc, action) {
    exec('hammer-read ../doc/'+app+'/'+doc, function(error,stdout) {
        action(stdout);
    });   
}

// Read the file and perform an action
var write_file = function (app, doc, text, action) {
    p = exec('hammer-edit ../doc/'+app+'/'+doc, function(error,stdout) {
        action(stdout);
    })
    p.stdin.write(text);
    p.stdin.end();
}

// Format a wiki page
var format_file = function(app, doc, action) {
    exec('hammer-show ../doc/'+app+'/'+doc, function(error,stdout) {
        action(stdout);
    });
}

exports.list    = list_files;
exports.read    = read_file;
exports.write   = write_file;
exports.format  = format_file;
