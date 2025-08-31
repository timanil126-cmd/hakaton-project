import { Module } from "../core/module";
import { random } from "../utils";

export class ShapeModule extends Module {
	constructor() {
		super("shape", "Случайная фигура");
	}

	trigger() {
		this.createRandomSheape();
	}

	getRandomColor() {
		let letters = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	createRandomSheape() {
		const body = document.querySelector("body");
		body.style.position = "relative";

		const availHeight = window.innerHeight;
		const availWidth = window.innerWidth;
		const size = random(50, 200);
		const distanceRelativeToScreenHeight = random(0, availHeight - size);
		const distanceRelativeToScreenWidth = random(0, availWidth - size);

		const shape = document.createElement("div");
		const shapes = ["circle", "square", "triangle"];
		const randomShape = shapes[random(0, shapes.length - 1)];

		const isTriangle = randomShape === "triangle";

		shape.style.position = "absolute";
		shape.style.width = `${isTriangle ? 0 : size}px`;
		shape.style.height = `${isTriangle ? 0 : size}px`;
		shape.style.background = isTriangle
			? "transparent"
			: this.getRandomColor();
		shape.style.top = `${distanceRelativeToScreenHeight}px`;
		shape.style.left = `${distanceRelativeToScreenWidth}px`;
		shape.style.borderRadius = randomShape === "circle" ? "50%" : "0";
		shape.style.cursor = "pointer";
		shape.style.transition = "transform 0.3s ease";
		shape.style.borderLeft = isTriangle
			? `${size / 2}px solid transparent`
			: "";
		shape.style.borderRight = isTriangle
			? `${size / 2}px solid transparent`
			: "";
		shape.style.borderBottom = isTriangle
			? `${size}px solid ${this.getRandomColor()}`
			: "";

		shape.addEventListener("mouseover", () => {
			shape.style.transform = "scale(2)";
		});

		shape.addEventListener("mouseleave", () => {
			shape.style.transform = "scale(1)";
		});

		shape.addEventListener("click", () => {
			shape.remove();
		});

		body.append(shape);
	}
}
