from django.http        import HttpResponse
from django.shortcuts   import render
from os                 import listdir

def home(request):
    d = listdir('/home/seaman/Projects/hammer/django-hammer/doc')
    return render (request, 'list.html', { 'directory': d })

