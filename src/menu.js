import { Menu } from "./core/menu";

export class ContextMenu extends Menu {
	constructor(selector) {
		super(selector);
		this.modules = [];
		this.secretModule = null;
		this.spacePressTime = 0;
		this.isSpacePressed = false;
	}

	open(x, y) {
		if (this.modules.length === 0 && !this.secretModule) return;

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

	addSecretModule(module) {
		this.secretModule = module;
		const li = document.createElement("li");
		li.className = "menu-item secret";
		li.dataset.type = module.type;
		li.textContent = module.text;
		this.el.appendChild(li);
	}

	init() {
		this.el.addEventListener("click", (event) => {
			if (event.target.classList.contains("menu-item")) {
				const type = event.target.dataset.type;
				const module =
					this.modules.find((m) => m.type === type) ||
					(this.secretModule && this.secretModule.type === type
						? this.secretModule
						: null);
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

		// Обработчик для пасхалки (удержание пробела)
		document.addEventListener("keydown", (e) => {
			if (e.code === "Space" && !this.isSpacePressed) {
				this.isSpacePressed = true;
				this.spacePressTime = Date.now();

				this.spaceInterval = setInterval(() => {
					if (
						Date.now() - this.spacePressTime >= 3000 &&
						!this.secretModule
					) {
						this.activateEasterEgg();
						clearInterval(this.spaceInterval);
					}
				}, 100);
			}
		});

		document.addEventListener("keyup", (e) => {
			if (e.code === "Space") {
				this.isSpacePressed = false;
				clearInterval(this.spaceInterval);
			}
		});
	}

	activateEasterEgg() {
		// Добавляем вибрацию для обратной связи
		if (navigator.vibrate) {
			navigator.vibrate([200, 100, 200]);
		}

		// Добавляем секретный модуль
		import("./modules/easterEgg.module.js").then((module) => {
			this.addSecretModule(new module.SecretGameModule());

			// Показываем подсказку
			this.showHint("🎉 Пасхалка активирована!");
		});
	}

	showHint(message) {
		const hint = document.createElement("div");
		hint.textContent = message;
		hint.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.9);
      color: #ff6b6b;
      padding: 20px 40px;
      border-radius: 10px;
      font-size: 1.5rem;
      font-weight: bold;
      z-index: 10000;
      border: 2px solid #ff6b6b;
    `;

		document.body.appendChild(hint);

		setTimeout(() => {
			hint.remove();
		}, 2000);
	}
}
