from selenium import webdriver
browser = webdriver.Firefox()
browser.get('http://google.com')
print browser.title
browser.quit()
