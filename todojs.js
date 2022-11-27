
//localStorage.clear();

const todoInput = document.querySelector(".todo-input");
const todoBtn= document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
//ecouteurs
document.addEventListener("DOMContentloaded", getTodos);
todoBtn.addEventListener("click" , addTodo);
todoList.addEventListener("click" , deleteCheck);
filterOption.addEventListener("input" , filterTodo);

//functions

function addTodo(event){
    event.preventDefault(); 
    //creer une nouvelle div
    const todoDiv = document.createElement("div"); //creer une div dans le html
    todoDiv.classList.add("todo"); //ajouter un nom de class a la div creer 
    //creer les li qui vont etre ratacher a cette nouvelle div
    const newTodoli = document.createElement("li");
    newTodoli.innerText = todoInput.value; //ajouter la chaine de caractere entrée par l'utilisateur dans le li
    newTodoli.classList.add("todo-item");
    todoDiv.appendChild(newTodoli); //ajouter le li a la div
     
    //ajouter la todo Local storage
     saveLocalTodos(todoInput.value);
    
     //creation d'un button check
    const checkBtn = document.createElement("button"); //creer le bouton check
    checkBtn.innerHTML = '<span class="material-symbols-outlined">check_circle </span> '  //inserer l icon check au button
    checkBtn.classList.add("check-btn");
    todoDiv.appendChild(checkBtn);
    
    //creation d'un button supprimer
     const trashBtn = document.createElement("button"); //creer le bouton check
     trashBtn.innerHTML = '<span class="material-symbols-outlined"> delete</span> '  //inserer l'icon trash au button
     trashBtn.classList.add("trash-btn");
     todoDiv.appendChild(trashBtn);
   
   
     //ajouter notre todo a Todo-list
   todoList.appendChild(todoDiv);
   todoInput.value = ""; //pour réinitialiser la todoInput a chaque fois

}

function deleteCheck(e){
    const item = e.target;

    if(item.classList[0] === "trash-btn"){
      const todo = item.parentElement; 
      todo.classList.add("fall"); //ajouter une animation a la suppression
       todo.addEventListener(transitionened , function(){ //il attends l animation de s'effectuer avant de supprimer
        todo.remove();
       });
       
    }
   
    if(item.classList[0] === "check-btn"){
        const todo = item.parentElement; 
          todo.classList.toggle("check");
      }
}

//fonction filter
function filterTodo(e){
  const todos = todoList.childNodes;
  todos.forEach( 
    function(todo){
      switch(e.target.value){
        case "all":
             todo.style.display = "flex";//l'afficher
             break;
        case "completed": 
         if(todo.classList.contains("check")){
          todo.style.display = "flex";
        }else{
          todo.style.display = "none";
        }
        break;

        case "uncompleted":
          if(!todo.classList.contains("check")){
            todo.style.display = "flex";
          } else{
            todo.style.display = "none";
          }
          break;
      }
  }
  );
}

//sauvegarder les liste 
function saveLocalTodos(todo){
 //checker si il ya des items existantes
 let todos;
 if(localStorage.getItem("todos") === null){
  todos = [];
 }
 else{
  todos = JSON.parse(localStorage.getItem("todos"));//recupere les todo liste
 }
 todos.push(todo);
 localStorage.setItem("todo",JSON.stringify(todos));//afficher le contenue du tableau
}


function getTodos(){
  //checker si il ya des items existantes
  let todos;
  if(localStorage.getItem("todos") === null){
   todos = [];
  }
  else{
   todos = JSON.parse(localStorage.getItem("todos"));//recupere les todo liste
  }
  todos.forEach(function(todo){ 
  //creer une nouvelle div
  const todoDiv = document.createElement("div"); //creer une div dans le html
  todoDiv.classList.add("todo"); //ajouter un nom de class a la div creer 
  //creer les li qui vont etre ratacher a cette nouvelle div
  const newTodoli = document.createElement("li");
  newTodoli.innerText = todo; //ajouter la chaine de caractere entrée par l'utilisateur dans le li
  newTodoli.classList.add("todo-item");
  todoDiv.appendChild(newTodoli); //ajouter le li a la div
   
   //creation d'un button check
  const checkBtn = document.createElement("button"); //creer le bouton check
  checkBtn.innerHTML = '<span class="material-symbols-outlined">check_circle </span> '  //inserer l icon check au button
  checkBtn.classList.add("check-btn");
  todoDiv.appendChild(checkBtn);
  
  //creation d'un button supprimer
   const trashBtn = document.createElement("button"); //creer le bouton check
   trashBtn.innerHTML = '<span class="material-symbols-outlined"> delete</span> '  //inserer l'icon trash au button
   trashBtn.classList.add("trash-btn");
   todoDiv.appendChild(trashBtn);
 
 
   //ajouter notre todo a Todo-list
  todoList.appendChild(todoDiv);
 
 });
 }

 