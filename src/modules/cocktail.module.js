import { Module } from "../core/module";

export class Cocktail extends Module {
	constructor() {
		super('Cocktail', 'Случайный коктейль')
		this.apiUrl = 'www.thecocktaildb.com/api/json/v1/1/random.php';
	}
	trigger() {

	}

	async getRandomCocktail() {
		try {
			const res = await fetch(apiUrl);
			if(!res.ok) {
				throw new Error (`Ошибка при получении коктейля. Статус ${res.status}`)
			}
			console.log(res)
			const data = await res.json();
			console.log(data)

		} catch (error) {
			console.error('Ошибка при получении коктейля:', error);
			return
		}
	}
}