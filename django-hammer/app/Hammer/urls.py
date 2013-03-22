from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

static_dir = {'document_root': '/home/seaman/Projects/hammer/django-hammer/app/static/'}

urlpatterns = patterns('',

                       url(r'^static/(?P<path>.*)$', 'django.views.static.serve', static_dir),

                       url(r'^$', 'doc.views.home', name='home'),
                       url(r'^list$', 'doc.views.list', name='list'),
                       url(r'^(?P<title>\w+)$', 'doc.views.doc', name='doc'),

                       # url(r'^admin/', include(admin.site.urls)),

)
