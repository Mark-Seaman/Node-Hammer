#!/usr/bin/env python
# Configure mill settings

from sys import stdin, argv
from os  import environ, path
from json import dumps, loads


# Global state cache
vars = {}

# Save vars in a named file
def save_all_vars(file=None):
    if not file:
        file = environ['p']+'/pipedata/ramdisk/vars-data'
    f = open(file,'w')
    for v in sorted(vars):
        f.write('%s = %s\n' % (v,vars[v]))
    f.close()

# Read the previous state vars
def read_all_vars(file=None):
    global vars
    if not file:
        file = environ['p']+'/pipedata/ramdisk/vars-data'
    if not path.exists(file): return
    text  = open(file).read()
    lines = text.split('\n')
    for line in lines: 
        parts = line.split(' = ')
        if len(parts)>1:
            vars[parts[0]] = parts[1]
        else:
            if len(parts[0])>0:
                vars[parts[0]] = 0

# Lookup if the key exists 
def lookup(var):
    if vars=={}:
        read_all_vars()
    if vars.has_key(var): return vars[var]
    vars[var] = 0

# Set a variable
def set_var(name,value):
    if vars=={}:
        read_all_vars()
    vars[name] = value
    save_all_vars()

# Process a single variable
def process_var(line):
    parts = line.split('=')
    name = parts[0].strip()
    if len(parts)>1:
        vars[name] = parts[1].strip()
    else:
        if len(name)==0: return
        lookup(name)
    print name,'=',lookup(name)

# Process a block of text, each line has a variable
def process_vars(text,var_file=None):
    read_all_vars(var_file)
    map(process_var, text.split('\n'))
    save_all_vars(var_file)

# Read the JSON output for all vars
def print_json():
    if vars=={}:
        read_all_vars()
    print dumps(vars)

# Save the JSON data as the current var state
def save_json(json):
    global vars
    vars = loads(json)
    save_all_vars()

