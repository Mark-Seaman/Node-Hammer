from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',

url(r'^$',     'doc.views.home', name='home'),
url(r'^list$', 'doc.views.list', name='list'),
url(r'^(?P<title>\w+)$', 'doc.views.doc',  name='doc'),

# url(r'^admin/', include(admin.site.urls)),

)
