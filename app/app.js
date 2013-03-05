// System requirements
var express    = require('express');
var app        = express();
var http       = require('http');
var server     = http.createServer(app);
var files      = require('./files');


// Setup environment
app.set('view engine', 'jade');
app.set('view options', { layout: true });
app.set('views',        __dirname+'/views');

app.use(express.bodyParser()); // Automatically parses form data

//-----------------------------------------------------------------------------
// Static files
app.get('/favicon.ico', function(req, res){
    res.sendfile ('views/favicon.ico');
});

app.get('/views/*?:file?', function(req, res){
    res.sendfile ('views/'+req.params.file);
});

// List view
app.get('/', function(req, res){
    files.list ('../doc', function (data) { res.render ('list', data) });
});

// New view
app.get('/new', function(req, res) {
    res.render ('edit', {path:'', text:''} ); 
});

// Doc pages
app.get('/:doc', function(req, res){
    doc = req.params.doc;
    files.wiki(doc, function(stdout) {
        res.render('doc',{path:doc, text:stdout});    
    });
});

// Edit view
app.get('/:doc/edit', function(req, res) {
    path = req.params.doc;
    files.read ('../doc/'+path, function (data) { 
        res.render ('edit', {path:path, text:data.data} ); 
    });
});

// Save view
app.post('/save', function(req, res){
    path = req.body.path;
    text = req.body.text.replace(/\r/gm,'');
    if (req.param('cancel')) return res.redirect ('/'+path); 
    files.write ('../doc/'+path, text, function () {
        res.redirect ('/'+path); 
    });
});

// Home page
app.get('*', function(req, res){
    res.redirect('/Home');    
});

// Listen on 8080
var port = 8080;
server.listen(port);
console.log('Listening on port ' + port);
