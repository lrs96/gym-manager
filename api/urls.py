from django.conf.urls import url
from django.contrib.auth import views as auth_views
from .views import api, autocompleteModel


urlpatterns = (
    # api
    url(r'^(?P<pk>[0-9]+)/(?P<param>[\w-]+)', api, name='api'),
    url(r'search-idluno/', autocompleteModel, name="autocompleteModel")
)
