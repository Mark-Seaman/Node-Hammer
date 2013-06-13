var fs    = require('fs');
var exec  = require('child_process').exec;


// Read the file and perform an action
var read_file = function (doc, action) {
    exec('hammer-read $p/doc/'+doc, function(error,stdout) {
        action(stdout);
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
var format_file = function(doc, show, create) {
    exec('hammer-show '+doc, function(error,stdout) { 
        if (error) 
            show ("hammer-show error:"+doc+','+error)
        else
            show(stdout) 
    })
}


exports.read    = read_file;
exports.write   = write_file;
exports.format  = format_file;
