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
    draw(context,w,h) {
        context.fillStyle = 'white'
    }
    move(h) {
        this.index ++
        this.index %= this.index.length
    }
}
class Screen {
    constructor(tags) {
        this.tags = tags
        this.index = 0
        this.y = 0
    }
    draw(context,w,h) {
        context.fillText(this.tags[index],w/2-measureText(this.tags[index]).width/2,this.y+h/2)
        if(index+1 < this.tags.length) {
            context.fillText(this.tags[index],w/2-measureText(this.tags[index+1]).width/2,this.y+3*h/2)
        }
        else {
            context.fillText(this.tags[index],w/2-measureText(this.tags[0]).width/2,this.y+3*h/2)
        }
    }
    move(h) {
        this.y - = h/5
        if(this.y >= h) {
            this.index ++
            if(this.index == this.tags.length) {
                this.index = 0
            }
            this.y = 0
        }
    }
}
