from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

static_dir = {'document_root': '/home/seaman/Projects/hammer/django-hammer/app/static/'}

urlpatterns = patterns('',

                       # static files
                       url(r'^static/(?P<path>.*)$', 'django.views.static.serve', static_dir),

                       # admin
                       url(r'^admin/', include(admin.site.urls)),

                       # doc views
                       url(r'^$',                   'doc.views.home'),
                       url(r'^list$',               'doc.views.list'),
                       url(r'^add$',                'doc.views.add'),
                       url(r'^(?P<title>\w+)$',     'doc.views.doc'),
                       url(r'^(?P<title>\w+)/edit$', 'doc.views.edit'),


)
