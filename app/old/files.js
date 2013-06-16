var fs    = require('fs');
var exec  = require('child_process').exec;


// List the files and perform an action
var list_files = function (path, action) {
    fs.readdir('../doc/'+path, function(err, files) {
        if (err) files = ['No directory'];
        action({ files:files });
    });
}

// Read the file and perform an action
var read_file = function (path, action) {
    fs.readFile('../doc/'+path, 'utf8', function(err, data) {
        if (err) {
            data = { id: path, child1:'a', child2:'b', child3:'c', child4:'d'};
        }
        else {
            a = data.split('\n');
            data = { id: a[0], child1:a[1], child2:a[2], child3:a[3], child4:a[4]}
        }
        action(data);
    });
}

// Read the file and perform an action
var write_file = function (path, text, action) {
    var stream = fs.createWriteStream('../doc/'+path);
    stream.once('open', function(fd) {
        stream.write(text+"\n");
        stream.end();
        action();
    });
}

// Create a new topic
var new_topic = function(title, action) {
     return {id:title,  child1:'Child 1', child2:'Child 2', child3:'Child 3', child4:'Child 4'}
}

// Save the topic
var save_topic = function(path, text, action) {
    write_file (path, text, function () {
        action();
    });
}

// Execute a command and act on the output
var execute_file = function(command, action) {
    exec(command, function(error,stdout) {
        if (error) return action({ text: [ 'Error executing command'] });
        action({ text: stdout.split('\n') });    
    });
}

// Format a wiki page
var find_text = function(doc, action) {
    console.log('thot-find "%s"', doc)
    execute_file('thot-find "'+doc+'"', function(text) {
        action(text);
    });
}

// Lookup a topic
var get_topic = function(doc, action) {
    console.log('thot-read "%s"', doc)
    execute_file('thot-read "'+doc+'"',  function(text) {
        action(text);
    });
}

// Exports
exports.list    = list_files;
exports.read    = read_file;
exports.write   = write_file;
exports.new     = new_topic;
exports.get     = get_topic;
exports.put     = save_topic;
exports.execute = execute_file;
exports.find    = find_text;
