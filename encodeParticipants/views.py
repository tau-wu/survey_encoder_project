from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseBadRequest
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import ensure_csrf_cookie
from os import urandom
from base64 import urlsafe_b64encode

from encodeParticipants.models import Participant
from encodeParticipants.forms import ParticipantForm, AdminForm

def index(request, context_dict = {} ):
	context = RequestContext(request)

	if not request.user.is_authenticated():
		content = []
		for participator in Participant.objects.all():
			content.append( [participator.signup_date, participator.name, participator.email, participator.role, participator.token] )
		context_dict.update( {'all_keys' : content} )

	context_dict.update( { 'participant_form': ParticipantForm( ), 'admin_form': AdminForm() } )

	return render_to_response('encodeParticipants/index.html', context_dict, context)

@ensure_csrf_cookie
def request_key(request):

	if request.method == 'POST':
		#create the form
		form = ParticipantForm( request.POST )

		if ( form.is_valid( ) ):
			participator = form.save( commit = False )

			#check if user has already been added
			results = Participant.objects.filter( email = participator.email )
			if ( results ):
				return HttpResponse( results[0].token )
			else:
				participator.token = urlsafe_b64encode(urandom(15))
				participator.save( )
				return HttpResponse( participator.token )

		else:
			response = HttpResponseBadRequest( content_type='text/html' )
			error_message = ""
			for error_field, error_values in form.errors.items():
				for error in error_values:
					error_message += "<p>" + error_field + ": " + error + "</p>"
			response.write( error_message )
			return response

	return HttpResponseRedirect('/key/')

@ensure_csrf_cookie
def admin_login( request ):

	if request.method == 'POST':
		username = request.POST['username']
		password = request.POST['password']

		user = authenticate( username = username, password = password )

		if user:
			if user.is_active:
				login( request, user )
				return HttpResponse( )
			else:
				return HttpResponseBadRequest( "Your account is disabled." )
		else:
			return HttpResponseBadRequest( "Invalid login details supplied." )
	
	return HttpResponseRedirect('/key/')

def admin_logout( request ):
	logout (request)
	return HttpResponseRedirect('/key/')

def not_found( request ):
	context = RequestContext(request)
	return render_to_response('encodeParticipants/404.html', {}, context)

def redirect_home( request ):
	return HttpResponseRedirect('/key/')
