let inputBox = document.querySelector('.inputField input');
let addBtn = document.querySelector(".inputField button");
let todolist = document.querySelector(".todolist ul");
let deleteAll = document.querySelector(".footer button");

console.log(inputBox);


inputBox.addEventListener('keyup', function() {

    let userdata = inputBox.value;
    if (userdata.trim() != 0) {
        addBtn.classList.add("active");
    } else { addBtn.classList.remove("active"); }
})

addBtn.onclick = () => {
    let userdata = inputBox.value;
    let localdata = localStorage.getItem("new todo");
    if (localdata == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(localdata);
    }
    listArray.push(userdata);
    localStorage.setItem("new todo", JSON.stringify(listArray));



    showTask();
    addBtn.classList.remove("active");
}

function showTask() {
    let localdata = localStorage.getItem("new todo");
    if (localdata == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(localdata);
    }
    let pendingNum = document.querySelector(".pendingTasks");
    pendingNum.textContent = listArray.length;
    if (listArray.length > 0) {
        deleteAll.classList.add("active");
    } else { deleteAll.classList.remove("active"); }

    let NewTodo = '';
    listArray.forEach((element, index) => {
        NewTodo += `<li>${element} <span onclick="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;
    });

    console.log(NewTodo);
    todolist.innerHTML = NewTodo;
    inputBox.value = "";
}

function deleteTask(index) {
    let localdata = localStorage.getItem("new todo");
    listArray = JSON.parse(localdata);
    listArray.splice(index, 1);
    localStorage.setItem("new todo", JSON.stringify(listArray));
    showTask();


}

deleteAll.onclick = () => {
    listArray = [];
    localStorage.setItem("new todo", JSON.stringify(listArray));
    showTask();
}