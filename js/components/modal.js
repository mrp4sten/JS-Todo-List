import Alert from "./alert.js";

export default class Modal {
	constructor() {
		this.todo = null;
		this.title = document.getElementById('modal-title');
		this.description = document.getElementById('modal-description');
		this.completed = document.getElementById('modal-completed');
		this.btn = document.getElementById('modal-btn');
		this.alert = new Alert('modal-alert');
	}

	setValues(todo) {
		this.todo = todo;
		this.title.value = todo.title; 
		this.description.value = todo.description; 
		this.completed.checked = todo.completed; 
	}

	onClick(callback) {
		this.btn.onclick = () => {
			if (this.title.value === '' || this.description.value === '') {
				this.alert.showMessage('Title and description are required');
				return;
			}

			$('#modal').modal('toggle');
			callback(this.todo.id, {
				title: this.title.value,
				description: this.description.value,
				completed: this.completed.checked
			});
		}
	}
}
