import AddTodo from "./components/add-todo.js";

export default class View {
	constructor() {
		this.model = null;

		// table
		this.table = document.getElementById('table');
		
		this.addTodoForm = new AddTodo();

		this.addTodoForm.onClick((title, description) => {
			this.addTodo(title, description);
		});
	}

	setModel(model) {
		this.model = model;
	}

	addTodo(title, description) {
		const todo = this.model.addTodo(title, description)
		this.addRow(todo);
	}

	removeTodo(id) {
		this.model.removeTodo(id);
		document.getElementById(id).remove();
	}

	toggleCompleted(id) {
		this.model.toggleCompleted(id);
	}

	addRow(todo) {
		// creating row
		const row = table.insertRow();
		row.setAttribute('id', todo.id);
		row.innerHTML = `
			<td>${todo.title}</td>
			<td>${todo.description}</td>
			<td class="text-center">
      </td>
			<td class="text-right">
        <button class="btn btn-primary mb-1">
        	<i class="fa fa-pencil"></i>
        </button>
      </td>
		`;
		
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.checked = todo.completed;
		checkbox.onclick = () => this.toggleCompleted(todo.id);
		// adding checkbox to row
		row.children[2].appendChild(checkbox);


		// creating remove button
		const removeBtn = document.createElement('button');
		removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
		removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
		removeBtn.onclick = () => this.removeTodo(todo.id);

		// adding remove button to row
		row.children[3].appendChild(removeBtn);

	}
}