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
app.get('/:app/', function(req, res){
    app = req.params.app;
    files.list (app, function (data) { res.render ('list', data) });
});

// New view
app.get('/:app/new', function(req, res) {
    app = req.params.app;
    res.render ('edit', {app:app, path:'', text:''} ); 
});


// Edit view
app.get('/:app/*:doc?/edit', function(req, res) {
    app = req.params.app;
    doc = req.params.doc;
    files.read (app, doc, function (text) { 
        res.render ('edit', {app:app, doc:doc, text:text} ); 
    });
});

// Save view
app.post('/:app/edit', function(req, res){
    app = req.params.app;
    doc = req.body.doc;
    text = req.body.text.replace(/\r/gm,'');
    if (req.param('cancel')) return res.redirect ('/'+app+'/'+doc); 
    files.write (app, doc, text, function () {
        res.redirect ('/'+app+'/'+doc); 
    });
});

// Execute pages
app.get('/:app/*:doc?/exec', function(req, res){
    doc = req.params.doc;
    app = req.params.app;
    files.execute(app, doc, 
                 function(text) { res.render('cmd',{app:app, path:doc, text:text}) },   
                 function()     { res.send ('Exec Error:'+app+','+doc)}
                )
});

// Doc pages
app.get('/:app/*:doc?', function(req, res){
    doc = req.params.doc;
    app = req.params.app;
    files.format(app, doc, 
                 function(text) { res.render('show',{app:app, path:doc, text:text}) },   
                 function()     { res.send ('Doc Error')}
                )
});


// Home page
app.get('*', function(req, res){
    console.log("Page:"+req.url)
    res.redirect ('/cmd/Home')
});

// Listen on 8080
var port = 8080;
server.listen(port);
console.log('Listening on port ' + port);
