//console.log ("Thot.js start");

var thot     = require('./thot');


thot.remove(/New/);

thot.lookup ('New title');
thot.lookup ('bad title');

thot.add('Mark Seaman');
thot.add('Stacie Seaman');
thot.add('Christine Seaman');
thot.add('Josiah Seaman');
thot.add('Rachel Seaman');

thot.lookup (/stine/);
//thot.find();

console.log ("Thot.js done");

setTimeout(process.exit, 5000);
