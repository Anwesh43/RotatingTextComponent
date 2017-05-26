class RotatingTextComponent extends HTMLElement{
    constructor() {
        super()
        this.color = this.getAttribute("color")
        this.text = this.getAttribute("text")+" "
        this.tags = this.getAttribute("tags").split(",")
        this.img = document.createElement('img')
        this.rotatingText = new RotatingText(this.tags,()=>{
            this.isMoving = false
            clearInterval(this.interval)
        })
        this.isMoving = false
        const shadow = this.attachShadow({mode:'open'})
        shadow.appendChild(this.img)
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

        const longestTag = this.tags.reduce((a,b)=>{return context.measureText(a).width > context.measureText(b).width?a:b })
        const tw = context.measureText(this.text).width
        console.log(longestTag)
        const tagW = (context.measureText(longestTag).width)*1.3
        const tagH = window.innerWidth/12
        const tagX = canvas.width/2 -tagW/2+tw/2
        context.fillText(this.text,canvas.width/2-(tw+tagW)/2,canvas.height/2)
        context.save()
        context.translate(tagX,canvas.height/2)
        this.rotatingText.draw(context,tagW,tagH)
        if(this.isMoving == true) {
            this.rotatingText.move(tagH)
        }
        context.restore()
        this.img.src = canvas.toDataURL()

    }
    connectedCallback() {
        this.draw()
        this.img.onmousedown = () => {
            if(this.isMoving == false) {
                console.log("clicked")
                this.isMoving = true
                console.log(this.isMoving)
                this.interval = setInterval(() => {
                    this.draw()
                },100)

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
        context.save()
        context.beginPath()
        context.rect(0,-h/2-h/10,w,9*h/10)
        context.clip()
        this.screen.draw(context,w,h)
        context.restore()
    }
    move(h) {
        this.screen.move(h)
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
        const index = this.index
        context.fillText(this.tags[index],0,this.y)
        if(index+1 < this.tags.length) {
            context.fillText(this.tags[index+1],0,this.y+h)
        }
        else {
            context.fillText(this.tags[0],0,this.y+h)
        }
    }
    move(h) {
        console.log(h)
        console.log(this.y)
        this.y -= h/5
        if(this.y <= -h) {
            this.index ++
            if(this.index == this.tags.length) {
                this.index = 0

            }
            this.y = 0
            this.cb()
        }
    }
}
customElements.define('rotating-text-div',RotatingTextComponent)
