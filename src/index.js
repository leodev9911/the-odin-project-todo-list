import { todoSection } from "./display-controller/todoList";
import { todoProjectsController, updateProjectsSection } from "./display-controller/todoProjects";

const main = document.querySelector('main');

const { projectsSection } = todoProjectsController();

main.appendChild(projectsSection);
// main.appendChild(todoSection);
updateProjectsSection();

