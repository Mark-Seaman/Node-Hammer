var fs    = require('fs');
var exec  = require('child_process').exec;


// Read the file and perform an action
var read_file = function (doc, action) {
    exec('doc-get '+doc, function(error,stdout) {
        action(stdout);
    });   
}

// Read the file and perform an action
var write_file = function (doc, text, action) {
    exec('echo "'+text+'"|doc-put '+doc, function(error,stdout) {
        action(stdout);
    })
}

// Format a wiki page
var format_file = function(doc, show, create) {
    exec('doc-show '+doc, function(error,stdout) { 
        if (error) 
            show ("doc-show error:"+doc+','+error)
        else
            show(stdout) 
    })
}


exports.read    = read_file;
exports.write   = write_file;
exports.format  = format_file;
