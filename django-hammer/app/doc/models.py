from django.db          import models
from django.forms       import ModelForm
from subprocess         import Popen,PIPE
from os.path            import exists

class Note (models.Model):
    '''
    Note data model
    '''
    path  = models.CharField (max_length=200)
    body  = models.TextField ()

class NoteForm (ModelForm):
    '''
    Note form data model used to edit notes
    '''
    class Meta:
        model=Note



def do_command(cmd):
    '''
    Run the command as a process and capture stdout & print it
    '''
    return  Popen(cmd.split(),stdout=PIPE).stdout.read()


def is_doc(title):
    '''
    Look for the document
    '''
    return exists('../doc/'+title)


def format_doc(title):
    '''
    Run the wiki formatter on the document
    '''
    return do_command('wiki-html-content ../doc/'+title)


def read_doc(title):
    '''
    Run the wiki formatter on the document
    '''
    return open('../doc/'+title).read()


def write_doc(title,body):
    '''
    Save the document file
    '''
    return  open('../doc/'+title, 'wt').write(body)


