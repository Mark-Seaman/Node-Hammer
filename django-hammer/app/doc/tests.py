"""
Test to make sure that this application is running properly.
"""

from django.http            import HttpRequest, HttpResponse
from django.template.loader import render_to_string
from django.test            import TestCase
from os                     import listdir

from doc.views          import home


# This test hand constructs requests and calls the views

def file_list():
    return listdir('/home/seaman/Projects/hammer/django-hammer/doc')


class AppUnitTest(TestCase):

        # Compare the docs
        def test_renders_correct_html(self):

            request = HttpRequest()
            response = home(request)
            expected = render_to_string('list.html',{ 'directory': file_list() })
            self.assertEqual(response.content, expected)
            #print repr(response.content)
            
        # Make sure the correct template is used
        def test_renders_correct_template(self):

            request = HttpRequest()
            response = home(request)
            expected = render_to_string('list.html',{ 'directory': file_list() })
            for t in ['ServerTricks','TestTricks','AllTricks','Home']:
                    self.assertIn(t, expected)

