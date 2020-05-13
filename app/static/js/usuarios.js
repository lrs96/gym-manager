
function filterUser(e) {
    var texto = $(e).val();
    $("[data-id='listAlunosItem']").each(function () {
        var resultado = $(this).text().toUpperCase().indexOf(' ' + texto.toUpperCase());

        if (resultado < 0) {
            $(this).fadeOut();
        } else {
            $(this).fadeIn();
        }
        debugger;
    });
}

function deleteAvaliacao(e) {
    let action = $(e).find('#actionUser').val();
    Swal.fire({
        html: `<h3 class="mb-3 h4"> Tem certeza que deseja excluir?</h3>
                <p class="mb-0"> Você não poderá voltar atrás dessa alteração.</p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#f0b413',
        confirmButtonText: `Excluir`,
        cancelButtonText: 'Cancelar',
        showClass: {
            popup: 'animated fadeInDown faster'
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        },
    })
    .then((result) => {
        if (result.value) {
            $('#pkavaliacao').val(action);
            Swal.fire({
                icon: 'success',
                title: 'Avaliação Excluída com sucesso',
                showConfirmButton: false,
                timer: 1500
            })
            .then((result) => {
                 $('form').submit();
            });
        }
    });
}

function deleteUser(e) {
    let user = $(e).find('input').val();
    let action = $(e).find('#actionUser').val();
    Swal.fire({
        html: `<h3 class="mb-3 h4"> Tem certeza que deseja excluir o aluno ${user}?</h3>
                <p class="mb-0"> Você não poderá voltar atrás dessa alteração.</p>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#f0b413',
        confirmButtonText: `Excluir`,
        cancelButtonText: 'Cancelar',
        showClass: {
            popup: 'animated fadeInDown faster'
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        },
    })
    .then((result) => {
        if (result.value) {
            $('#pkAluno').val(action);
            Swal.fire({
                icon: 'success',
                title: 'Aluno excluído com sucesso',
                showConfirmButton: false,
                timer: 1500
            })
            .then((result) => {
                 $('form').submit();
            });
        }
    });
}


function criaModal(title, id_chart) {
    let titulo = title
    let chart = $(id_chart).val()
    let content_modal = $(`#${id_chart}`)
    let modal = $('.modal-lg-charts');
    modal.find('.title-modal-header').text(titulo);
    if($('.modal.body').hasClass('active')) {
        $('.modal.body').remove()
    }
    modal.find('.modal-body').html(content_modal);
    modal.find('.modal-body').addClass('active')
    modal.modal({backdrop: 'static', keyboard: false})
}

function criaChartsAgain(e) {
    let idModal = $('.modal canvas').attr('id')
    if(idModal == 'chartsMedidas') {
        let conteudo_dentro_do_modal = $('.modal canvas')
        $('#evolucaoMedidas').append(conteudo_dentro_do_modal)
    } else if (idModal == 'chartPercentualDeGordura') {
        let conteudo_dentro_do_modal = $('.modal canvas')
        $('#body-chart-gordura').append(conteudo_dentro_do_modal)
    } else {
        let conteudo_dentro_do_modal = $('.modal canvas')
        $('#body-chart-peso').append(conteudo_dentro_do_modal)
    }
}