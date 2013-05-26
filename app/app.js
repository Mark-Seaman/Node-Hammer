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
    files.list (function (data) { res.render ('list', data) });
});

// New view
app.get('/new', function(req, res) {
    res.render ('edit', {path:'', text:''} ); 
});


// Edit view
app.get('/*:doc?/edit', function(req, res) {
    doc = req.params.doc;
    files.read (doc, function (text) { 
        res.render ('edit', {doc:doc, text:text} ); 
    });
});

// Save view
app.post('/edit', function(req, res){
    doc = req.body.doc;
    text = req.body.text.replace(/\r/gm,'');
    if (req.param('cancel')) return res.redirect ('/'+doc); 
    files.write (doc, text, function () {
        res.redirect ('/'+doc); 
    });
});

// Execute pages
app.get('/*:doc?/exec', function(req, res){
    doc = req.params.doc;
    files.execute(doc, 
                 function(text) { res.render('cmd',{path:doc, text:text}) },   
                 function()     { res.send ('Exec Error:'+doc)}
                )
});

// Doc pages
app.get('/*:doc?', function(req, res){
    doc = req.params.doc;
    files.format(doc, 
                 function(text) { res.render('show',{doc:doc, text:text}) },   
                 function()     { res.send ('Doc Error')}
                )
});

// Home page
app.get('*', function(req, res){
    console.log("Page:"+req.url)
    res.redirect ('/Home')
});

// Listen on 8080
var port = 8080;
server.listen(port);
console.log('Listening on port ' + port);
