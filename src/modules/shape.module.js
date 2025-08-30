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


        const availHeight = window.screen.availHeight
        const availWidth = window.screen.availWidth
        const size = random(50,200)
        const distanceRelativeToScreenHeight = random(0,availHeight)
        const distanceRelativeToScreenWidth = random(0,availWidth)

        const shape = document.createElement('div')
        shape.style.width = `${size}px`
        shape.style.height = `${size}px`
        shape.style.position = 'absolute'
        shape.style.background = getRandomColor()
        shape.style.top = `${distanceRelativeToScreenHeight}px`
        shape.style.left = `${distanceRelativeToScreenWidth}px`
    
        const randomForm = Math.random();   
        if (randomForm <= 0.5) {
            shape.style.borderRadius = '50%';
        }

        shape.addEventListener('mouseover',()=>{
            shape.style.background = getRandomColor()
            shape.style.transform = 'scale(2)'
        })
        shape.addEventListener('mouseleave',()=>{
            shape.style.transform = 'scale(1)'
        })
        shape.addEventListener('click',()=>{
            shape.remove()
        })
        
      

        body.append(shape)
    }

}
