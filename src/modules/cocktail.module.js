import { Module } from "../core/module";

export class CocktailModule extends Module {
	constructor() {
		super('Cocktail', 'Случайный коктейль')
		this.apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
	}
	async trigger() {
		try {
			const data = await this.getRandomCocktail();
			if (!data || !data.drinks || data.drinks.length === 0) {
				alert("Не удалось получить коктейль");
				return;
			}
			const drink = data.drinks[0];
			if(drink) {
				this.renderCocktailModal(drink);
			}

		} catch (error) {
			
		}

	}

	async getRandomCocktail() {
		try {
			const res = await fetch(this.apiUrl);
			if(!res.ok) {
				throw new Error (`Ошибка при получении коктейля. Статус ${res.status}`);
			}
			const data = await res.json();
			console.log(data);
			return data;
		} catch (error) {
			console.error('Ошибка при получении коктейля:', error);
			return null
		}
	}

	collectIngredients(drink) {
		const ingredients = [];
		for (let i = 1; i <= 15; i++) {
			const ingr = drink[`strIngredient${i}`];
			const measure = drink[`strMeasure${i}`];
			if (ingr && ingr.trim()) {
				const line = measure && measure.trim() ? `${ingr} — ${measure.trim()}` : ingr;
				ingredients.push(line);
			}
		}
		return ingredients;
	}

	renderCocktailModal(drink) {
		const existing = document.querySelector(".cocktail-modal-overlay");
		if (existing) existing.remove();

		const overlay = document.createElement("div");
		overlay.className = "cocktail-modal-overlay";

		const modal = document.createElement("div");
		modal.className = "cocktail-modal";

		const closeBtn = document.createElement("button");
		closeBtn.className = 'cocktail-modal__close-btn';
		closeBtn.textContent = "Close ✕";

		closeBtn.addEventListener("click", () => overlay.remove());

		const title = document.createElement("h2");
		title.textContent = drink.strDrink || "Drink";

		const img = document.createElement("img");
		if (drink.strDrinkThumb) {
			img.className = 'cocktail-modal__img';
			img.src = drink.strDrinkThumb;
			img.alt = drink.strDrink;
		}

		const info = document.createElement("p");
		info.textContent = `${drink.strAlcoholic || ""} · ${drink.strCategory || ""}`;
		info.style.marginTop = "0.25rem";

		const instrTitle = document.createElement("h3");
		instrTitle.textContent = "Instructions";

		const instructions = document.createElement("p");
		instructions.textContent = drink.strInstructions || "—";

		const ingTitle = document.createElement("h3");
		ingTitle.textContent = "Ingredients";

		const ingList = document.createElement("ul");
		const ingredients = this.collectIngredients(drink);
		if (ingredients.length === 0) {
			const li = document.createElement("li");
			li.textContent = "—";
			ingList.appendChild(li);
		} else {
			ingredients.forEach((it) => {
				const li = document.createElement("li");
				li.textContent = it;
				ingList.appendChild(li);
			});
		}

		modal.appendChild(closeBtn);
		const contentWrapper = document.createElement("div");
		contentWrapper.style.display = "flex";
		contentWrapper.style.gap = "20px";
		contentWrapper.style.alignItems = "flex-start";

		const leftCol = document.createElement("div");
		leftCol.style.flex = "0 0 320px";
		if (img.src) leftCol.appendChild(img);

		const rightCol = document.createElement("div");
		rightCol.style.flex = "1";
		rightCol.appendChild(title);
		rightCol.appendChild(info);
		rightCol.appendChild(instrTitle);
		rightCol.appendChild(instructions);
		rightCol.appendChild(ingTitle);
		rightCol.appendChild(ingList);

		contentWrapper.appendChild(leftCol);
		contentWrapper.appendChild(rightCol);
		modal.appendChild(contentWrapper);
		overlay.appendChild(modal);

		overlay.addEventListener("click", (e) => {
			if (e.target === overlay) overlay.remove();
		});

		document.body.appendChild(overlay);
	}


}