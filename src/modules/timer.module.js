import { Module } from "../core/module";

export class TimerModule extends Module {
	constructor() {
		super("timer", "Таймер");
	}

	trigger() {
		// Запрашиваем время у пользователя
		const minutes = prompt("Введите время в минутах:");
		if (!minutes || isNaN(minutes) || minutes <= 0) return;

		const seconds = parseInt(minutes) * 60;
		this.createTimer(seconds);
	}

	createTimer(seconds) {
		// Создаем элемент таймера
		const timerElement = document.createElement("div");
		timerElement.className = "custom-timer";
		timerElement.innerHTML = `
      <div class="timer-display">${this.formatTime(seconds)}</div>
      <button class="timer-cancel">×</button>
    `;

		document.body.appendChild(timerElement);

		// Запускаем отсчет
		let remaining = seconds;
		const interval = setInterval(() => {
			remaining--;
			timerElement.querySelector(".timer-display").textContent =
				this.formatTime(remaining);

			if (remaining <= 0) {
				clearInterval(interval);
				this.showCompletionMessage(timerElement);
			}
		}, 1000);

		// Обработчик отмены
		timerElement
			.querySelector(".timer-cancel")
			.addEventListener("click", () => {
				clearInterval(interval);
				timerElement.remove();
			});
	}

	formatTime(seconds) {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs
			.toString()
			.padStart(2, "0")}`;
	}

	showCompletionMessage(timerElement) {
		timerElement.innerHTML = `
      <div style="color: #4CAF50; font-weight: bold;">
        Время вышло!
      </div>
    `;

		setTimeout(() => {
			timerElement.remove();
		}, 3000);
	}
}
