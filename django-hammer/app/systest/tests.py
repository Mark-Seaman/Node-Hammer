"""
Test to make sure that this application is running properly.
"""

from django.http            import HttpRequest, HttpResponse
from django.template.loader import render_to_string
from django.test            import LiveServerTestCase, TestCase
from selenium               import webdriver
from os                     import listdir

from doc.views          import home


class AppRunsTest(LiveServerTestCase):

        def setUp(self):
            self.browser = webdriver.Firefox()
            self.browser.implicitly_wait(3)

        def tearDown(self):
            self.browser.quit()

        # Get the home page
        def test_is_alive(self):
            
            self.browser.get(self.live_server_url + '/')
            self.assertEqual('Hammer Django', self.browser.title)

        # Make sure all files are in the body
        def test_list_of_files(self):

            self.browser.get(self.live_server_url + '/')
            body = self.browser.find_element_by_tag_name('body')
            for t in ['ServerTricks','TestTricks','AllTricks','Home']:
                    self.assertIn(t, body.text)

        # Make sure the correct template is used
        def test_renders_correct_template(self):

            d = listdir('/home/seaman/Projects/hammer/django-hammer/doc')
            request = HttpRequest()
            response = home(request)
            expected = render_to_string('list.html',{ 'directory': d })

            self.browser.get(self.live_server_url + '/')
            self.assertEqual(response.content, expected)
