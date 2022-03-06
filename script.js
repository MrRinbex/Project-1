window.onload = () =>{

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
canvas.width = innerWidth
canvas.height = innerHeight

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  
// player creation
class Player {
    constructor(){
        const ref = 0.17   // ref is like scale or width of the img to ajuste !
        const image = new Image()
        image.src = "./images/space-shuttle-player.png"
        // func to onload the frames of the image
        image.onload = () =>{
            this.image = image
            this.width = image.width * ref
            this.height = image.height * ref
            this.position = {
                x: canvas.width/2 - this.width/2,
                y: canvas.height - this.height - 10,
            };
        }

        this.speed = {
            x: 0,
            y: 0
        }
        
        
    }
    draw(){
        // clear the shadow of the spaceship it take me more then 4 hours to guess it !!
        clearCanvas()
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        }
    refresh(){
        if(this.image){
            this.draw()
            // the initial position + the speed = move
            this.position.x += this.speed.x
            this.position.y += this.speed.y
            
            

        }

    }
}
const player = new Player();
// drowing the player and invok it

animation = () => {
    requestAnimationFrame(animation)
    player.refresh()    

// remove drow method and it will be in refresh method => to every time refresh that draw
}
animation()

// key event 
const key = {
    ArrowRight: {pressed: false},
    d: {pressed: false},
    ArrowLeft: {pressed: false},
    q: {pressed: false},
    space: {pressed: false}
}
window.addEventListener('keydown', (event)=>{
    console.log(event.key)
switch(event.key){
    case "ArrowRight":
        player.speed.x = 5
        key.ArrowRight.pressed = true    
        break
    case "d":
            player.speed.x = 5
            key.d.pressed = true    
        break
    case "ArrowLeft":
            player.speed.x = -5
            key.ArrowLeft.pressed = true    
        break
    case "q":
             player.speed.x = -5
             key.q.pressed = true    
        break
    case " ":
            console.log("space")
            key.space.pressed = true    
        break
       
        }
    })

    window.addEventListener('keydup', (event)=>{
        console.log(event.key)
    switch(event.key){
        case "ArrowRight":
            player.speed.x = 5
            key.ArrowRight.pressed = false    
            break
        case "d":
                player.speed.x = 5
                key.d.pressed = false    
            break
        case "ArrowLeft":
                player.speed.x = -5
                key.ArrowLeft.pressed = false    
            break
        case "q":
                 player.speed.x = -5
                 key.q.pressed = false    
            break
        case " ":
                console.log("space")
                key.space.pressed = false    
            break
           
            }
        })

}