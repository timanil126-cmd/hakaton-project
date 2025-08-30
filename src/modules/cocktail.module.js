import { Module } from "../core/module";

export class Cocktail extends Module {
	constructor() {
		super('Cocktail', 'Случайный коктейль')
		this.apiUrl = 'www.thecocktaildb.com/api/json/v1/1/random.php';
	}
	trigger() {
		
	}

}