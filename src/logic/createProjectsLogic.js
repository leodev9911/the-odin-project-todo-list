import { updateProjectsSection } from "../display-controller/todoProjects";
import { updateInputs, updateSelectedInput, updateTodosDiv, isForEdit } from "../display-controller/todoList";

const serialize = require('serialize-javascript');
let stringfiedProjects = [];
let parsedObjects = [];
let projectsList = [];
let inputToEdit = {};
let inputChecked;
const date = new Date();

function deserialize(serializedJavascript){
    return eval('(' + serializedJavascript + ')');
}

const receiveFromLocal = () => {
    const objFromLocalStorage = JSON.parse(localStorage.getItem('todos')) || [];
    objFromLocalStorage.forEach(project => parsedObjects.push(deserialize(project)));
    projectsList = [...parsedObjects];
}

const updateLocaStorage = () => {
    stringfiedProjects = [];
    projectsList.forEach(project => stringfiedProjects.push(serialize(project)));
    localStorage.setItem('todos', JSON.stringify(stringfiedProjects));
}

const onCreateNewTodo = (selectedProject, titleInput, descriptionInput) => {
    const fullYear = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    selectedProject.todoProjectList = [...selectedProject.todoProjectList, selectedProject.createTodo(titleInput.value, descriptionInput.value, fullYear, month, day)]
    updateTodosDiv();
    updateLocaStorage();
}

const checkIfInputChecked = () => {
    const projectsInputs = document.querySelectorAll('input[name="project"]');
    projectsInputs.forEach(input => {
       if (input.checked) {
        inputChecked = input.value;
       };
    });
}

const checkIfEditedInputIsChecked = (index, name) => {
    const projectsInputs = document.querySelectorAll('input[name="project"]');
    inputToEdit = {
        projectName: name,
        checked: projectsInputs[index].checked
    };
}

function createNewTodo({ 
    titleInputValue, 
    descriptionInputValue, 
    fullYear,
    month, 
    day 
}) {
    const todoTitle = titleInputValue;
    const todoDescription = descriptionInputValue;
    const timeOfCreation = `Created at ${fullYear}-${month}-${day}`;
    let completed = false;

    const onComplete = (index, projectIndex) => {
        projectsList[projectIndex].todoProjectList[index].completed === false
        ? projectsList[projectIndex].todoProjectList[index].completed = true 
        : projectsList[projectIndex].todoProjectList[index].completed = false;
        updateTodosDiv();
        updateLocaStorage();
    }

    const onEdit = (projectIndex ,index, titleinput, todoDescription) => {
        projectsList[projectIndex].todoProjectList[index].todoTitle = titleinput;
        projectsList[projectIndex].todoProjectList[index].todoDescription = todoDescription;
        updateTodosDiv();
        updateLocaStorage();
    }

    const onDelete = (index, projectIndex) => {
        projectsList[projectIndex].todoProjectList.splice(projectsList[projectIndex].todoProjectList[index], 1);
        updateTodosDiv();
        updateLocaStorage();
    }

    return { 
        todoTitle,
        todoDescription,
        completed,
        timeOfCreation,
        onComplete,
        onEdit,
        onDelete
     };
}

function createNewProject(name) {
    const projectName = name;
    let todoProjectList = [];

    const editProject = (index, newName) => {
        projectsList[index].projectName = newName;
        checkIfEditedInputIsChecked(index, newName);
        checkIfInputChecked();
        updateProjectsSection();
        updateInputs();
        updateSelectedInput();
        updateTodosDiv();
        updateLocaStorage();
        inputToEdit = {};
        inputChecked = null;
    }
    const deleteProject = (index) => {
        projectsList.splice(index, 1);
        checkIfInputChecked();
        updateProjectsSection();
        updateLocaStorage();
        inputChecked = null;
    }
    const createTodo = (titleInputValue, descriptionInputValue, fullYear, month, day) =>  {
        return createNewTodo({ titleInputValue, descriptionInputValue, fullYear, month, day });
    };
    
    return { 
        projectName, 
        todoProjectList, 
        deleteProject, 
        createTodo, 
        editProject 
    };
}

function onCreateNewProject(name) {
    projectsList.push(createNewProject(name));
    checkIfInputChecked();
    updateProjectsSection();
    updateLocaStorage();
    inputChecked = null;
}

export { 
    projectsList, 
    onCreateNewProject,
    onCreateNewTodo, 
    inputToEdit, 
    inputChecked,
    isForEdit,
    receiveFromLocal
};