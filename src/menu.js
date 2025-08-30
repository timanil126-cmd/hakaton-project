import { Menu } from "./core/menu";

export class ContextMenu extends Menu {
	constructor(selector) {
		super(selector);
		this.modules = [];
	}

	open(x, y) {
		if (this.modules.length === 0) return;

		this.el.style.left = `${x}px`;
		this.el.style.top = `${y}px`;
		this.el.classList.add("open");
	}

	close() {
		this.el.classList.remove("open");
	}

	add(module) {
		this.modules.push(module);
		this.el.innerHTML += module.toHTML();
	}

	// Инициализация обработчиков событий
	init() {
		this.el.addEventListener("click", (event) => {
			if (event.target.classList.contains("menu-item")) {
				const type = event.target.dataset.type;
				const module = this.modules.find((m) => m.type === type);
				if (module) {
					module.trigger();
					this.close();
				}
			}
		});

		document.addEventListener("contextmenu", (event) => {
			event.preventDefault();
			this.open(event.clientX, event.clientY);
		});
	}
}
