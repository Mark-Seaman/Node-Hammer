from django.db          import models
from django.forms       import ModelForm

class Note (models.Model):
    path  = models.CharField (max_length=200)
    body  = models.TextField ()
 
class NoteForm (ModelForm):
    class Meta:
        model=Note

