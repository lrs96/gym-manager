function inputBorderLogin(e) {
    let value = $(e).attr('id')
    if (value == 'username') {
        $('#user').css({
            'border-left': '3px solid #2e3192'
        })
    } else if (value == 'password') {
        $('#senha').css({
            'border-left': '3px solid #2e3192'
        })
    }
}

function resetUnputBorderLogin(e) {
        let value = $(e).attr('id')
    if (value == 'username') {
        $('#user').css({
            'border-left': '1px solid #dee2e6'
        })
    } else if (value == 'password') {
        $('#senha').css({
           'border-left': '1px solid #dee2e6'
        })
    }
}

function dropMenuMB(e) {
    $('#menuLat').addClass('drop');
}

function dropMenuOff(e) {
    $('#menuLat').removeClass('drop');
}


function calculaIdade(dataNasc){ 
    var dataAtual = new Date();
    var anoAtual = dataAtual.getFullYear();
    var anoNascParts = dataNasc.split('/');
    var diaNasc = anoNascParts[0];
    var mesNasc = anoNascParts[1];
    var anoNasc = anoNascParts[2];
    var idade = anoAtual - anoNasc;
    debugger;
    var mesAtual = dataAtual.getMonth() + 1; 
    //Se mes atual for menor que o nascimento, nao fez aniversario ainda;  
    if(mesAtual < mesNasc){
        idade--; 
    } else {
    //Se estiver no mes do nascimento, verificar o dia
        if(mesAtual == mesNasc){ 
            if(new Date().getDate() < diaNasc ){ 
        //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
                idade--; 
            }
        }
    }
    $('#id_idade').val(idade)
    return idade; 
   }