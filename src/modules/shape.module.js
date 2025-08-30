import { Module } from "../core/module";
import { random } from "../utils";

export class ShapeModule extends Module {
	constructor() {
		super("shape", "Случайная фигура");
	}

	trigger() {
		this.createRandomShape();
	}

	createRandomShape() {
		const shape = document.createElement("div");

		// Случайные параметры
		const size = random(50, 200);
		const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFBE0B", "#FB5607"];
		const shapes = ["circle", "square", "triangle"];
		const randomShape = shapes[random(0, shapes.length - 1)];

		shape.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${colors[random(0, colors.length - 1)]};
      top: ${random(0, window.innerHeight - size)}px;
      left: ${random(0, window.innerWidth - size)}px;
      border-radius: ${randomShape === "circle" ? "50%" : "0"};
      cursor: pointer;
      transition: transform 0.3s ease;
    `;

		if (randomShape === "triangle") {
			shape.style.width = "0";
			shape.style.height = "0";
			shape.style.background = "transparent";
			shape.style.borderLeft = `${size / 2}px solid transparent`;
			shape.style.borderRight = `${size / 2}px solid transparent`;
			shape.style.borderBottom = `${size}px solid ${
				colors[random(0, colors.length - 1)]
			}`;
		}

		shape.addEventListener("click", () => {
			shape.remove();
		});

		shape.addEventListener("mouseenter", () => {
			shape.style.transform = "scale(1.1)";
		});

		shape.addEventListener("mouseleave", () => {
			shape.style.transform = "scale(1)";
		});

		document.body.appendChild(shape);
	}
}
