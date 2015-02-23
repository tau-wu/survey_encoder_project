from django.conf.urls import patterns, url
from encodeParticipants import views

urlpatterns = patterns('',
	url(r'^key/$', views.index, name='index'),
	url(r'^request_key/$', views.request_key, name='request_key'),
	url(r'^login/$', views.admin_login, name='admin_login'),
	url(r'^logout/$', views.admin_logout, name='admin_logout'),
	url(r'^$', views.redirect_home, name='home'),
	url(r'^.*$', views.not_found, name='not_found'),
)