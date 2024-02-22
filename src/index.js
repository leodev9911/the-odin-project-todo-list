import { updateInputs } from "./display-controller/todoList";
import { todoProjectsController, updateProjectsSection } from "./display-controller/todoProjects";
import { receiveFromLocal } from "./logic/createProjectsLogic";

const main = document.querySelector('main');

const { projectsSection } = todoProjectsController();

main.appendChild(projectsSection);
// main.appendChild(todoSection);
receiveFromLocal();
updateProjectsSection();
updateInputs();

