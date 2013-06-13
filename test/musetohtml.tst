#!/bin/bash
# Convert Muse to HTML

cd $p/test
hammer-wiki < sample.muse > xsample.html
sed -i 3,5d xsample.html
diff xsample.html sample.html
rm xsample.html
