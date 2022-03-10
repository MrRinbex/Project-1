window.onload = () =>{

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
canvas.width = 1024
canvas.height = 576

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  
// player creation
class Player {
    constructor(){
        this.ref = 0.09  //0.34 
        const image = new Image()
        image.src = "./images/space-shuttle-player.png"
        image.onload = () =>{
            this.image = image
            this.width = image.width * this.ref
            this.height = image.height * this.ref
            this.position = {
                x: canvas.width/2 - this.width/2,
                y: canvas.height - this.height +5,
        }
        };
        this.speed = {
            x: 0,
            y: 0
        }  
        this.health = 100
    }
    draw(){
        // clear the shadow of the spaceship it take me more then 4 hours to guess it !!
        clearCanvas()
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        }

        isPositionY(){
            if(this.image)
            return this.position.y
        }
        isHeight(){
            if(this.image)
            return this.height
        }
        isPositionX(){
            if(this.image)
            return this.position.x
        }
        isWidth(){
            if(this.image)
            return this.width
        }
    refresh(){
        if(this.image && this.health > 0){
            this.draw()
            // the initial position + the speed = move
            this.position.x += this.speed.x
            this.position.y += this.speed.y
        }
    }
}
const player = new Player();

// ufo creation
class Ufo {
    constructor({position}){
        this.ref = 0.1   //0.24   
        this.fireOn = false
        const image = new Image()
        image.src = "./images/ufo.png"
        image.onload = () =>{
            this.image = image
            this.width = image.width * this.ref
            this.height = image.height * this.ref
            this.position = {
                x: position.x + canvas.width/4 ,
                y: position.y 
            };
        }
        this.speed = {
            x: 0,
            y: 0
        }  
    }
    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        }
    isPositionY(){
        if(this.image)
        return this.position.y
    }
    isHeight(){
        if(this.image)
        return this.height
    }
    isPositionX(){
        if(this.image)
        return this.position.x
    }
    isWidth(){
        if(this.image)
        return this.width
    }
    refresh({speed}){
        if(this.image){
            this.draw()
            this.position.x += speed.x 
            this.position.y += speed.y
        }
    }
}

const key = {
    ArrowRight: {pressed: false},
    d: {pressed: false},
    ArrowLeft: {pressed: false},
    q: {pressed: false},
    z: {pressed: false},
    s: {pressed: false},
    ArrowUp: {pressed: false},
    ArrowDown: {pressed: false}
}

// creation right rocket 
class Missile1{
    constructor(){
        this.visible = false
        this.ref = 0.04   // 0.1
        this.speed = {
            x: 0,
            y: 0
        }
        const image = new Image()
        image.src = "./images/MissileRight.png"
        image.onload = () =>{
            this.image = image
            this.width = image.width * this.ref
            this.height = image.height * this.ref
            this.position = {
                x: player.position.x - this.width + 65,
                y: player.position.y - this.height + 80
            };
        } 
    }
    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    isPositionY(){
        if(this.image && this.visible === true)
         return this.position.y
    }
    isHeight(){
        if(this.image && this.visible === true)
         return this.height
    }
    isPositionX(){
        if(this.image && this.visible === true)
         return this.position.x
    }
    isWidth(){
        if(this.image && this.visible === true)
         return this.width
    }
    refresh(){
        if(this.image && this.visible === true && game.active === true){
            this.draw()
            this.position.x += this.speed.x
            this.position.y += this.speed.y
        }
    }
}
const missile1 = [new Missile1()]



// creation left rocket 
class Missile2{
    constructor(){
        this.visible = false
        this.ref = 0.04 // 0.1
        const image = new Image()
        image.src = "./images/MissileLeft.png"
        image.onload = () =>{
            this.image = image
            this.width = image.width * this.ref
            this.height = image.height * this.ref
            this.position = {
                x: player.position.x - this.width + 35,
                y: player.position.y - this.height + 80
        };
    }
        this.speed = {
            x: 0,
            y: 0
        }  
    }
    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
    isPositionY(){
        if(this.image && this.visible === true)
         return this.position.y
    }
    isHeight(){
        if(this.image && this.visible === true)
         return this.height
    }
    isPositionX(){
        if(this.image && this.visible === true)
         return this.position.x
    }
    isWidth(){
        if(this.image && this.visible === true)
         return this.width
    }
    refresh(){
        if(this.image && this.visible === true && game.active === true){
            this.draw()
            this.position.x += this.speed.x
            this.position.y += this.speed.y
             
        }
    }
}
const missile2 = [new Missile2()]



// creation of group of ufos


class Wave {
    constructor(){
        this.health = 100
        this.ufos = []
        this.lasers = []
        this.numberOfUfos = Math.floor(Math.random() * 5 + 3)
        this.width = this.numberOfUfos * 20
        for(let i = 0; i < this.numberOfUfos;i++){
            setInterval(()=>{
                const ufo = new Ufo({position:{x:i*100,y:0}});
                this.ufos.push(ufo)
            },6000) 
        };
        this.position = {x:0,y:0} // carefull here !!
        this.speed = {x:2,y:0}
    }
    refresh(){
        if(this.health === 100)
        this.position.x += this.speed.x
        this.position.y += this.speed.y
        this.speed.y = 0
        if( this.position.x + this.width >= canvas.width || this.position.x <= 0)
        this.speed.x = -this.speed.x
        this.speed.y = 2
    }
}


const waves = [new Wave()]

// create class explosion

class Explosion{
    constructor({position, speed, radius, color}){
        this.position = position
        this.radius = radius
        this.speed = speed
        this.color = color
        this.width = this.width 
        this.height = this.height 
        
    }
    draw(){
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y,this.radius, 0,Math.PI * 2 );
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }
    isPositionY(){
         return this.position.y
    }
    isHeight(){
         return this.height
    }
    isPositionX(){
         return this.position.x
    }
    isWidth(){
         return this.width
    }
    refresh(){
        this.draw()
        this.position.x += this.speed.x
        this.position.y += this.speed.y   
    }
}

const explosions = []


let score = 0
const scoreCounter = document.querySelector('.counter')
const information = document.querySelector('#information')
const startBtn = document.querySelector('button.btn-start-game')
const texture = document.querySelector('.speech p')
const restartBtn = document.querySelector('button.btn-restart-game')


let game = {active: false, over: false}
let id = null


startBtn.addEventListener('click', () => {
    game.active = true
    texture.textContent = `Reach 30 points to win `    
})

// here is the engine of the game with frames ! =)
const animation = () => {
    requestAnimationFrame(animation)
    if(!game.active)return
    clearCanvas();
    player.refresh();  
    explosions.forEach((explosion)=>{
        explosion.refresh()
    })  
    waves.forEach((wave)=>{
        wave.refresh()
        wave.ufos.forEach((ufo,i)=>{
            ufo.refresh({speed:wave.speed})   
            if ((ufo.isPositionX() > player.isPositionX() && ufo.isPositionX() < player.isPositionX() + player.isWidth()) && (ufo.isPositionY() > player.isPositionY() && ufo.isPositionY() < player.isPositionY() + player.isHeight()))
            {   // player explosion
                for(let i = 0 ; i < 20; i++){
                    explosions.push(new Explosion({
                        position:{x: ufo.isPositionX() + ufo.isWidth()/2, y: ufo.isPositionY() + ufo.isHeight()/2},
                        speed:{x:(Math.random()-0.5) * 2, y:(Math.random()- 0.5 * 2)},
                        color: " #ffffff ",
                        radius: Math.random() * 3
                    }))
                }
                player.health -=100
                wave.health = 0 
                wave.ufos.splice(i,1)
                setTimeout(()=>{
                    game.active = false
                    game.over = true
                },1000)
                setTimeout(()=>{
                    loserLog()
                },1500)
            } 
            missile1.forEach((rocket,j)=>{
                if ((rocket.isPositionX() > ufo.isPositionX() && rocket.isPositionX() < ufo.isPositionX() + ufo.isWidth()) && (rocket.isPositionY() > ufo.isPositionY() && rocket.isPositionY() < ufo.isPositionY() + ufo.isHeight())){
                    // ufo explosion
                    for(let i = 0 ; i < 40; i++){
                        explosions.push(new Explosion({
                            position:{x: ufo.isPositionX() + ufo.isWidth()/2, y: ufo.isPositionY() + ufo.isHeight()/2},
                            speed:{x:(Math.random()-0.5) * 2, y:(Math.random()- 0.5 * 2)},
                            color:  " #09b648  ",
                            radius: Math.random() * 3
                        }))
                    }
                    setTimeout(()=>{
                        missile1.splice(j,1)
                        wave.ufos.splice(i,1)
                        explosions.splice(j,1)
                        score++
                        scoreCounter.textContent = score
                    }, 0) 
                }
            })
            
            missile2.forEach((rocket,j)=>{
                if ((rocket.isPositionX() > ufo.isPositionX() && rocket.isPositionX() < ufo.isPositionX() + ufo.isWidth()) && (rocket.isPositionY() > ufo.isPositionY() && rocket.isPositionY() < ufo.isPositionY() + ufo.isHeight())){
                    // ufo explosion
                    for(let i = 0 ; i < 20; i++){
                        explosions.push(new Explosion({
                            position:{x: ufo.isPositionX() + ufo.isWidth()/2, y: ufo.isPositionY() + ufo.isHeight()/2},
                            speed:{x:(Math.random()-0.5) * 2, y:(Math.random()- 0.5 * 2)},
                            color: "yellow",
                            radius: Math.random() * 3
                        }))
                    }
                    setTimeout(()=>{
                        missile2.splice(j,1)
                        wave.ufos.splice(i,1)
                        explosions.splice(j,1)
                        score++
                        scoreCounter.textContent = score
                    }, 0) 
                }
            })
        }) 
    })
    if(missile1.length === 80){
        missile1.splice(3)
    }
    if(missile2.length === 80){
        missile2.splice(3)
    }
    if(explosions.length > 100){
        explosions.splice(1)
    }
    missile1.forEach((rocket)=> {
        rocket.refresh()
    });
    missile2.forEach((rocket)=> {
        rocket.refresh()
    });
    if((key.ArrowRight.pressed || key.d.pressed) && player.position.x + player.width <= canvas.width )
    player.speed.x = 9 
    else if((key.ArrowLeft.pressed || key.q.pressed ) && player.position.x >= 0)
    player.speed.x = -9
    else
    player.speed.x = 0
    
    if(score >= 30){
        setTimeout(()=>{
            game.active = false
        },500)
        setTimeout(()=>{
            winnerLog()
        },1500)
    }
}  


animation()
function startAnimation(){
    id = requestAnimationFrame(animation)
}
function cancelAnimation(){
    cancelAnimationFrame(id)
}
restartBtn.addEventListener('click', () =>{
            cancelAnimation(animation)
            clearCanvas()
            restartLog()
            score = 0
            scoreCounter.textContent = score
            game.active = false
            game.over = true
            missile1.visible = true
            missile2.visible = true
            player.health = 100        
    })

// key event 

window.addEventListener('keydown', (event)=>{
switch(event.key){
    case "ArrowRight":
            key.ArrowRight.pressed = true    
        break
    case "d":
            key.d.pressed = true    
        break
    case "ArrowLeft":
            key.ArrowLeft.pressed = true    
        break
    case "q":
             key.q.pressed = true    
        break
    case "z":
        if(player.health > 0){
            key.z.pressed = true    
            missile1.push(new Missile1())                
            missile1.forEach((rocket)=> {
            rocket.visible = true
            rocket.speed.y = -10
            rocket.refresh()
            soundFire()
    })
        }
        break
    case "s":
            if(player.health > 0){
                key.s.pressed = true    
                missile2.push(new Missile2())
                missile2.forEach((rocket)=> {
                rocket.visible = true
                soundFireRed()
                rocket.speed.y = -2
                rocket.refresh()
            })
            }
          
        break
        case "ArrowUp":
            if(player.health > 0){
                key.ArrowUp.pressed = true    
                missile1.push(new Missile1())
                missile1.forEach((rocket)=> {
                rocket.visible = true
                soundFire()
                rocket.speed.y = -10
                rocket.refresh()
            })
            }
        break
        case "ArrowDown":
            if(player.health > 0){
                key.ArrowDown.pressed = true    
                missile2.push(new Missile2())
                missile2.forEach((rocket, i)=> {
                rocket.visible = true
                soundFireRed()
                rocket.speed.y = -2
                rocket.refresh()       
            })
            }
        break
        }
    })
    
    window.addEventListener('keyup', (event)=>{
    switch(event.key){
        case "ArrowRight":
                key.ArrowRight.pressed = false    
            break
        case "d":
                key.d.pressed = false    
            break
        case "ArrowLeft":
                key.ArrowLeft.pressed = false    
            break
        case "q":
                 key.q.pressed = false    
            break
        case "z":
                key.z.pressed = false    
            break
        case "s":
                key.s.pressed = false    
            break
        case "ArrowUp":
                 key.z.pressed = false
            break
        case "ArrowDown":
                key.s.pressed = false    
        break
           
            }
        })


// generic audio

	const audio = new Audio();
	audio.src = "./sound & effect/mainMusic.wav";
	audio.loop = true;
    const soundPlay = () =>{
        audio.play()
    }
    audio.addEventListener("canplaythrough", soundPlay)
    const soundOnOff = document.querySelector('img.soundBtn')
	function mute(){
		if(audio.muted){
		    audio.muted = false;
		    soundOnOff.style.backgroundImage = "url('./images/volumeBtn.png')"; 
	    } else {
		    audio.muted = true;
		    soundOnOff.style.backgroundImage = "url('./images/muteBtn.png')" ;
	    }
	}
    soundOnOff.addEventListener("click", mute);

// fire main player

const audioPlayerFire = new Audio();
audioPlayerFire.src = "./sound & effect/ufoFireSound.wav";
const soundFire = () => {
    audioPlayerFire.play()
}
const audioPlayerFireRed = new Audio();
audioPlayerFireRed.src = "./sound & effect/playerFireSound.wav";
const soundFireRed = () => {
    audioPlayerFireRed.play()
}

// loger winner
const winnerLog = () =>{
    information.textContent = 'Well done'
}
const loserLog = () =>{
    information.textContent = 'No chance !'
}
const restartLog = () =>{
    information.textContent = ''
}

}
