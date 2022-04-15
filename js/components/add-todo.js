export default class AddTodo { 
	constructor() { 
		// add button 
		this.btn = document.getElementById('add');
		// todo details
		this.titleTodo = document.getElementById('title');
		this.descriptionTodo = document.getElementById('description');
	}

	onClick(callback) {
		this.btn.onclick = () => {
			if (this.titleTodo.value === '' || this.descriptionTodo.value === '') {
				// alert.classList.remove('d-none');
				// alert.innerText = 'Title and description are required';
				// return;
				console.log('incorrecto');
			} else {
				callback(this.titleTodo.value, this.descriptionTodo.value);
			}
		}
	}
}
