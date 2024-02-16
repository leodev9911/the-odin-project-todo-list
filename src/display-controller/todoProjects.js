import { 
  projectsList, 
  onCreateNewProject, 
  inputToEdit,
  inputChecked
} from "../logic/createProjectsLogic";
import { 
  updateInputs, 
  updateSelectedInput 
} from "./todoList";

export const todoProjectsController = () => {
  const projectsSection = document.createElement('section');
  projectsSection.setAttribute('id', 'todo-projects');

  const divHeader = document.createElement('div');
  const divHeaderP = document.createElement('p');
  const createNewProjectButton = document.createElement('button');
  createNewProjectButton.textContent = 'Create New Project';
  createNewProjectButton.addEventListener('click', () => createNewProjectForm.style.display = 'block');
  divHeader.appendChild(divHeaderP);
  divHeader.appendChild(createNewProjectButton);

  const createNewProjectForm = document.createElement('form');
  createNewProjectForm.setAttribute('id', 'new-project-form');
  createNewProjectForm.style.display = 'none';
  const projectLabel = document.createElement('label');
  projectLabel.textContent = 'Project Name';
  projectLabel.setAttribute('for', 'new-project');
  const projectInput = document.createElement('input');
  projectInput.setAttribute('id', 'new-project');
  const newProjectSubmit = document.createElement('button');
  newProjectSubmit.setAttribute('type', 'button');
  newProjectSubmit.textContent = 'Create New Project';
  newProjectSubmit.addEventListener('click', () => {
    onCreateNewProject(projectInput.value);
    createNewProjectForm.style.display = 'none';
    updateInputs();
    projectInput.value = '';
  });

  createNewProjectForm.appendChild(projectLabel);
  createNewProjectForm.appendChild(projectInput);
  createNewProjectForm.appendChild(newProjectSubmit);

  const ulProjectsList = document.createElement('ul');
  ulProjectsList.setAttribute('id', 'project-list');

  projectsSection.appendChild(divHeader);
  projectsSection.appendChild(ulProjectsList);
  projectsSection.appendChild(createNewProjectForm);

  return { projectsSection };
}

export function updateProjectsSection() {
  const ulProjectsList = document.getElementById('project-list');
  if (projectsList.length === 0) {
    ulProjectsList.innerHTML = "<p>You don't have projects yet</p>"
  } else {
    ulProjectsList.innerHTML = '';
    projectsList.forEach((project, index) => {
      const { deleteProject, projectName, editProject } = project;
      const listItem = document.createElement('li');
      const labelInput = document.createElement('label');
      labelInput.setAttribute('for', `${projectName.toLowerCase().split(' ').join('-')}-project`);
      labelInput.textContent = projectName;

      const input = document.createElement('input');
      input.setAttribute('type', 'radio');
      input.setAttribute('id', `${projectName.toLowerCase().split(' ').join('-')}-project`);
      input.setAttribute('name', 'project');
      input.setAttribute('value', projectName);
      if (inputToEdit.checked && inputToEdit.projectName === projectName) input.setAttribute('checked', 'checked');
      if (inputChecked && projectName === inputChecked) input.setAttribute('checked', 'checked');

      //This should be rewrited to optimize it
      const editProjectForm = document.createElement('form');
      editProjectForm.setAttribute('id', 'edit-project-form');
      editProjectForm.style.display = 'none';
      const projectLabel = document.createElement('label');
      projectLabel.textContent = 'Project Name';
      projectLabel.setAttribute('for', 'edit-project');
      const projectInput = document.createElement('input');
      projectInput.setAttribute('id', 'edit-project');
      const editProjectSubmit = document.createElement('button');
      editProjectSubmit.setAttribute('type', 'button');
      editProjectSubmit.textContent = 'Edit Project';
      editProjectSubmit.addEventListener('click', () => {
          editProject(index, projectInput.value);
          editProjectForm.style.display = 'none';
          projectInput.value = '';
        }  
      );

      editProjectForm.appendChild(projectLabel);
      editProjectForm.appendChild(projectInput);
      editProjectForm.appendChild(editProjectSubmit);
      ulProjectsList.appendChild(editProjectForm);

      const editButton = document.createElement('button');
      const deleteButton = document.createElement('button');
      editButton.textContent = 'Edit';
      deleteButton.textContent = 'Delete';
      editButton.addEventListener('click', () => editProjectForm.style.display = 'block');
      deleteButton.addEventListener('click', () => {
        deleteProject(index);
        updateInputs();
        updateSelectedInput();
      });

      listItem.appendChild(labelInput);
      listItem.appendChild(input);
      listItem.appendChild(editButton);
      listItem.appendChild(deleteButton);
      ulProjectsList.appendChild(listItem);
    })
  }
}