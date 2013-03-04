var fs      = require('fs');
var exec       = require('child_process').exec;


// List the files and perform an action
var list_files = function (path, action) {
    fs.readdir(path, function(err, files) {
        if (err) files = ['No directory'];
        action({ files:files });
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
var write_file = function (path, text, action) {
    var stream = fs.createWriteStream(path);
    stream.once('open', function(fd) {
        stream.write(text+"\n");
        stream.end();
        action();
    });
}

// Execute a command and act on the output
var execute_file = function(command, action) {
    exec(command, function(error,stdout) {
        action(stdout);    
    });
}

// Format a wiki page
var wiki_file = function(doc, action) {
    execute_file('hammer-read ../doc/'+doc, function(stdout) {
        action(stdout);
    });
}

exports.list    = list_files;
exports.read    = read_file;
exports.write   = write_file;
exports.execute = execute_file;
exports.wiki    = wiki_file;