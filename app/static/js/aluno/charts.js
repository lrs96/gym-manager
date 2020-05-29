// Criação dos charts de Relatório Físico

function cria_charts(dias_peso, medidas_peso, id, prexifo) {
    new Chart(document.getElementById(`${id}`), {
        type: 'line',
        data: {
        labels: dias_peso,
        datasets: [{ 
            data: medidas_peso,
            borderColor: "rgba(46, 49, 146, .6)",
            backgroundColor: 'rgba(46, 49, 146, .1)',
            pointBackgroundColor: 'rgba(240, 180, 19, 1)',
            pointBorderColor: 'rgba(240, 180, 19, 1)',
            },
        ]},
        options: {
            legend: {
                display: false
            },
            responsive: true,
                scaleStartValue: 0,
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: "rgba(65, 104, 136, 0.4)",
                            borderDash: [5, 5],
                        }
                    }],
                    yAxes: [{
                    gridLines: {
                        color: "rgba(65, 104, 136, 0.2)",
                        drawBorder: false,
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            return `${value}${prexifo}`;
                        },
                        fontColor: "rgba(65, 104, 136, 1)",
                        fontSize: "12", 
                        },
                    }]
                }
        }
    });
}


function chartMedidas(dias, medida_direita, medida_esquerda, id) {
    debugger;
    new Chart(document.getElementById(`${id}`), {
        type: 'bar',
        data: {
            labels: dias ,
            datasets: [
                {
                    label: "Direito",
                    backgroundColor: "#2e3192",
                    data: medida_direita
                }, 
                {
                    label: "Esquerdo",
                    backgroundColor: "#F0B413",
                    data: medida_esquerda
                }
            ]
        },
        options: {
            legend: {
                display: false
            },
            responsive: true,
                scaleStartValue: 0,
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: "rgba(65, 104, 136, 0.4)",
                            borderDash: [5, 5],
                        }
                    }],
                    yAxes: [{
                    gridLines: {
                        color: "rgba(65, 104, 136, 0.2)",
                        drawBorder: false,
                    },
                    ticks: {
                        callback: function(value, index, values) {
                            return `${value}cm`;
                        },
                        stepSize: 2,
                        fontColor: "rgba(65, 104, 136, 1)",
                        fontSize: "12", 
                        },
                    }]
                }
        }
    });
}


// Filtro de medidas do gráfico

function FiltrarMedidas(e) {
    let selector = document.getElementById('id_filtros');
    let value = selector[selector.selectedIndex].value;
    let id = $('#idAlunoFiltro').val();
    let qtd_de_avaliacoes = $('#id_quantidade_de_avaliacoes').val();
    if( value == 'medida_antebraco' || value == 'medida_triceps' || value == 'medida_biceps' || value == 'medida_panturrilha' || value == 'medida_coxa') {
        chartsMedidas(id, value, qtd_de_avaliacoes);
    } else if (value == 'medida_costas' || value == 'medida_abdomen' || value == 'medida_peito') {
        chartsMedidasUnica(id, value, qtd_de_avaliacoes);
    }
}




function chartsMedidas(pk, params, qtd_de_avaliacoes) {
    fetch(`/api/${pk}/${params}/?filter=${qtd_de_avaliacoes}`, {
        method: 'get',
        data: 'json',
        dataType: "json",
    })
    .then((response) => {
        response.json()
    .then((data) => {
        $('#chartsMedidas').remove()
        let novoChartsMedida = '<canvas id="chartsMedidas"></canvas>';
        let result = data;
        let medida_direita = []
        let medida_esquerda = []
        let dado = [];
        if(params == 'medida_coxa' || params == 'medida_panturrilha' ) {
            $.each(result, (i, chave, value) => {
                if(chave[`${params}_direita`]) {
                    medida_direita.push(`${chave[`${params}_direita`]}`);
                    medida_esquerda.push(`${chave[`${params}_esquerda`]}`);
                    dado.push(`${chave['created_at']}`);
                }
            });
        } else {
            $.each(result, (i, chave, value) => {
                if(chave[`${params}_direito`]) {   
                    medida_direita.push(`${chave[`${params}_direito`]}`);
                    medida_esquerda.push(`${chave[`${params}_esquerdo`]}`);
                    dado.push(`${chave['created_at']}`);
                }
            });
        }
        
        $('#evolucaoMedidas').append(novoChartsMedida);
        chartMedidas(dado, medida_direita, medida_esquerda, 'chartsMedidas');
    });
    })
    .catch(function(error) {
        console.log('Operação deu erro: ' + error.message);
    });
}

function chartsMedidasUnica(pk, params, qtd_de_avaliacoes) {
    fetch(`/api/${pk}/${params}/?filter=${qtd_de_avaliacoes}`, {
        method: 'get',
        data: 'json',
        dataType: "json",
    })
    .then((response) => {
        response.json()
    .then((data) => {   
        $('#chartsMedidas').remove()
        let novoChartsMedida = '<canvas id="chartsMedidas"></canvas>';
        let result = data;
        let resultado_medidas = []
        let dado = [];
        $.each(result, (i, chave, value) => {
            if(chave[`${params}`]) {
                resultado_medidas.push(`${chave[`${params}`]}`);
                dado.push(`${chave['created_at']}`);
            }
        });
        $('#evolucaoMedidas').append(novoChartsMedida);
        new Chart(document.getElementById("chartsMedidas"), {
            type: 'bar',
            data: {
                labels: dado,
                datasets: [
                    {
                        label: "Direito",
                        backgroundColor: "#F0B413",
                        data: resultado_medidas
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                },
                responsive: true,
                    scaleStartValue: 0,
                    scales: {
                        xAxes: [{
                            gridLines: {
                                color: "rgba(65, 104, 136, 0.4)",
                                borderDash: [5, 5],
                            }
                        }],
                        yAxes: [{
                        gridLines: {
                            color: "rgba(65, 104, 136, 0.2)",
                            drawBorder: false,
                        },
                        ticks: {
                            fontColor: "rgba(65, 104, 136, 1)",
                            fontSize: "12",
                            min: 10
                            },
                        }]
                    }
            }
        });
    });
    })
    .catch(function(error) {
        console.log('Operação deu erro: ' + error.message);
    });
}


function getEnquadramentoPercentualGordura() {
    let idAlunoFiltro = $('#idAlunoFiltro').val()
    fetch(`/api/porcentagem-de-gordura/${idAlunoFiltro}/`, {
        method: 'get',
        data: 'json',
        dataType: "json",
    })
    .then((response) => {
        response.json()
    .then((data) => {
        $.each(data, (i, chave) => {
            $('#classificacaoPercentualGordura').text(chave[`classificacao`]);
        });
    });
    })
    .catch(function(error) {
        console.log('Operação deu erro: ' + error.message);
    });
}