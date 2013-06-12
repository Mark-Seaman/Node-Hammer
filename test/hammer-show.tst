#!/bin/bash
# Test the hammer-show command

function execute
{
    echo
    echo  hammer-show $*
    hammer-show $* | grep -v 'Results from'
}
execute 
execute Index
execute book
execute book/Index
execute book/xxx

