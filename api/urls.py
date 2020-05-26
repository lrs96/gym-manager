from django.conf.urls import url
from django.contrib.auth import views as auth_views
from .views import api, autocompleteModel, percentual_de_gordura, delete_aluno


urlpatterns = (
    # api
    url(r'^(?P<pk>[0-9]+)/(?P<param>[\w-]+)', api, name='api'),
    url(r'search-idluno/', autocompleteModel, name="autocompleteModel"),
    url(r'^porcentagem-de-gordura/(?P<pk>[0-9]+)/', percentual_de_gordura, name='percentual_de_gordura'),
    url(r'^delete_aluno/(?P<pk>[0-9]+)/', delete_aluno, name='delete_aluno'),
)
