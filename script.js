window.onload = () =>{

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
canvas.width = innerWidth
canvas.height = innerHeight

// clear the canvas (not repeat img after mouvement)
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  
// player creation
class Player {
    constructor(){
        this.ref = 0.17   // ref is like scale or width of the img to ajuste !
        const image = new Image()
        image.src = "./images/space-shuttle-player.png"
        // func to onload the frames of the image
        image.onload = () =>{
            this.image = image
            this.width = image.width * this.ref
            this.height = image.height * this.ref
            this.position = {
                x: canvas.width/2 - this.width/2,
                y: canvas.height - this.height - 10,
        }
        };
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


// ufo creation
class Ufo {
    constructor({position}){
        this.ref = 0.24   
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
    ifIsCollision(missilePosition){
        return (missilePosition.x > this.position.x && missilePosition.x < this.position.x + this.width) && (missilePosition.y > this.position.y && missilePosition.y < this.position.y + this.height)
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
        this.ref = 0.1
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
                x: player.position.x - this.width + 165,
                y: player.position.y - this.height + 160
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
        if(this.image && this.visible === true){
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
        const visible = false
        const ref = 0.1
        const image = new Image()
        image.src = "./images/MissileLeft.png"
        image.onload = () =>{
            this.image = image
            this.width = image.width * ref
            this.height = image.height * ref
            this.position = {
                x: player.position.x - this.width + 50,
                y: player.position.y - this.height + 160
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
        if(this.image && this.visible === true){
            this.draw()
            this.position.x += this.speed.x
            this.position.y += this.speed.y
             
        }
    }
}
const missile2 = [new Missile2()]

// creation laser ufo 
class Laser{
    constructor(){
        const visible = false
        const ref = 0.1
        const image = new Image()
        image.src = "./images/laser.png"
        image.onload = () =>{
            this.image = image
            this.width = image.width * ref
            this.height = image.height * ref
            this.position = {
                x: player.position.x - this.width + 50,
                y: player.position.y - this.height + 160
        };
    }   
        this.width = 3
        this.height = 10
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
        if(this.image && this.visible === true){
            this.draw()
            this.position.x += this.speed.x
            this.position.y += this.speed.y
             
        }
    }
}
const laser = [new Laser()]


// creation of group of ufos


class Wave {
    constructor(){
        this.ufos = []
        this.numberOfUfos = Math.floor(Math.random() * 4 + 3)
        this.width = this.numberOfUfos * 200
        for(let i = 0; i < this.numberOfUfos;i++){
            // this.ufos.push(new Ufo({position:{x:i*220,y:0}}))
            setInterval(()=> {
                this.ufos.push(new Ufo({position:{x:i*200,y:i*90}}))
              }, 5000);
        };
        this.position = {x:0,y:-3} // carefull here !!
        this.speed = {x:3,y:0}
    }
    refresh(){
        this.position.x += this.speed.x
        this.position.y += this.speed.y
        this.speed.y = 0
        if( this.position.x + this.width >= canvas.width || this.position.x <= 0)
        this.speed.x = -this.speed.x
        this.speed.y = 4

    }
}
const waves = [new Wave()]

// here is the engine of the game with frames ! =)
animation = () => {
    requestAnimationFrame(animation)
    clearCanvas();
    player.refresh();  
    waves.forEach((wave)=>{
        wave.refresh()
        if(wave.position.y === canvas.height && wave.position.x === canvas.width ){
            waves.push(new Wave())
        }
            wave.ufos.forEach((ufo,i)=>{
                ufo.refresh({speed:wave.speed})
            missile1.forEach((rocket,j)=>{
                // if(rocket.isPositionY() - rocket.isHeight() <= ufo.isPositionY() - ufo.isHeight())
                if ((rocket.isPositionX() > ufo.isPositionX() && rocket.isPositionX() < ufo.isPositionX() + ufo.isWidth()) && (rocket.isPositionY() > ufo.isPositionY() && rocket.isPositionY() < ufo.isPositionY() + ufo.isHeight()))
                setTimeout(()=>{
                        missile1.splice(j,1)
                        wave.ufos.splice(i,1)
                }, 0) 
            })
            missile2.forEach((rocket,j)=>{
                if ((rocket.isPositionX() > ufo.isPositionX() && rocket.isPositionX() < ufo.isPositionX() + ufo.isWidth()) && (rocket.isPositionY() > ufo.isPositionY() && rocket.isPositionY() < ufo.isPositionY() + ufo.isHeight()))
                setTimeout(()=>{
                        missile2.splice(j,1)
                        wave.ufos.splice(i,1)
                }, 0) 
            })
        })
    })
        if(missile1.length === 80){
            missile1.splice(3)
        }
        if(missile2.length === 80){
            missile2.splice(3)
        }
        missile1.forEach((rocket,i)=> {
            rocket.refresh()
        });
        missile2.forEach((rocket, i)=> {
            rocket.refresh()
        });
        
        if((key.ArrowRight.pressed || key.d.pressed) && player.position.x + player.width <= canvas.width )
        player.speed.x = 9 
        else if((key.ArrowLeft.pressed || key.q.pressed ) && player.position.x >= 0)
        player.speed.x = -9
        else
        player.speed.x = 0
          
    }  
animation()

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
            key.z.pressed = true    
            missile1.push(new Missile1())
            missile1.forEach((rocket)=> {
            rocket.visible = true
            soundFire()
            rocket.speed.y = -10
            rocket.refresh()
        })
        console.log(missile1)
        break
    case "s":
            key.s.pressed = true    
            missile2.push(new Missile2())
            missile2.forEach((rocket)=> {
            rocket.visible = true
            soundFireRed()
            rocket.speed.y = -2
            rocket.refresh()
        })
        break
        case "ArrowUp":
            key.ArrowUp.pressed = true    
            missile1.push(new Missile1())
            missile1.forEach((rocket)=> {
            rocket.visible = true
            soundFire()
            rocket.speed.y = -10
            rocket.refresh()
        })
        break
    case "ArrowDown":
            key.ArrowDown.pressed = true    
            missile2.push(new Missile2())
            missile2.forEach((rocket, i)=> {
            rocket.visible = true
            soundFireRed()
            rocket.speed.y = -2
            rocket.refresh()       
            })
        break
        }
    })
    
    addEventListener('keyup', (event)=>{
        console.log(event.key)
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



}