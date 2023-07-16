let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let msg = document.getElementById("msg");
let dateInput = document.getElementById("dateInput");
let textArea = document.getElementById("textArea");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");



form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation(); //everytime we submit our form its gonna trigger our function
})

let formValidation = () => {
    if (textInput.value === "") {
        console.log('failure')
        msg.innerHTML = "Task cannot be blank";

    }
    else {
        console.log('success')
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal"); //data-bs-dismiss== attribute modal == value
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", ""); //data-bs-dismiss== attribute modal == value

        })()

    }
}

let data = [];

//storing and accepting data 
let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        discription: textArea.value,
    });
    localStorage.setItem("data", JSON.stringify(data)); //store data "data"- key data-value 
    //localStorage.getItem//retrieve data 
    console.log(data);
    createTasks();
};

let createTasks = () => {
    tasks.innerHTML ="";
    data.map((x,y)=>{
        return (tasks.innerHTML += `
        <div id=${y}>
                    <span class="fw-bold">${x.text}</span>
                    <span class="small text-secondary">${x.date}</span>
                    <p>${x.discription}</p>
                    <span class="options">
                        <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                        <i onClick="deleteTask(this) ;createTasks()" class="fas fa-trash-alt"></i>
                    </span>
                </div>
                `);
        resetForm();
    })  //x traget all obj one by one , y is serial no 0,1,2,3,4,5 count index no .
    
}

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id , 1)
    localStorage.setItem("data", JSON.stringify(data)); //store data "data"- key data-value 
    console.log(data);
};

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML
    dateInput.value = selectedTask.children[1].innerHTML
    textArea.value = selectedTask.children[2].innerHTML
    deleteTask(e)
};


let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textArea.value = "";
}; 

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks ();
    console.log(data);
})();
