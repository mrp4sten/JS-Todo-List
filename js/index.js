import Model from './model.js';
import View from './view.js'

window.onload = () => {
	const model = new Model();
	const view = new View();

	model.setView(view);
	view.setModel(model);
}
