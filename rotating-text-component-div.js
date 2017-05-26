class RotatingTextComponent extends HTMLElement{
    constructor() {
        super()
        this.color = this.getAttribute("color")
        this.text = this.getAttribute("text")
        this.tags = this.getAttribute("tags")
        this.img = document.createElement('img')
        this.rotatingText = new RotatingText(tags,()=>{
            this.isMoving = false
        })
        this.isMoving = false
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
        context.fillText(this.text,canvas.width/2-tw/2,canvas.height/2)
        const longestTag = this.tage.reduce((word,a)=>{console.log(word);return a.length > word.length?a:word })
        const tagW = (context.measureText(longestTag).width) * 1.5
        const tagH = window.innerWidth/12
        const tagX = canvas.width/2 + tw/2
        context.save()
        context.translate(tagX,canvas.height/2)
        this.rotatingText.draw(context,tagW,tagH)
        if(this.isMoving == false) {
            this.rotatingText.move(tagH)
        }
        context.restore()
        this.img.src = canvas.toDataURL()
        this.img.onmousedown = () => {
            if(this.isMoving == false) {
                this.isMoving = true
            }
        }
    }
}
class RotatingText {
    constructor(tags,cb) {
        this.tags = tags
        this.index = 0
        this.screen = new Screen(tags,cb)
    }
    draw(context,w,h) {
        context.fillStyle = 'white'
        this.screen.draw(context,w,h)
    }
    move(h) {
        this.screen.move()
    }
}
class Screen {
    constructor(tags,cb) {
        this.tags = tags
        this.cb = cb
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
                this.cb()
            }
            this.y = 0
        }
    }
}
customElements.defineElement('rotating-text-div',RotatingTextComponent)
