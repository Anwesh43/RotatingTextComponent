class RotatingTextComponent extends HTMLElement{
    constructor() {
        super()
        this.color = this.getAttribute("color")
        this.text = this.getAttribute("text")
        this.tags = this.getAttribute("tags")
        this.img = document.createElement('img')
    }
    draw() {
        const canvas = document.createElement('canvas')
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        const context = canvas.getContext('2d')
        context.clearRect(0,0,canvas.width,canvas.height)
        context.fillStyle = this.color
        context.fillRect(0,0,canvas.width,canvas.height)
        context.fillStyle = 'white'
        context.font = context.font.replace(/\d{2}/,`${window.innerWidth/15}`)
        const tw = context.measureText(this.text).width
        context.fillText(this.text,canvas.width/2-tw,canvas.height/2)
    }
}
class RotatingText {
    constructor(tags) {
        this.tags = tags
        this.index = 0
    }
    draw() {
        context.fillStyle = 'white'
    }
    move() {
        this.index ++
        this.index %= this.index.length
    }
}
