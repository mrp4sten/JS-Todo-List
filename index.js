window.onload = () => {
	// todo details
	const titleTodo = document.getElementById('title');
	const descriptionTodo = document.getElementById('description');

	// alert validation
	const alert = document.getElementById('alert'); 

	// table
	const table = document.getElementById('table');
	let idRow = 0;

	const addBtn = document.getElementById('add');

	// Function that remove todo to table
	function removeTodo(id) {
		document.getElementById(id).remove();
	}

	// Function that add todo to table
	function addTodo() {
		if(titleTodo.value === '' || descriptionTodo.value === '') {
			alert.classList.remove('d-none');
			alert.innerText = 'Title and description are required';
			return;
		}

		alert.classList.add('d-none');

		// creating row
		const row = table.insertRow();
		row.setAttribute('id', idRow++);
		row.innerHTML = `
			<td>${titleTodo.value}</td>
			<td>${descriptionTodo.value}</td>
			<td class="text-center">
        <input type="checkbox">
      </td>
			<td class="text-right">
        <button class="btn btn-primary mb-1">
        	<i class="fa fa-pencil"></i>
        </button>
      </td>
		`;

		// creating remove button
		const removeBtn = document.createElement('button');
		removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
		removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
		removeBtn.onclick = () => {
			removeTodo(row.getAttribute('id'));
		};

		// adding remove button to row
		row.children[3].appendChild(removeBtn);
	}

	addBtn.onclick = addTodo;
}
