import {ViewModelBase} from "../../src/viewmodel-base.js";

export class FormViewModel extends ViewModelBase {
    constructor() {
        // call the constructor on the base class
        super();

        // initialize resources required
        this.inputSummary = document.querySelector("#inputSummary");
        this.changeHandler = this.valueChanged.bind(this);
        this.form = document.querySelector("form");
        this.form.addEventListener("change", this.changeHandler);
    }

    // clean up resources such as events, handlers and elements
    dispose() {
        // first call the dispose function on the base class
        super.dispose();

        // remove events
        this.form.removeEventListener("change", this.changeHandler);

        // set handlers to null
        this.changeHandler = null;

        // set cached elements to null
        this.form = null;
        this.inputSummary = null;
    }

    // put a change event on the form
    // the input has a data-attribute that defines the field we are using
    // this means that I can use one event instead of a event per input
    valueChanged(event) {
        this[event.target.dataset.field] = event.target.value;
        this.updateSummary();
    }

    // update the summary text only once all the fields are filled in
    updateSummary() {
        if (this.firstName == null || this.lastName == null || this.age == null) {
            this.inputSummary.textContent = "Please fill in all the fields"
        }
        else {
            this.inputSummary.textContent = `You are: ${this.firstName} ${this.lastName} and is ${this.age} years old`
            this.inputSummary.style.color = this.age >= 50 ? "red" : "black";
        }
    }
}

window.viewModel = new FormViewModel();