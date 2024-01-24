import { Component } from "./base-component.js";
import { validate } from "../utils/validation.js";
import { projectState } from "../state/project-state.js";
import { autobind } from "../decorators/autobind.js";

// Project Input class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLTextAreaElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    )! as HTMLTextAreaElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;
    this.configure();
    this.renderContent();
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDesc = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable = {
      value: enteredTitle,
      isRequired: true,
      minLength: 3,
    };

    const descriptionValidatable = {
      value: enteredDesc,
      isRequired: true,
      minLength: 5,
    };

    const peopleValidatable = {
      value: +enteredPeople,
      isRequired: true,
      min: 1,
      max: 5,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid input, try again");
      return;
    } else {
      return [enteredTitle, enteredDesc, Number(enteredPeople)];
    }
  }
  @autobind
  private sumbitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }

  configure() {
    this.element.addEventListener("submit", this.sumbitHandler.bind(this));
  }

  renderContent(): void {}
}
