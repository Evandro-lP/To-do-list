const button = document.querySelector('.button')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-task')

let minhaListaDeItem = []

function adicionarNovaTarefa() {
    if (input.value.trim() !== '') {
        minhaListaDeItem.push({
            tarefa: input.value,
            concluida: false
        });

        input.value = '';
        mostrarTarefa();
    }
}

function mostrarTarefa (){
    let novaLi =''

    minhaListaDeItem.forEach((item,index) => {
        novaLi = novaLi + `
         <li class="task ${item.concluida && "done"}">
          <img src="./img/concluido.png" alt="check-na-tarefa" onclick="concluirTarefa(${index})"/>
          <p>${item.tarefa}</p>
          <img src="./img/delete.png" alt="deletar-tarefa" onclick="deletarTarefa(${index})" />
        </li>  
        `
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('lista' ,JSON.stringify(minhaListaDeItem))
}

function concluirTarefa (index){
    minhaListaDeItem[index].concluida = !minhaListaDeItem[index].concluida

    mostrarTarefa ()
}


function deletarTarefa(index){
    minhaListaDeItem.splice(index, 1)

    mostrarTarefa ()
}

function recarregarTarefas(){
const tarefasDoLocalStorage = localStorage.getItem('lista')

if (tarefasDoLocalStorage){
    minhaListaDeItem = JSON.parse(tarefasDoLocalStorage)
}
mostrarTarefa ()

}

function handleKeyPress(e) {
    if (e.key === 'Enter') {
        adicionarNovaTarefa();
    }
}
recarregarTarefas()

button.addEventListener('click', adicionarNovaTarefa)
input.addEventListener('keypress', handleKeyPress)
        