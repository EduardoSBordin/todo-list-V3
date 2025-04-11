import './style.css'

const btnAddNewTask = document.querySelector('.btnAddNewTask');
const taskField = document.querySelector('.taskField');
const tasks = document.querySelector('.tasks');

function addTask(){

  if(taskField.value.length === 0){
    alert('Please, enter with one task.')
  }else{


  const span = document.createElement('span');
  span.classList.add('span-task');

const btnRemoveTask = document.createElement('button');
btnRemoveTask.innerHTML = 'X';
btnRemoveTask.addEventListener('click', () => {
  span.remove();
});

const fieldTask = document.createElement('p');
fieldTask.innerHTML = taskField.value;

const checkbox = document.createElement('input');
checkbox.type ='checkbox';
checkbox.addEventListener('click', () => {

  if(checkbox.checked){
    fieldTask.style.textDecoration = "line-through";
  }else{
    fieldTask.style.textDecoration = "none";
  }
})

span.appendChild(checkbox);
span.appendChild(fieldTask);
span.appendChild(btnRemoveTask);
tasks.appendChild(span);

taskField.value = '';
taskField.focus();
}
}

function main(){

  btnAddNewTask.addEventListener('click', () => {

    addTask();
    
  });
  document.addEventListener('keypress', e => {
    if(e.key === 'Enter') addTask();
  })
}

main();
