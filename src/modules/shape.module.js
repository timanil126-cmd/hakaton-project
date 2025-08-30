import {Module} from '../core/module'
import {random} from '../utils'

export class ShapeModule extends Module {
    constructor(){
        super('shape','случайная фигура')
    }

    trigger(){
        this.createRandomSheape()
    }
    
    createRandomSheape(){
        const body = document.querySelector('body')
        body.style.position = 'relative'
        function getRandomColor() {
            let letters = "0123456789ABCDEF";
            let color = "#";
            for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }


        const availHeight = window.innerHeight
        const availWidth = window.innerWidth
        const size = random(50,200)
        const distanceRelativeToScreenHeight = random(0,availHeight-size)
        const distanceRelativeToScreenWidth = random(0,availWidth-size)

        const shape = document.createElement('div')
        const shapes = ['circle','square','triangle']
        const randomShape = shapes[random(0,shapes.length-1)]

		shape.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${getRandomColor()};
            top: ${distanceRelativeToScreenHeight}px;
            left: ${distanceRelativeToScreenWidth}px;
            border-radius: ${randomShape === "circle" ? "50%" : "0"};
            cursor: pointer;
            transition: transform 0.3s ease;
        `;
        if(randomShape==='triangle'){//css не умеет рисовать треугольники напрямую
            shape.style.width = '0'//длинна 0
            shape.style.height = '0'//высота 0
            shape.style.background = 'transparent'//прозрачный фон 
            shape.style.borderLeft =`${size / 2}px solid transparent`//два прозрачных края
            shape.style.borderRight = `${size / 2}px solid transparent`//два прозрачных края
            shape.style.borderBottom = `${size}px solid ${getRandomColor()}`
        }
        shape.addEventListener('click',()=>{
            shape.remove()
        })
        
        body.append(shape)
    }

}
