from django.http        import HttpResponseRedirect, HttpResponse
from django.shortcuts   import render
from os                 import listdir

from models             import *


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
    return render(request, 'doc.html', { 'title': title, 'text': format_doc(title)})


def edit_form (request, title=None):
    '''
    Create a form for editing the object details
    '''
    if request.method == 'POST':
        if request.POST.get('cancel', None):
            if not title:
                title = 'Home'
            return HttpResponseRedirect(title) 
        else:
            form = NoteForm(request.POST)
            if form.is_valid():
                title = form.cleaned_data['path']
                write_doc(title, form.cleaned_data['body'])
                return HttpResponseRedirect(title) 
    else:
        note =  Note()
        if  title:
            note.path = title
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

