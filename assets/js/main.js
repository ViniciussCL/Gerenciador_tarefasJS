const btnTarefa = document.querySelector('.btn-tarefa');
const inputTarefa = document.querySelector('.input-tarefa');
const tarefas = document.querySelector('.tarefas');

btnTarefa.addEventListener('click', function() {
  if (!inputTarefa.value) return;
  criaTarefa(inputTarefa.value);
});

inputTarefa.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
  }
});

function criaTarefa(texto) {
  const li = criaLi();
  li.innerText = texto;
  tarefas.appendChild(li);
  limpaInput();
  criaBotao(li);
  salvarTarefas();
}

function criaLi() {
  const li = document.createElement('li');
  return li;
}

function limpaInput() {
  inputTarefa.value = '';
  inputTarefa.focus();
}

function criaBotao (li) {
  li.innerText += '';
  const botao = document.createElement('button');
  botao.innerText = 'Apagar';
  li.appendChild(botao);
  botao.setAttribute('class', 'apagar');
  botao.setAttribute('title', 'Apagar tarefa');
}

document.addEventListener('click', function(e) {
  const el = e.target;
  if (el.classList.contains('apagar')){
    el.parentElement.remove();
    salvarTarefas();
  };
})

function salvarTarefas () {
  const liTarefas = tarefas.querySelectorAll('li');
  const listaDeTarefas = [];

  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace('Apagar', ' ').trim();
    listaDeTarefas.push(tarefaTexto);
  }

  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas () {
  const tarefas = localStorage.getItem('tarefas');
  const listaDeTarefas = JSON.parse(tarefas);

  for (let tarefa of listaDeTarefas) {
    criaTarefa(tarefa);
  }
}
adicionaTarefasSalvas();