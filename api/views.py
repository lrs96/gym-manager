from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from app.models import Aluno, Ficha_fisica
from .serializer import MySerializer
from .calculos.evolucao_fisica import CalculadorEvolucaoFisica
from .calculos.get_medidas import GetMedidas
from .calculos.percentual_gordura import classifica_percentul_gordura
import json
from django.http import HttpResponse

# Create your views here.
@login_required
def api(request, pk, param):
    param_direito = None
    param_esquerdo = None
    param_unico = None
    qtd_de_avaliacoes = int(request.GET.get('filter'))
    if param == 'medida_antebraco' or param == 'medida_triceps' or param == 'medida_biceps':
        query_list = MySerializer().serialize(
                                    Ficha_fisica.objects.filter(aluno_id=pk).order_by('-created_at')[:qtd_de_avaliacoes],
                                    fields=['created_at', '{}_direito'.format(param), '{}_esquerdo'.format(param)])
        param_direito = True

    elif param == 'medida_coxa' or param == 'medida_panturrilha':
        query_list = MySerializer().serialize(
                                    Ficha_fisica.objects.filter(aluno_id=pk).order_by('-created_at')[:qtd_de_avaliacoes],
                                    fields=['created_at', '{}_direita'.format(param), '{}_esquerda'.format(param)])
        param_esquerdo = True
    
    elif param == 'medida_peito' or param == 'medida_abdomen' or param == 'medida_costas':
        query_list = MySerializer().serialize(
                                    Ficha_fisica.objects.filter(aluno_id=pk).order_by('-created_at')[:qtd_de_avaliacoes],
                                    fields=['created_at', '{}'.format(param)])
        param_unico = True

    medidas = []

    for item in query_list:
        medidas.append(item['fields'])
    
    if len(medidas) >=2:    
        if param_direito == True:
            print('param direito')    
            result_get_medidas = GetMedidas().get_medidas_direita(medidas, param)
            medidas.append(result_get_medidas)
        elif param_esquerdo == True:
            result_get_medidas = GetMedidas().get_medidas_esquerda(medidas, param)
            medidas.append(result_get_medidas)
        elif param_unico == True:
            result_get_medidas = GetMedidas().get_medidas_unicas(medidas, param)
            medidas.append(result_get_medidas)

    return JsonResponse(medidas, safe=False)



def autocompleteModel(request):
    q_aluno = request.GET.get('filterAluno')
    query_list = MySerializer().serialize(Aluno.objects.filter(nome__iexact=q_aluno))
    medidas = []
    
    for item in query_list:
        medidas.append(item['fields'])
    
    return JsonResponse(query_list, safe=False)


def percentual_de_gordura(request, pk):
    dados_aluno = MySerializer().serialize(Aluno.objects.filter(pk=pk), fields=['idade', 'sexo'])
    dados_ficha_aluno = MySerializer().serialize(
                        Ficha_fisica.objects.filter(aluno_id=pk).order_by('-created_at')[:1], fields=['percentual_gordura'])
    lista = []
    for item in dados_aluno:
        lista.append(item['fields'])

    for value in dados_ficha_aluno:
        lista[0]['percentual_gordura'] = value['fields']['percentual_gordura']
    
    sexo = lista[0].get('sexo')
    idade = lista[0].get('idade')
    medida_percentual_gordura = lista[0].get('percentual_gordura')
    classificacao = classifica_percentul_gordura(sexo, idade, medida_percentual_gordura)
    lista[0]['classificacao'] = classificacao
    
    return JsonResponse(lista, safe=False)