import { todoListController } from "./display-controller/todoList";
import { todoProjectsController, updateProjectsSection } from "./display-controller/todoProjects";

const main = document.querySelector('main');

const { projectsSection } = todoProjectsController();
const { todoSection } = todoListController();

main.appendChild(projectsSection);
main.appendChild(todoSection);
updateProjectsSection();

