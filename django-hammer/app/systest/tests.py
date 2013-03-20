"""
Test to make sure that this application is running properly.
"""

from django.test import LiveServerTestCase
from selenium import webdriver

class AppRunsTest(LiveServerTestCase):

        def setUp(self):
            self.browser = webdriver.Firefox()
            self.browser.implicitly_wait(3)

        def tearDown(self):
            self.browser.quit()

        def test_is_alive(self):
            self.browser.get(self.live_server_url + '/')

            # She sees the familiar 'Django administration' heading
            #body = self.browser.find_element_by_tag_name('body')
            #self.assertIn('Django administration', body.text)

            
