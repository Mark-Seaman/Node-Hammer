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
    res.redirect ('/notes/SimpleApps'); 
});

// List view
app.get('/:app/', function(req, res){
    app = req.params.app;
    files.list (app, function (data) { res.render ('list', data) });
});

// New view
app.get('/:app/new', function(req, res) {
    app = req.params.app;
    res.render ('edit', {app:app, path:'', text:''} ); 
});

// Doc pages
app.get('/:app/:doc', function(req, res){
    doc = req.params.doc;
    app = req.params.app;
    files.format(app, doc, function(text) {
        res.render('show',{app:app, path:doc, text:text});    
    });
});

// Edit view
app.get('/:app/:doc/edit', function(req, res) {
    app = req.params.app;
    path = req.params.doc;
    files.read (app, path, function (data) { 
        res.render ('edit', {path:path, text:data.data} ); 
    });
});

// Save view
app.post('/:app/edit', function(req, res){
    app = req.params.app;
    path = req.body.path;
    text = req.body.text.replace(/\r/gm,'');
    if (req.param('cancel')) return res.redirect ('/'+path); 
    files.write (app, path, text, function () {
        res.redirect ('/'+path); 
    });
});

// Home page
app.get('*', function(req, res){
    files.format('.', 'FileNotFound', function(text) {
        res.render('show',{app:'.', doc:'Error', text:text});    
    });
});

// Listen on 8080
var port = 8080;
server.listen(port);
console.log('Listening on port ' + port);
