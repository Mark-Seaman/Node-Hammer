var express = require('express');
var http    = require('http');
var app     = express();
var server  = http.createServer(app);

var files   = require('./files');

app.set('view engine', 'jade');
app.set('view options', { layout: false });
app.set('views', __dirname+'/views');

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
// Find view
app.get('/find', function(req, res) {
    res.render ('find', { text:[ 'thing 1', 'thing 2'] })
});

app.post('/find', function(req, res){
    path = req.body.id;
    if (req.param('cancel')) return res.redirect ('/'); 
    files.find (path, function (data) { res.render('find', data) })
});


//-----------------------------------------------------------------------------
// Edit view
app.get('/:id/edit', function(req, res) {
    files.get(req.params.id, function (data) { res.render ('edit', data) })
});


// New view
app.get('/new', function(req, res) {
    res.render ('edit', files.new()); 
});

// Save view
app.post('/save', function(req, res){
    path = req.body.id;
    if (req.param('cancel')) return res.redirect ('/'+path); 
    c1   = req.body.child1;
    c2   = req.body.child2;
    c3   = req.body.child3;
    c4   = req.body.child4;
    text = path+'\n'+ c1+'\n'+c2+'\n'+c3+'\n'+c4+'\n';
    files.put (path, text, function () { res.redirect ('/'+path) })
});

//-----------------------------------------------------------------------------

// List view
app.get('/', function(req, res){
    files.list ('.', function (data) { res.render ('list', data) })
});

// Detail view
app.get('/:id', function(req, res) {
    files.get (req.params.id, function (data) { res.render ('detail',  data) })
});


var port = 8084;
server.listen(port);
console.log('Listening on port ' + port);
