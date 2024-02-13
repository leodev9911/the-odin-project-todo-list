import { projectsList } from "../logic/createProjectsLogic";

export const todoListController = () => {
    const todoSection = document.createElement('section');
    const main = document.querySelector('main');
    let projectsInputs = [];

   function updateInputs() {
       projectsInputs = document.querySelectorAll('input[name="project"]');
       projectsInputs.forEach(input => input.addEventListener('change', updateSelectedInput));
    }
    
    function updateSelectedInput() {
        todoSection.innerHTML = '';
        projectsInputs.forEach(input => {
            if (input.checked) {
                todoSection.setAttribute('id', 'todo-list');
                const divHeader = document.createElement('div');
                const h2Header = document.createElement('h2');
                h2Header.textContent = input.value;
                const buttonHeader = document.createElement('button');
                buttonHeader.textContent = 'Create New Todo';
                divHeader.appendChild(h2Header);
                divHeader.appendChild(buttonHeader);
                todoSection.appendChild(divHeader);
            }
        });
        main.appendChild(todoSection);
    }
  
    const todosDiv = document.createElement('div');

    todosDiv.innerHTML = `
        <div>
            <h3>Title</h3>
            <p>Created At: </p>
            <p>This is the description</p>
            <button>Complete</button>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    `

    // todoSection.appendChild(todosDiv);
    
    return { todoSection, updateInputs, updateSelectedInput };
  }