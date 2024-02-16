import { updateProjectsSection } from "../display-controller/todoProjects";
import { updateInputs, updateSelectedInput } from "../display-controller/todoList";

const projectsList = [];
let inputToEdit = {};
let inputChecked;

const checkIfInputChecked = () => {
    const projectsInputs = document.querySelectorAll('input[name="project"]');
    console.log(projectsInputs);
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

function createNewTodo() {

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
        inputToEdit = {};
        inputChecked = null;
    }
    const deleteProject = (index) => {
        projectsList.splice(index, 1);
        checkIfInputChecked();
        updateProjectsSection();
        inputChecked = null;
    }
    const createTodo = () =>  todoProjectList.push(createNewTodo());
    
    return { projectName, todoProjectList, deleteProject, createTodo, editProject };
}

function onCreateNewProject(name) {
    projectsList.push(createNewProject(name));
    checkIfInputChecked();
    updateProjectsSection();
    inputChecked = null;
}

export { projectsList, onCreateNewProject, inputToEdit, inputChecked };