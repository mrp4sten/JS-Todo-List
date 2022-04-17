import AddTodo from "./components/add-todo.js";
import Modal from "./components/modal.js";
import Filters from './components/filters.js';

export default class View {
	constructor() {
		this.model = null;

		// table
		this.table = document.getElementById('table');
		
		this.addTodoForm = new AddTodo();

		this.addTodoForm.onClick((title, description) => this.addTodo(title, description));

		this.modal = new Modal();
		this.modal.onClick((id, values) => this.editTodo(id, values));

		this.filters = new Filters();
		this.filters.onClick((filters) => this.filter(filters));
	}

	setModel(model) {
		this.model = model;
	}


	filter(filters) {
		const {type, words} = filters;
		const [, ...rows] = this.table.getElementsByTagName('tr');
		for (const row of rows) {
			const [title, description, completed] = row.children;
			let shouldHide = false;

			if (words) {
				shouldHide = !title.innerText.includes(words) && !description.innerText.includes(words);
			}

			const shouldBeCompleted = type === 'completed';
			const isCompleted = completed.children[0].checked;

			if (type !== 'all' && shouldBeCompleted !== isCompleted) {
				shouldHide = true;
			}

			if (shouldHide) {
				row.classList.add('d-none');
			} else {
				row.classList.remove('d-none');
			}
		}
	}

	render() {
		const todos = this.model.getTodos();
		todos.forEach((todo) => this.addRow(todo));
	}

	addTodo(title, description) {
		const todo = this.model.addTodo(title, description)
		this.addRow(todo);
	}

	removeTodo(id) {
		this.model.removeTodo(id);
		document.getElementById(id).remove();
	}

	editTodo(id, values) {
		this.model.editTodo(id, values);
		const row = document.getElementById(id);
		row.children[0].innerHTML = values.title;
		row.children[1].innerHTML = values.description;
		row.children[2].children[0].checked = values.completed;
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
      </td>
		`;
		
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.checked = todo.completed;
		checkbox.onclick = () => this.toggleCompleted(todo.id);
		// adding checkbox to row
		row.children[2].appendChild(checkbox);

		// creating edit button
		const editBtn = document.createElement('button');
		editBtn.classList.add('btn', 'btn-primary', 'mb-1');
		editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
		editBtn.setAttribute('data-toggle', 'modal');
		editBtn.setAttribute('data-target', '#modal');
		editBtn.onclick = () => this.modal.setValues({
			id: todo.id,
			title: row.children[0].innerText,
			description: row.children[1].innerText,
			completed: row.children[2].children[0].checked,
		});
		// adding remove button to row
		row.children[3].appendChild(editBtn);

		// creating remove button
		const removeBtn = document.createElement('button');
		removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
		removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
		removeBtn.onclick = () => this.removeTodo(todo.id);
		// adding remove button to row
		row.children[3].appendChild(removeBtn);

	}
}
