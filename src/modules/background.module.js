import { Module } from "../core/module";

export class BackgroundModule extends Module {
	constructor() {
		super("background", "Сменить фон");
	}

	trigger() {
		const randomColor = this.getRandomColor();
		document.body.style.backgroundColor = randomColor;

		// Показываем временное сообщение о смене фона
		this.showNotification(`Фон изменен на: ${randomColor}`);
	}

	getRandomColor() {
		const letters = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	showNotification(message) {
		const notification = document.createElement("div");
		notification.textContent = message;
		notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      z-index: 1000;
      font-family: 'Roboto', sans-serif;
    `;

		document.body.appendChild(notification);

		setTimeout(() => {
			notification.remove();
		}, 2000);
	}
}
