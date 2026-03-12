class Despesa {
    constructor (ano,mes,dia,tipo,descricao,valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    validarDados(){
        for(let i in this)  {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false 
            }
        }
        return true
    }
}

class Bd {  
    constructor (){          
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id') //null
        return parseInt(proximoId) + 1
    }
    gravar (d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))  

        localStorage.setItem('id', id)
    }
}
let bd = new Bd()

function cadastrarDespesas () {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa (
        ano.value,
        mes.value,
        dia.value,
        tipo.value, 
        descricao.value,
        valor.value
    )
    if(despesa.validarDados()) {
        bd.gravar(despesa)
        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_descricao').innerHTML = 'O registro foi inserido com sucesso'
        document.getElementById('cor_titulo').className = 'modal-header text-success'
        document.getElementById('btn_modal').innerHTML = 'voltar'
        document.getElementById('btn_modal').className = 'btn btn-success'
        // dialog de suceso
        $('#registraDespesa').modal('show') //utilizando jquery aqui!  
    } else { //------------> erro!!
        document.getElementById('modal_titulo').innerHTML = 'Registro está invalido'
        document.getElementById('modal_descricao').innerHTML = 'Verifique se todos os campos foram preenchidos.'
        document.getElementById('cor_titulo').className = 'modal-header text-danger'
        document.getElementById('btn_modal').innerHTML = 'voltar e corrigir'
        document.getElementById('btn_modal').className = 'btn btn-danger'
        // dialog de erro
        $('#registraDespesa').modal('show') //utilizando jquery aqui!  
    }
}
