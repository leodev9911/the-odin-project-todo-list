import { updateProjectsSection } from "../display-controller/todoProjects";
import { updateInputs, updateSelectedInput, updateTodosDiv } from "../display-controller/todoList";

const projectsList = [];
let inputToEdit = {};
let inputChecked;

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

function createNewTodo(title, description) {
    const todoTitle = title;
    const todoDescription = description;
    let completed = false;

    const onComplete = (index, projectIndex) => {
        projectsList[projectIndex].todoProjectList[index].completed === false
        ? projectsList[projectIndex].todoProjectList[index].completed = true 
        : projectsList[projectIndex].todoProjectList[index].completed = false;
        updateTodosDiv();
    }

    const onEdit = () => {}

    const onDelete = (index, projectIndex) => {
        projectsList[projectIndex].todoProjectList.splice(projectsList[projectIndex].todoProjectList[index], 1);
        updateTodosDiv();
    }

    return { 
        todoTitle,
        todoDescription,
        completed,
        onComplete,
        onEdit,
        onDelete
     };
}

function createNewProject(name) {
    const projectName = name;
    const todoProjectList = [];

    const editProject = (index, newName) => {
        projectsList[index].projectName = newName;
        checkIfEditedInputIsChecked(index, newName);
        checkIfInputChecked();
        updateProjectsSection();
        updateInputs();
        updateSelectedInput();
        updateTodosDiv();
        inputToEdit = {};
        inputChecked = null;
    }
    const deleteProject = (index) => {
        projectsList.splice(index, 1);
        checkIfInputChecked();
        updateProjectsSection();
        inputChecked = null;
    }
    const createTodo = () =>  {
        todoProjectList.push(createNewTodo('Hola', 'Esto es una prueba'));
        updateTodosDiv();
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
    inputChecked = null;
}

export { 
    projectsList, 
    onCreateNewProject, 
    inputToEdit, 
    inputChecked 
};