from django.http        import HttpResponse
from django.shortcuts   import render
from os                 import listdir
from subprocess         import Popen,PIPE

def home(request):
    return render (request, 'index.html')

def list(request):
    d = listdir('/home/seaman/Projects/hammer/django-hammer/doc')
    return render (request, 'list.html', { 'directory': d })

def doc(request,title):
    return render(request, 'doc.html', { 'title': title, 'text': read_doc(title)})


# Run the command as a process and capture stdout & print it
def do_command(cmd):
    return  Popen(cmd.split(),stdout=PIPE).stdout.read()

# Run the echo command
def read_doc(title):
    return do_command('wiki-html-content ../doc/'+title)
