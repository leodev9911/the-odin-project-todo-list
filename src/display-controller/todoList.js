import { projectsList } from "../logic/createProjectsLogic";

const main = document.querySelector('main');
const todoSection = document.createElement('section');
todoSection.setAttribute('id', 'todo-list');
main.appendChild(todoSection);
let projectsInputs = [];

function updateInputs() {
    projectsInputs = document.querySelectorAll('input[name="project"]');
    projectsInputs.forEach(input => input.addEventListener('change', () => {
        updateSelectedInput();
        updateTodosDiv();
    }));
}

function updateSelectedInput() {
    main.removeChild(todoSection);
    todoSection.innerHTML = '';
    const projectInputsArray = Array.from(projectsInputs);
    const selectedInput = projectInputsArray.find(input => input.checked === true);
    const selectedProject = projectsList.find(project => project.projectName === selectedInput.value);

    if (selectedInput) {
        const divHeader = document.createElement('div');
        const h2Header = document.createElement('h2');
        h2Header.textContent = selectedInput.value;
        const buttonHeader = document.createElement('button');
        buttonHeader.textContent = 'Create New Todo';
        buttonHeader.addEventListener('click', () => selectedProject.createTodo());
        divHeader.appendChild(h2Header);
        divHeader.appendChild(buttonHeader);
        todoSection.appendChild(divHeader);
    }

    main.appendChild(todoSection);
}

const todosDiv = document.createElement('div');

function updateTodosDiv() {
    const projectInputsArray = Array.from(projectsInputs);
    const selectedInput = projectInputsArray.find(input => input.checked === true);
    const selectedProject = projectsList.find(project => project.projectName === selectedInput.value);

    todosDiv.innerHTML = '';

    selectedProject.todoProjectList.forEach((todo, index) => {
        if (todo.completed === true) {
            const completedH2 = document.createElement('h2');
            completedH2.textContent = 'Completed';
            todosDiv.appendChild(completedH2);
        }
        const h3 = document.createElement('h3');
        h3.textContent = todo.todoTitle;
        const createdP = document.createElement('p'); 
        createdP.textContent = 'Created At: ';
        const  descriptionP = document.createElement('p');
        descriptionP.textContent = todo.todoDescription;
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => todo.onComplete(index, 0));
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => todo.onDelete(index, 0));
        
        todosDiv.appendChild(h3);
        todosDiv.appendChild(createdP);
        todosDiv.appendChild(descriptionP);
        todosDiv.appendChild(completeButton);
        todosDiv.appendChild(editButton);
        todosDiv.appendChild(deleteButton);
    });

    todoSection.appendChild(todosDiv);
}

export { 
    todoSection, 
    updateInputs, 
    updateSelectedInput, 
    updateTodosDiv 
};
