from django.http        import HttpResponse
from django.shortcuts   import render
from os                 import listdir

def home(request):
    return render (request, 'index.html')

def list(request):
    d = listdir('/home/seaman/Projects/hammer/django-hammer/doc')
    return render (request, 'list.html', { 'directory': d })

def doc(request,title):
    return render(request, 'doc.html', { 'title': title})