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

//-----------------------------------------------------------------------------
// Edit view

app.get('/*:doc?/edit', function(req, res) {
    doc = req.params.doc;
    files.read (doc, function (text) { 
        res.render ('edit', {doc:doc, text:text} ); 
    });
});

app.post('/*:doc?/edit', function(req, res){
    doc = req.body.doc;
    text = req.body.text.replace(/\r/gm,'');
    if (req.param('cancel')) return res.redirect ('/'+doc); 
    files.write (doc, text, function () {
        res.redirect ('/'+doc); 
    });
});

//-----------------------------------------------------------------------------
// Format a document

// Home
app.get('/', function(req, res){
    res.redirect('/Index');
});

// Directory
app.get('/:doc?/', function(req, res){
    doc = req.params.doc;
    console.log('Page:'+doc)
    res.redirect(req.params.doc+'/Index')
});

// Page
app.get('/*:doc?', function(req, res){
    doc = req.params.doc;
    console.log('Page:'+doc)
    files.format(doc, 
                 function(text) { res.render('doc',{doc:doc, text:text}) },   
                 function()     { res.send ('Doc Error')}
                )
});

// Missing page
app.get('*', function(req, res){
    console.log("Page:"+req.url)
    res.redirect ('/Index')
});

//-----------------------------------------------------------------------------
// Run server on port

var port = process.env.port;
server.listen(port);
console.log('Listening on port ' + port);
