from django import forms
from django.contrib.auth.models import User

from encodeParticipants.models import Participant

class ParticipantForm(forms.ModelForm):
	token = forms.CharField( widget = forms.HiddenInput(), initial = "hi" )
	role = forms.ChoiceField( ( ('T', 'Teacher'), ('P' , 'Parent' ) ))
	name = forms.CharField( max_length = 128 )
	email = forms.EmailField( )

	class Meta:
		model = Participant
		fields = ('token', 'role', 'name', 'email')

class AdminForm(forms.ModelForm):
	password = forms.CharField( widget = forms.PasswordInput( ) )

	class Meta:
		model = User
		fields = ('username', 'password')