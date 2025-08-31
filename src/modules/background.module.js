import { Module } from '../core/module'

export class BackgroundModule extends Module {
    constructor() {
        super('background', 'Случайный фон')
        this.modes = ['solid', 'gradient']
        this.currentMode = 'solid'
    }

    trigger() {
        if (this.currentMode === 'solid') {
            this.setSolidColor()
        } else {
            this.setGradient()
        }
        
        // Переключаем режим для следующего вызова
        this.currentMode = this.currentMode === 'solid' ? 'gradient' : 'solid'
    }

    setSolidColor() {
        const color = this.generateRandomColor()
        this.changeBackground(color)
        this.showNotification(`Сплошной фон: ${color}`)
    }

    setGradient() {
        const color1 = this.generateRandomColor()
        const color2 = this.generateRandomColor()
        const gradient = `linear-gradient(135deg, ${color1}, ${color2})`
        
        this.changeBackground(gradient)
        this.showNotification(`Градиент: ${color1} → ${color2}`)
    }

    generateRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    }

    changeBackground(background) {
        document.body.style.transition = 'background 0.8s ease'
        document.body.style.background = background
    }

    showNotification(message) {
        // ... (такая же реализация как выше)
    }
}
