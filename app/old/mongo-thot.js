//-----------------------------------------------------------------------------
// data

var mongoose = require('mongoose');
mongoose.connect('localhost', 'test');

var ThotSchema = new mongoose.Schema({
    author:    { type: Number },
    title:     { type: String  },
    child1:    { type: Number },
    child2:    { type: Number },
    child3:    { type: Number },
    child4:    { type: Number },
    create:    { type: String  },
    expire:    { type: String  },
});

var Thot = mongoose.model('Thot', ThotSchema);

//-----------------------------------------------------------------------------
// add

var add = function(data) {
    console.log('add ' + data.title);
    var thot = new Thot(data);
    thot.save(function(err) {
        if (err) return console.log(err);
        return console.log('Thot was created');
    });
    console.log('Thot saved');
}

var addNew = function(title) {
    add({
        author:  0,
        title:   title,
        child1:  '',
        child2:  '',
        child3:  '',
        child4:  '',
        create:  '2013-01-01',
        expire:  '2013-01-01',
    });
}

//-----------------------------------------------------------------------------
// find

var find = function() {
    console.log ('find');
    Thot.find({}).select('title create').exec(function(err,doc){
        if (err || !doc) return console.log ("Error: no records found");
        doc.forEach(function(d) {
            console.log ("%s", d.title);
        });
    });
};

var lookup = function(title) {
    console.log ('lookup (%s)',title);
    Thot.findOne({ title: title }, function(err,doc){
        if (err || !doc) return console.log ("Error: %s not found", title);
        console.log ("%s", doc.title);
     });
 };


//-----------------------------------------------------------------------------
// remove

var remove = function(title) {
    console.log ('remove (%s)', title);
    Thot.remove({ title:title } , function(err,doc){
        if (err || !doc) return console.log ("Error: no records found");
        console.log ("%s", doc);
     });
 };


//-----------------------------------------------------------------------------

exports.remove = remove;
exports.lookup = lookup;
exports.find   = find;
exports.add    = addNew;





