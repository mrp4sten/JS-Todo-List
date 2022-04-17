import Alert from './alert.js';

export default class AddTodo { 
	constructor() { 
		// add button 
		this.btn = document.getElementById('add');
		// todo details
		this.titleTodo = document.getElementById('title');
		this.descriptionTodo = document.getElementById('description');

		this.alert = new Alert('alert');
	}

	onClick(callback) {
		this.btn.onclick = () => {
			if (this.titleTodo.value === '' || this.descriptionTodo.value === '') {
				this.alert.showMessage('Title and description are required');
			} else {
				this.alert.hide();
				callback(this.titleTodo.value, this.descriptionTodo.value);
			}
		}
	}
}
