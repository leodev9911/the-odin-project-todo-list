import { 
    projectsList, 
    onCreateNewTodo,
    isForEdit,
} from "../logic/createProjectsLogic";

const main = document.querySelector('main');
const todoSection = document.createElement('section');
todoSection.setAttribute('id', 'todo-list');
main.appendChild(todoSection);
let projectsInputs = [];
let projectIndex;
let inputToEditindex;

function updateInputs() {
    projectsInputs = document.querySelectorAll('input[name="project"]');
    projectsInputs.forEach(input => input.addEventListener('change', () => {
        updateSelectedInput();
        updateTodosDiv();
    }));
}

const showCreateAndEditTodoInput = () => {
    const todoListSection = document.getElementById('todo-list');
    const projectInputsArray = Array.from(projectsInputs);
    const selectedInput = projectInputsArray.find(input => input.checked === true);
    const selectedProject = projectsList.find(project => project.projectName === selectedInput.value);

    const createTodoForm = document.createElement('form');
    const titleInputLabel = document.createElement('label');
    titleInputLabel.textContent = 'Title';
    titleInputLabel.setAttribute('for', 'todo-title');
    const titleinput = document.createElement('input');
    titleinput.setAttribute('id', 'todo-title');
    const descriptionInputLabel = document.createElement('label');
    descriptionInputLabel.textContent = 'Description';
    descriptionInputLabel.setAttribute('for', 'todo-description');
    const descriptioninput = document.createElement('textarea');
    descriptioninput.setAttribute('id', 'todo-description');
    const createOrEditNewTodoButton = document.createElement('button');
    createOrEditNewTodoButton.textContent = isForEdit ? 'Edit' : 'Create';
    createOrEditNewTodoButton.setAttribute('type', 'button');
    
    
    if (isForEdit) {
        createOrEditNewTodoButton.addEventListener('click', () => {
            console.log(titleinput.value);
            console.log(descriptioninput.value);
            projectsList[projectIndex].todoProjectList[inputToEditindex].onEdit(projectIndex, inputToEditindex, titleinput.value, descriptioninput.value);
            isForEdit = false;
            todoListSection.removeChild(createTodoForm);
        })
    } else {
        createOrEditNewTodoButton.addEventListener('click', () => {
            todoListSection.removeChild(createTodoForm);
            onCreateNewTodo(selectedProject, titleinput, descriptioninput);
        });
    }

    createTodoForm.appendChild(titleInputLabel);
    createTodoForm.appendChild(titleinput);
    createTodoForm.appendChild(descriptionInputLabel);
    createTodoForm.appendChild(descriptioninput);
    createTodoForm.appendChild(createOrEditNewTodoButton);
    todoListSection.appendChild(createTodoForm);
}

function updateSelectedInput() {
    main.removeChild(todoSection);
    todoSection.innerHTML = '';

    const projectInputsArray = Array.from(projectsInputs);
    const selectedInput = projectInputsArray.find(input => input.checked === true);

    if (selectedInput) {
        const divHeader = document.createElement('div');
        const h2Header = document.createElement('h2');
        h2Header.textContent = selectedInput.value;
        const buttonHeader = document.createElement('button');
        buttonHeader.textContent = 'Create New Todo';
        buttonHeader.addEventListener('click', () => showCreateAndEditTodoInput());
        divHeader.appendChild(h2Header);
        divHeader.appendChild(buttonHeader);
        todoSection.appendChild(divHeader);
    }

    main.appendChild(todoSection);
}

const todosDiv = document.createElement('div');
todosDiv.setAttribute('id', 'todos-div');

function updateTodosDiv() {
    const projectInputsArray = Array.from(projectsInputs);
    const selectedInput = projectInputsArray.find(input => input.checked === true);
    const selectedProject = projectsList.find(project => project.projectName === selectedInput.value);
    const selectedProjectIndex = projectsList.indexOf(selectedProject);

    todosDiv.innerHTML = '';

    selectedProject.todoProjectList.forEach((todo, index) => {
        if (todo.completed === true) {
            const completedH2 = document.createElement('h2');
            completedH2.textContent = 'Completed';
            todosDiv.appendChild(completedH2);
        }
        const todoCard = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.textContent = todo.todoTitle;
        const createdP = document.createElement('p'); 
        createdP.textContent = todo.timeOfCreation;
        const  descriptionP = document.createElement('p');
        descriptionP.textContent = todo.todoDescription;
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => todo.onComplete(index, selectedProjectIndex));
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            projectIndex = selectedProjectIndex;
            inputToEditindex = index;
            isForEdit = true;
            showCreateAndEditTodoInput();
        });
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => todo.onDelete(index, selectedProjectIndex));
        
        todosDiv.appendChild(todoCard);
        todoCard.appendChild(h3);
        todoCard.appendChild(createdP);
        todoCard.appendChild(descriptionP);
        todoCard.appendChild(completeButton);
        todoCard.appendChild(editButton);
        todoCard.appendChild(deleteButton);
    });

    todoSection.appendChild(todosDiv);
}

export { 
    todoSection, 
    updateInputs, 
    updateSelectedInput, 
    updateTodosDiv 
};
