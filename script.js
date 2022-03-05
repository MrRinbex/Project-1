window.onload = () =>{

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
canvas.width = innerWidth
canvas.height = innerHeight

// player creation
class Player {
    constructor(){
        this.position = {
            x: 900,
            y: 400
        };

        const image = new Image()
        image.src = "./images/space-shuttle-player.png"
        this.image = image
        this.width = 120
        this.height = 100

        this.velocity = {
            x: 0,
            y: 0
        }
        
        
    }
    draw(){
        // ctx.fillStyle = "yellow"
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)

        }
}
const player = new Player();
player.draw()

animation = () => {
    requestAnimationFrame(animation)
    player.draw()
}
animation()

}