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


// Format a document
app.get('/', function(req, res){
    res.redirect('/Index');
});
app.get('/:doc?/', function(req, res){
    res.redirect(req.params.doc+'/Index');
});
app.get('/*:doc?', function(req, res){
    doc = req.params.doc;
    files.format(doc, 
                 function(text) { res.render('show',{doc:doc, text:text}) },   
                 function()     { res.send ('Doc Error')}
                )
});


// Missing page
app.get('*', function(req, res){
    console.log("Page:"+req.url)
    res.redirect ('/Home')
});

// Listen on 8080
var port = 8080;
server.listen(port);
console.log('Listening on port ' + port);
