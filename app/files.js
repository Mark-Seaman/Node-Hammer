var fs    = require('fs');
var exec  = require('child_process').exec;


// List the files and perform an action
var list_files = function (action) {
    exec('hammer-list .', function(error,stdout) {
        action({files:stdout.split('\n').slice(0,-1) });
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
var format_file = function(doc, show, create) {
    path = '../doc/'+doc
    fs.exists(path, function(exists) {
        if (exists) { 
            exec('hammer-show '+path, function(error,stdout) { 
                show(stdout) 
            })
        }
        else {
            show("PATH:"+path+'   Text:Format Error')
        }
    })
}

// Execute a script and return the result
var execute_file = function(doc, show, create) {
    path = '../doc/'+doc
    fs.exists(path, function(exists) {
        if (exists) { 
            exec(path, function(error,stdout) { 
                show(stdout) 
            })
        }
        else {
            show("PATH:"+path+'   Text:xxError')
        }
    })
}

exports.list    = list_files;
exports.read    = read_file;
exports.write   = write_file;
exports.execute = execute_file;
exports.format  = format_file;
