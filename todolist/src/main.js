import './style.css'
const getTextField = document.querySelector('.taskField');
const btnAddNewTask = document.querySelector('.btnAddNewTask');
const btnRemoveChecked = document.querySelector('.btnRemoveChecked');
const divTasks = document.querySelector('.tasks');
const counterSpan = document.querySelector('.counter');
counterSpan.innerHTML = `0 of 5 tasks done`;

let counter = 0;

getTextField.focus();

function saveTasksToLocalStorage() {
  const tasks = [];
  const allSpans = document.querySelectorAll('.span-task');

  allSpans.forEach((span) => {
    const checkbox = span.querySelector('input[type="checkbox"]');
    const text = span.querySelector('p').innerText;
    tasks.push({ text, checked: checkbox.checked });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasksFromLocalStorage() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  counter = 0;
  divTasks.innerHTML = '';

  savedTasks.forEach(task => {
    if (counter < 8) {
      const p = document.createElement('p');
      p.innerHTML = task.text;
      if (task.checked) {
        p.style.textDecoration = 'line-through';
      }

      const span = document.createElement('span');
      span.classList.add('span-task');

      const check = checkbox(p);
      check.checked = task.checked;

      span.appendChild(check);
      span.appendChild(p);
      span.appendChild(btnRemoveTask(span));
      divTasks.appendChild(span);
      counter++;
    }
  });

  counterSpan.innerHTML = `${counter} of 5 tasks done`;
}
///////// Made by AI ABOVE ///////////
function removeAll(){
  const getAllCheckbox = document.querySelectorAll('.check');
  
  getAllCheckbox.forEach((checkbox) => {
    if (checkbox.checked) {
      const span = checkbox.parentElement;
      span.remove();
      saveTasksToLocalStorage();
      counter--;
      counterSpan.innerHTML = `${counter} of 5 tasks done`;
      console.log(counter);
    }
  });

}
function checkbox(p){

  const checkbox = document.createElement('input');
  checkbox.classList.add('check');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('click', () => {
    if(checkbox.checked) {
      p.style.textDecoration = 'line-through';}
   else{
    p.style.textDecoration = 'none';}
  })
  return checkbox;
}

function btnRemoveTask(span){
  const btnRemove = document.createElement('button');
  btnRemove.innerHTML = `<span'>&#10060;</span>`;
  btnRemove.addEventListener('click', () => {
    counter--;
    counterSpan.innerHTML = `${counter} of 5 tasks done`;
    console.log(counter);
    span.remove();
    saveTasksToLocalStorage();
  });

  return btnRemove;
}
function createTask(){
  getTextField.focus();
  
  if(getTextField.value.length === 0 || getTextField.value.length > 28){
    alert('Please, write something or has many characters');
  }else{

    if(counter < 5){
      counter++;
      counterSpan.innerHTML = `${counter} of 5 tasks done`;
      const p = document.createElement('p');
      p.innerHTML = getTextField.value;
  
      const span = document.createElement('span');
      span.classList.add('span-task');
      
        span.appendChild(checkbox(p));
        span.appendChild(p);
        span.appendChild(btnRemoveTask(span));
        getTextField.value = '';
        console.log(counter);
        divTasks.appendChild(span);
        saveTasksToLocalStorage();
    }else{
      alert('Please, remove one task.');
    }

  }
}
function main(){
  
  loadTasksFromLocalStorage();

  btnAddNewTask.addEventListener('click', () => {
    createTask();
    })

  document.addEventListener('keypress', (e) => {
    if(e.key === 'Enter')  createTask();
  })

  btnRemoveChecked.addEventListener('click', () => {
   removeAll();
  })
}
main();