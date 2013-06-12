#!/bin/bash
# Test the files in this project

cd $pa
find | grep -v './node_modules' | sort 

cd $pb
find | sort

cd $pt
find | sort

