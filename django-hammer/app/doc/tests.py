"""
Test to make sure that this application is running properly.
"""

from django.http            import HttpRequest, HttpResponse
from django.template.loader import render_to_string
from django.test            import TestCase
from os                     import listdir

from doc.views              import home,list,doc,read_doc
from doc.models             import Note,NoteForm

# This test hand constructs requests and calls the views

def file_list():
    '''
    List the current docs
    '''
    return listdir('/home/seaman/Projects/hammer/django-hammer/doc')

#TODO: create a function to diff two text string using 'diff'

class AppUnitTest(TestCase):

        
        def test_renders_correct_template(self):
            '''
            Compare the docs
            '''
            request = HttpRequest()
            response = list(request)
            actual = str(response.content)
            expected = render_to_string('list.html', 
                                        {'directory': file_list(), 
                                         'STATIC_URL': '/static/'})
            #print 'Response:', actual
            #print 'Expected:', expected
            self.assertEqual( actual, expected)


        def test_renders_correct_html(self):
            '''
            Make sure the correct template is used
            '''
            expected = render_to_string('list.html',{ 'directory': file_list() })
            for t in ['ServerTricks','TestTricks','AllTricks','Home']:
                    self.assertIn(t, expected)


        def test_render_home(self):
            '''
            Render the home view
            '''
            request  = HttpRequest()
            response = home(request)
            actual   = str(response.content)
            expected = str(render_to_string('doc.html', 
                           { 'title': 'Home', 
                             'text': read_doc('Home'),
                             'STATIC_URL': '/static/'}))
            self.assertEqual(actual, expected)


        def test_render_add(self):
            '''
            Render the add view
            '''
            request  = HttpRequest()
            response = home(request)
            actual   = str(response.content)
            expected = str(render_to_string('doc.html', 
                           { 'title': 'Home', 
                             'text': read_doc('Home'),
                             'STATIC_URL': '/static/'}))
            self.assertEqual(actual, expected)

