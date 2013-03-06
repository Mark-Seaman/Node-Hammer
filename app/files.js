var fs      = require('fs');
var exec       = require('child_process').exec;


// List the files and perform an action
var list_files = function (doc, action) {
    exec('hammer-list '+doc, function(error,stdout) {
        if (error) stdout = ['No directory'];
        action({ files:stdout.split('\n') });
    });   
}

// Read the file and perform an action
var read_file = function (path, action) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) data = 'No file found';
        action({ id:path, data:data });
    });
}

// Read the file and perform an action
var write_file = function (doc, text, action) {
    p = exec('hammer-edit ../doc/'+doc, function(error,stdout) {
        action(stdout);
    })
    p.stdin.write(text);
    p.stdin.end();
}

// Format a wiki page
var format_file = function(doc, action) {
    exec('hammer-show ../doc/'+doc, function(error,stdout) {
        action(stdout);
    });
}

exports.list    = list_files;
exports.read    = read_file;
exports.write   = write_file;
exports.format  = format_file;