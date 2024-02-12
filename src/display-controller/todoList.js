export const todoListController = () => {
    const todoSection = document.createElement('section');
    todoSection.setAttribute('id', 'todo-list');
    const divHeader = `
        <div>
            <h2>Default</h2>
            <button>Create New Todo</button>
        </div>
    `
  
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

    todoSection.innerHTML += divHeader;
    todoSection.appendChild(todosDiv);
    
    return todoSection;
  }