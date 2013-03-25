from django.http        import HttpResponseRedirect, HttpResponse
from django.shortcuts   import render
from os                 import listdir

from models             import *

file_not_found =  "<blockquote>File not found.\nPlease check the name.</blockquote>" 

def home(request):
    '''
    Render the home view
    '''
    return doc(request, 'Home')


def list(request):
    '''
    Render the list view
    '''
    d = listdir('/home/seaman/Projects/hammer/django-hammer/doc')
    return render (request, 'list.html', { 'directory': d })


def doc(request,title):
    '''
    Render the doc view
    '''
    if is_doc(title):
        return render(request, 'doc.html', {'title': title, 'text': format_doc(title)})
    else:
        return  HttpResponseRedirect(title+'/edit')
        #return render(request, 'doc.html', {'title': title, 'text': file_not_found})


def edit_form (request, title=None):
    '''
    Create a form for editing the object details
    '''
    if request.method == 'POST':
        form = NoteForm(request.POST)
        if request.POST.get('cancel', None):
            title = form.data['path']
            if not title:
                title = 'Home'
            return HttpResponseRedirect(title) 
        else:
            if form.is_valid():
                title = form.cleaned_data['path']
                write_doc(title, form.cleaned_data['body'])
                return HttpResponseRedirect(title) 
    else:
        note =  Note()
        if  title:
            note.path = title
            if is_doc(title):
                note.body = read_doc(title)
        form =  NoteForm(instance=note)
    data =  { 'form': form, 'title': title  }
    return render(request, 'edit.html', data)


def add(request):
    '''
    Render the add view
    '''
    return edit_form (request)
   


def edit(request,title):
    '''
    Render the add view
    '''
    return edit_form (request,title)

