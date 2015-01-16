from django.db import models

class Participant(models.Model):
	token = models.CharField( max_length = 15, primary_key = True )
	role = models.CharField( max_length = 16)
	name = models.CharField( max_length = 128 )
	email = models.EmailField( )
	signup_date = models.DateTimeField( auto_now_add = True )

	def __unicode__(self):
		return self.token
