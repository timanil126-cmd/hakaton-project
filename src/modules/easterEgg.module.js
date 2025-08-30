import { Module } from "../core/module";

export class SecretGameModule extends Module {
	constructor() {
		super("secret-game", "🎮 Скрытая Игра");
		this.highscore = localStorage.getItem("duckHighscore") || 0;
		this.modal = null;
	}

	trigger() {
		this.renderGameModal();
		this.startGame();
	}

	renderGameModal() {
		// Создаем модальное окно
		this.modal = document.createElement("div");
		this.modal.className = "game-modal";
		this.modal.id = "gameModal";

		this.modal.insertAdjacentHTML(
			"afterbegin",
			`
            <div class="game-container">
                <div class="game-header">
                <h2>🦆 Утиная Охота: Режим Ниндзя</h2>
                <div class="game-timer">Время: <span id="gameTime">10</span>s</div>
                </div>
                
                <div class="game-field" id="gameField">
                <!-- Утки будут генерироваться здесь -->
                </div>
                
                <div class="game-stats">
                <div class="score">Попадания: <span id="gameScore">0</span></div>
                <div class="highscore">Рекорд: <span id="gameHighscore">${this.highscore}</span></div>
                </div>
                
                <button class="game-close" id="gameClose">×</button>
            </div>
            `
		);

		document.body.appendChild(this.modal);
	}

	startGame() {
		const gameField = this.modal.querySelector("#gameField");
		const timerElement = this.modal.querySelector("#gameTime");
		const scoreElement = this.modal.querySelector("#gameScore");
		const highscoreElement = this.modal.querySelector("#gameHighscore");
		const closeButton = this.modal.querySelector("#gameClose");

		// Сброс игры
		gameField.innerHTML = "";
		let score = 0;
		let timeLeft = 10;
		let gameInterval;
		let ducks = [];

		// Показываем модальное окно
		this.modal.classList.add("active");

		// Функция создания утки с анимацией движения
		const createDuck = () => {
			const duck = document.createElement("div");
			duck.className = "game-duck";
			duck.innerHTML =
				'<img src="https://static.wixstatic.com/media/cf995d_23888b27b9e44aee855c130742fecd26~mv2.gif" style="width:100%;height:100%;">';

			// Случайная начальная позиция
			const maxX = gameField.offsetWidth - 60;
			const maxY = gameField.offsetHeight - 60;
			const startX = Math.random() * maxX;
			const startY = Math.random() * maxY;

			duck.style.left = `${startX}px`;
			duck.style.top = `${startY}px`;

			// Случайное направление и скорость
			const speedX = (Math.random() - 0.5) * 40;
			const speedY = (Math.random() - 0.5) * 40;

			// Обработчик клика
			duck.addEventListener("click", () => {
				score++;
				scoreElement.textContent = score;

				// Анимация попадания
				duck.style.transition =
					"transform 0.2s ease, opacity 0.2s ease";
				duck.style.transform = "scale(1.5)";
				duck.style.opacity = "0";

				setTimeout(() => {
					duck.remove();
					ducks = ducks.filter((d) => d !== duck);
					createDuck(); // Создаем новую утку
				}, 200);
			});

			gameField.appendChild(duck);
			ducks.push({ element: duck, speedX, speedY });

			return duck;
		};

		// Функция обновления позиций уток
		const updateDucks = () => {
			ducks.forEach((duckData) => {
				const duck = duckData.element;
				let x = parseFloat(duck.style.left) || 0;
				let y = parseFloat(duck.style.top) || 0;

				// Обновляем позицию
				x += duckData.speedX;
				y += duckData.speedY;

				// Проверяем границы и меняем направление
				if (x <= 0 || x >= gameField.offsetWidth - 60) {
					duckData.speedX *= -1;
					x = Math.max(0, Math.min(x, gameField.offsetWidth - 60));
				}

				if (y <= 0 || y >= gameField.offsetHeight - 60) {
					duckData.speedY *= -1;
					y = Math.max(0, Math.min(y, gameField.offsetHeight - 60));
				}

				duck.style.left = `${x}px`;
				duck.style.top = `${y}px`;
			});
		};

		// Запуск игры
		const startGameLoop = () => {
			// Создаем несколько уток сразу
			for (let i = 0; i < 3; i++) {
				createDuck();
			}

			// Интервал для движения уток
			const movementInterval = setInterval(updateDucks, 50);

			gameInterval = setInterval(() => {
				timeLeft--;
				timerElement.textContent = timeLeft;

				if (timeLeft <= 0) {
					clearInterval(movementInterval);
					endGame();
				}
			}, 1000);
		};

		// Завершение игры
		const endGame = () => {
			clearInterval(gameInterval);

			if (score > this.highscore) {
				this.highscore = score;
				localStorage.setItem("duckHighscore", this.highscore);
				highscoreElement.textContent = this.highscore;
			}

			// Показываем результат
			timerElement.textContent = "Игра окончена!";
			timerElement.style.color = "#ff6b6b";

			setTimeout(() => {
				this.modal.classList.remove("active");
				setTimeout(() => {
					this.modal.remove();
				}, 500);
			}, 3000);
		};

		// Закрытие по кнопке
		closeButton.addEventListener("click", () => {
			clearInterval(gameInterval);
			this.modal.classList.remove("active");
			setTimeout(() => {
				this.modal.remove();
			}, 500);
		});

		// Закрытие по Escape
		const closeOnEscape = (e) => {
			if (e.key === "Escape") {
				clearInterval(gameInterval);
				this.modal.classList.remove("active");
				setTimeout(() => {
					this.modal.remove();
				}, 500);
				document.removeEventListener("keydown", closeOnEscape);
			}
		};

		document.addEventListener("keydown", closeOnEscape);

		// Запускаем игру
		startGameLoop();
	}
}
