//selector
const todoinput = document.querySelector(".todoinput");
const todobutton = document.querySelector(".todobutton");
const todolist = document.querySelector(".todolist");
const filteroption = document.querySelector('.todofilter');

//eventlistener
todobutton.addEventListener('click', addtodo);
todolist.addEventListener('click', deleteelement);
filteroption.addEventListener('click', filtertodo);
document.addEventListener('DOMContentLoaded',gettodos);

//functions
function addtodo(event) {
    event.preventDefault();
    //todo div
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");
    //the text
    const newtodo = document.createElement('li');
    newtodo.innerText = todoinput.value;
    // newtodo.style.color.black;
    newtodo.classList.add('todoitem');
    tododiv.appendChild(newtodo);
    //add the element
    savelocal(todoinput.value);
    //complete button
    const completebutton = document.createElement('button');
    completebutton.innerHTML = '<i class = " fas fa-check"></i>';
    completebutton.classList.add("completebutton");
    tododiv.appendChild(completebutton);
    //trash button
    const trashbutton = document.createElement('button');
    trashbutton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashbutton.classList.add("trashbutton");
    tododiv.appendChild(trashbutton);
    //add the div to every li element
    todolist.appendChild(tododiv);
    todoinput.value = "";


}
function deleteelement(e) {
    item = e.target;
    if (item.classList[0] === "trashbutton") {
        const deleteelement = item.parentElement;
        //animation
        deleteelement.classList.add('fall');
        removelocaltodo(deleteelement);
        deleteelement.addEventListener('transitionend', function () {

            deleteelement.remove();
        });
    }
    if (item.classList[0] === "completebutton") {
        const deleteelement = item.parentElement;
        deleteelement.classList.toggle('completed');
    }
}
function filtertodo(e){
    const filterelement = todolist.childNodes;
    filterelement.forEach(function (element) {
        switch (e.target.value) {
            case "all":
                {

                    element.style.display = 'flex';
                    break;
                }
            case "completed":
                {

                    if (element.classList.contains('completed')) {
                        element.style.display = 'flex';
                        
                    } else {
                        element.style.display = 'none';
                        
                    }
                    break;
                }
            case "uncompleted":
                {

                    if (!element.classList.contains('completed')) {
                        element.style.display = 'flex';
                        
                    } else {
                        element.style.display = 'none';
                        
                    }
                    break;
                }

        }
    });
}
function savelocal(todo){
    //to check if the element isalways present
    let todos;
    if(localStorage.getItem('todos')===null)
    {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));

    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}
function gettodos(){
    let todos
    if(localStorage.getItem('todos')===null)
    {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    
    }
    todos.forEach(function(todo){
        const tododiv = document.createElement("div");
        tododiv.classList.add("todo");
        //the text
        const newtodo = document.createElement('li');
        newtodo.innerText = todo;
        // newtodo.style.color.black;
        newtodo.classList.add('todoitem');
        tododiv.appendChild(newtodo);
        
        //complete button
        const completebutton = document.createElement('button');
        completebutton.innerHTML = '<i class = " fas fa-check"></i>';
        completebutton.classList.add("completebutton");
        tododiv.appendChild(completebutton);
        //trash button
        const trashbutton = document.createElement('button');
        trashbutton.innerHTML = '<i class = "fas fa-trash"></i>';
        trashbutton.classList.add("trashbutton");
        tododiv.appendChild(trashbutton);
        //add the div to every li element
        todolist.appendChild(tododiv);
    });
}
function removelocaltodo(todo)
{
    let todos
    if(localStorage.getItem('todos')===null)
    {
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    
    }
    console.log('hey');
    const todoindex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}