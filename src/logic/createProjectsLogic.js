import { todoListController } from "../display-controller/todoList";
import { updateProjectsSection } from "../display-controller/todoProjects";

const projectsList = [];

function createNewTodo() {

}

// const { updateInputs } = todoListController();

function createNewProject(name) {
    const projectName = name;
    const todoProjectList = [];

    const editProject = (index, newName) => {
        projectsList[index].projectName = newName;
        updateProjectsSection();
    }
    const deleteProject = (index) => {
        projectsList.splice(index, 1);
        updateProjectsSection();
    }
    const createTodo = () =>  todoProjectList.push(createNewTodo());
    
    return { projectName, todoProjectList, deleteProject, createTodo, editProject };
}

function onCreateNewProject(name) {
    projectsList.push(createNewProject(name));
    updateProjectsSection();
}

export { projectsList, onCreateNewProject };