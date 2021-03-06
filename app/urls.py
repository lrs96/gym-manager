from django.conf.urls import url
from django.contrib.auth import views as auth_views
from django.views.generic import RedirectView
from .views.aluno_views import *
from .views.login_views import *
from .views.ficha_medica_views import *

urlpatterns = (
    # Login
    url(r'^$', RedirectView.as_view(url='/logar/')),
    url('logar/$', logar, name='logar'),
    url(r'^$', deslogar, name='deslogar'),
    url('esqueci-minha-senha/$', esqueci_minha_senha, name="esqueci_minha_senha"),

    # Index Dashboard
    url('index/$', index, name='index'),

    # aluno
    url('cadastrar-aluno/', cadastrar_aluno, name='cadastrar_aluno'),
    url(r'^listar-aluno/', listar_aluno, name='aluno_list'),
    url(r'^editar-aluno/(?P<pk>[0-9]+)', editar_aluno, name='editar_aluno'),
    url(r'^remover-aluno/(?P<pk>[0-9]+)', remover_aluno, name='remover_aluno'),

    url(r'^detalhes-do-aluno/(?P<pk>[0-9]+)', details_aluno, name='details_aluno'),
    url(r'^detalhes-da-avaliacao/(?P<pk>[0-9]+)', details_avaliacao, name='details_avaliacao'),

    
    url(r'^cadastro-de-avaliacao-fisica/', cadastrar_avaliacao_fisica, name='cadastrar_avaliacao_fisica'),
    url(r'^historico-de-avaliacoes/(?P<pk>[0-9]+)', historico_avaliacao, name='historico_avaliacao'),
    url(r'^editar-avaliacao/(?P<pk>[0-9]+)', editar_avaliacao, name='editar_avaliacao'),


    # não definido
    url('registrar_usuario/$', registrar_usuario, name='registrar_usuario'),
    url('listar_usuario/$', listar_usuario, name='listar_usuario'),
    url('remover_usuario/(?P<pk>[0-9]+)', remover_usuario, name='remover_usuario'),
    url(r'^editar-admin/(?P<pk>[0-9]+)', edit_user, name='edit_user'),
)