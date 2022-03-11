window.onload = () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 1024;
  canvas.height = 576;

  let score = 0;
  let game = { active: false, level: "easyMode" };
  let id = null;

  const key = {
    ArrowRight: { pressed: false },
    d: { pressed: false },
    ArrowLeft: { pressed: false },
    q: { pressed: false },
    z: { pressed: false },
    s: { pressed: false },
    ArrowUp: { pressed: false },
    ArrowDown: { pressed: false },
  };

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // player creation
  class Player {
    constructor() {
      this.ref = 0.09; //0.34
      const image = new Image();
      image.src = "./images/space-shuttle-player.png";
      image.onload = () => {
        this.image = image;
        this.width = image.width * this.ref;
        this.height = image.height * this.ref;
        this.position = {
          x: canvas.width / 2 - this.width / 2,
          y: canvas.height - this.height + 5,
        };
      };
      this.speed = {
        x: 0,
        y: 0,
      };
      this.health = 100;
    }
    draw() {
      // clear the shadow of the spaceship it take me more then 4 hours to guess it !!
      clearCanvas();
      ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }

    isPositionY() {
      if (this.image) return this.position.y;
    }
    isHeight() {
      if (this.image) return this.height;
    }
    isPositionX() {
      if (this.image) return this.position.x;
    }
    isWidth() {
      if (this.image) return this.width;
    }
    refresh() {
      if (this.image && this.health > 0) {
        this.draw();
        // the initial position + the speed = move
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
      }
    }
  }
  let player = new Player();

  // ufo creation
  class Ufo {
    constructor({ position }) {
      this.ref = 0.1; //0.24
      this.fireOn = false;
      const image = new Image();
      image.src = "./images/ufo.png";
      image.onload = () => {
        this.image = image;
        this.width = image.width * this.ref;
        this.height = image.height * this.ref;
        this.position = {
          x: position.x + canvas.width / 4,
          y: position.y,
        };
      };
      this.speed = {
        x: 0,
        y: 0,
      };
    }
    draw() {
      ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
    isPositionY() {
      if (this.image) return this.position.y;
    }
    isHeight() {
      if (this.image) return this.height;
    }
    isPositionX() {
      if (this.image) return this.position.x;
    }
    isWidth() {
      if (this.image) return this.width;
    }
    refresh({ speed }) {
      if (this.image) {
        this.draw();
        this.position.x += speed.x;
        this.position.y += speed.y;
      }
    }
  }

  // creation right rocket
  class Missile1 {
    constructor() {
      this.visible = false;
      this.ref = 0.04; // 0.1
      this.speed = {
        x: 0,
        y: 0,
      };
      const image = new Image();
      image.src = "./images/MissileRight.png";
      image.onload = () => {
        this.image = image;
        this.width = image.width * this.ref;
        this.height = image.height * this.ref;
        this.position = {
          x: player.position.x ? player.position.x - this.width + 65 : canvas.width / 2 - (3 * this.width) / 2 + 65 ,
          y: player.position.y - this.height + 80,
        };
      };
    }
    draw() {
      ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
    isPositionY() {
      if (this.image && this.visible === true) return this.position.y;
    }
    isHeight() {
      if (this.image && this.visible === true) return this.height;
    }
    isPositionX() {
      if (this.image && this.visible === true) return this.position.x;
    }
    isWidth() {
      if (this.image && this.visible === true) return this.width;
    }
    refresh() {
      if (this.image && this.visible === true && game.active === true) {
        this.draw();
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
      }
    }
  }
  const missile1 = [new Missile1()];

  // creation left rocket
  class Missile2 {
    constructor() {
      this.visible = false;
      this.ref = 0.04; // 0.1
      const image = new Image();
      image.src = "./images/MissileLeft.png";
      image.onload = () => {
        this.image = image;
        this.width = image.width * this.ref;
        this.height = image.height * this.ref;
        this.position = {
          x: player.position.x - this.width + 35,
          y: player.position.y - this.height + 80,
        };
      };
      this.speed = {
        x: 0,
        y: 0,
      };
    }
    draw() {
      ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
    isPositionY() {
      if (this.image && this.visible === true) return this.position.y;
    }
    isHeight() {
      if (this.image && this.visible === true) return this.height;
    }
    isPositionX() {
      if (this.image && this.visible === true) return this.position.x;
    }
    isWidth() {
      if (this.image && this.visible === true) return this.width;
    }
    refresh() {
      if (this.image && this.visible === true && game.active === true) {
        this.draw();
        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
      }
    }
  }
  const missile2 = [new Missile2()];

  // creation of group of ufos

  class Wave {
    constructor() {
      this.health = 100;
      this.ufos = [];
      this.numberOfUfos = Math.floor(Math.random() * 2 + 5);
      this.width = this.numberOfUfos * 20;
      for (let i = 0; i < this.numberOfUfos; i++) {
        if (game.level === "hardMode") {
          setInterval(() => {
            const ufo = new Ufo({ position: { x: i * 100, y: 0 } });
            this.ufos.push(ufo);
          }, 3000);
        } else {
          setInterval(() => {
            const ufo = new Ufo({ position: { x: i * 100, y: 0 } });
            this.ufos.push(ufo);
          }, 5000);
        }
      }
      this.position = { x: 0, y: 0 }; // carefull here !!
      this.speed = { x: 3, y: 0 };
    }
    refresh() {
      if (this.health === 100) this.position.x += this.speed.x;
      this.position.y += this.speed.y;
      this.speed.y = 0;
      if (
        this.position.x + this.width >= canvas.width ||
        this.position.x <= 0
      ) {
        this.speed.x = -this.speed.x;
        this.speed.y = 2;
      }
      if (game.level === "hardMode") {
        this.speed.y = 7;
      } else this.speed.y = 2;
    }
    fullHealth() {
      this.health = 100;
    }
    zeroHealth() {
      this.health = 0;
    }
  }

  let waves = [new Wave()];

  // create class explosion

  class Explosion {
    constructor({ position, speed, radius, color }) {
      this.position = position;
      this.radius = radius;
      this.speed = speed;
      this.color = color;
      this.width = this.width;
      this.height = this.height;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
    isPositionY() {
      return this.position.y;
    }
    isHeight() {
      return this.height;
    }
    isPositionX() {
      return this.position.x;
    }
    isWidth() {
      return this.width;
    }
    refresh() {
      this.draw();
      this.position.x += this.speed.x;
      this.position.y += this.speed.y;
    }
  }

  let explosions = [];

  const scoreCounter = document.querySelector(".counter");
  const information = document.querySelector("#information");
  const startBtn = document.querySelector("button.btn-start-game");
  const texture = document.querySelector(".speech p");
  const restartBtn = document.querySelector("button.btn-restart-game");
  const levelBtnText = document.querySelector(".level p");
  const imgLevelBtn = document.querySelector("img.lvlBtn");
  const btnLvl = document.querySelector("button.level");
  function easy() {
    game.level = "easyMode";
    levelBtnText.textContent = "No cry";
    imgLevelBtn.style.backgroundImage = "url('./images/easyLvl.png')";
    texture.textContent = `Reach 15 points to win, good luck... `;
    clickEffect();
  }
  function hard() {
    game.level = "hardMode";
    levelBtnText.textContent = "Speedy";
    imgLevelBtn.style.backgroundImage = "url('./images/hardLvl.png')";
    texture.textContent = `Reach 50 points to win, good luck... `;
    clickEffect();
  }




function colissionExplision(){
    explosions.forEach((explosion) => explosion.refresh());
    waves.forEach((wave) => {
        wave.refresh();
        wave.ufos.forEach((ufo, i) => {
          ufo.refresh({ speed: wave.speed });
          if (
            ufo.isPositionX() > player.isPositionX() &&
            ufo.isPositionX() < player.isPositionX() + player.isWidth() &&
            ufo.isPositionY() > player.isPositionY() &&
            ufo.isPositionY() < player.isPositionY() + player.isHeight()
          ) {
            // player explosion
            for (let i = 0; i < 20; i++) {
              explosions.push(
                new Explosion({
                  position: {
                    x: ufo.isPositionX() + ufo.isWidth() / 2,
                    y: ufo.isPositionY() + ufo.isHeight() / 2,
                  },
                  speed: {
                    x: (Math.random() - 0.5) * 2,
                    y: (Math.random() - 1.2) * 2,
                  },
                  color: " #ffffff ",
                  radius: Math.random() * 8,
                })
              );
            }
            soundExplosionPlayer();
            player.health -= 100;
            wave.health = 0;
            wave.ufos.splice(i, 1);
            setTimeout(() => {
              game.active = false;
            }, 2500);
            setTimeout(() => {
              loserLog();
              soundEndGame();
            }, 3000);
          }
          missile1.forEach((rocket, j) => {
            if (
              rocket.isPositionX() > ufo.isPositionX() &&
              rocket.isPositionX() < ufo.isPositionX() + ufo.isWidth() &&
              rocket.isPositionY() > ufo.isPositionY() &&
              rocket.isPositionY() < ufo.isPositionY() + ufo.isHeight()
            ) {
              // ufo explosion
              for (let i = 0; i < 40; i++) {
                explosions.push(
                  new Explosion({
                    position: {
                      x: ufo.isPositionX() + ufo.isWidth() / 2,
                      y: ufo.isPositionY() + ufo.isHeight() / 2,
                    },
                    speed: {
                      x: (Math.random() - 0.5) * 2,
                      y: Math.random() - 0.5 * 2,
                    },
                    color: " #09b648  ",
                    radius: Math.random() * 3,
                  })
                );
              }
              setTimeout(() => {
                missile1.splice(j, 1);
                wave.ufos.splice(i, 1);
                soundExplosionUfo();
                explosions.splice(j, 1);
                score++;
                scoreCounter.textContent = score;
              }, 0);
            }
          });
          missile2.forEach((rocket, j) => {
            if (
              rocket.isPositionX() > ufo.isPositionX() &&
              rocket.isPositionX() < ufo.isPositionX() + ufo.isWidth() &&
              rocket.isPositionY() > ufo.isPositionY() &&
              rocket.isPositionY() < ufo.isPositionY() + ufo.isHeight()
            ) {
              // ufo explosion
              for (let i = 0; i < 20; i++) {
                explosions.push(
                  new Explosion({
                    position: {
                      x: ufo.isPositionX() + ufo.isWidth() / 2,
                      y: ufo.isPositionY() + ufo.isHeight() / 2,
                    },
                    speed: {
                      x: (Math.random() - 0.5) * 2,
                      y: Math.random() - 0.5 * 2,
                    },
                    color: "yellow",
                    radius: Math.random() * 3,
                  })
                );
              }
              setTimeout(() => {
                missile2.splice(j, 1);
                wave.ufos.splice(i, 1);
                soundExplosionUfo();
                explosions.splice(j, 1);
                score++;
                scoreCounter.textContent = score;
              }, 0);
            }
          });
        });
      });
}
function spliceMissiles(){
    if (missile1.length === 80) {
        missile1.splice(3);
      }
      if (missile2.length === 80) {
        missile2.splice(3);
      }
      if (explosions.length > 100) {
        explosions.splice(20, 60);
      }
      missile1.forEach((rocket) => {
        rocket.refresh();
      });
      missile2.forEach((rocket) => {
        rocket.refresh();
      });
}
function directionKeys(){
    if (
        (key.ArrowRight.pressed || key.d.pressed) &&
        player.position.x + player.width <= canvas.width
      )
        player.speed.x = 9;
      else if ((key.ArrowLeft.pressed || key.q.pressed) && player.position.x >= 0)
        player.speed.x = -9;
      else player.speed.x = 0;  
}

function winner(){
    if (
        (score >= 15 && game.level === "easyMode") ||
        (score >= 50 && game.level === "hardMode")
      ) {
        setTimeout(() => {
          game.active = false;
        }, 500);
        setTimeout(() => {
          soundWinGame();
          winnerLog();
        }, 1500);
      }
}



  // here is the engine of the game with frames ! =)
  const animation = () => {
    id = requestAnimationFrame(animation);
    if (!game.active) return;
    clearCanvas();
    player.refresh();
    colissionExplision()
    spliceMissiles()
    directionKeys()
    winner()
  };

  animation();

  // btn function
  btnLvl.addEventListener("click", () => {
    if (game.level === "easyMode") {
      hard();
    } else easy();
  });
  startBtn.addEventListener("click", () => {
    if (player.health === 100 && game.active === false) {
      clickEffect();
      soundPause();
      readyLog();
      soundReadyGo();
      setTimeout(() => restartLog(), 1000);
      setTimeout(() => empltyLog(), 2000);
      game.active = true;
      if (game.level === "easyMode")
        texture.textContent = `Reach 15 points to win, good luck... `;
      else if (game.level === "hardMode")
        texture.textContent = `Reach 50 points to win, good luck... `;
    }
  });
  restartBtn.addEventListener("click", () => {
    clickEffect();
    soundPause();
    cancelAnimationFrame(id);
    clearCanvas();
    score = 0;
    scoreCounter.textContent = score;
    readyLog();
    soundReadyGo();
    setTimeout(() => {
      restartLog();
    }, 1500);
    setTimeout(() => {
      game.active = true;
      empltyLog();
    }, 3000);
    animation();
    missile1.visible = true;
    missile2.visible = true;
    explosions = [];
    waves = [];
    waves.push(new Wave());
    player.health = 100;
    player = new Player();
  });

  // key event

  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowRight":
        key.ArrowRight.pressed = true;
        break;
      case "d":
        key.d.pressed = true;
        break;
      case "ArrowLeft":
        key.ArrowLeft.pressed = true;
        break;
      case "q":
        key.q.pressed = true;
        break;
      case "z":
        if (player.health > 0 && game.active === true) {
          key.z.pressed = true;
          missile1.push(new Missile1());
          missile1.forEach((rocket) => {
            rocket.visible = true;
            rocket.speed.y = -10;
            rocket.refresh();
            if (game.active) soundFire();
          });
        }
        break;
      case "s":
        if (player.health > 0 && game.active === true) {
          key.s.pressed = true;
          missile2.push(new Missile2());
          missile2.forEach((rocket) => {
            rocket.visible = true;
            rocket.speed.y = -2;
            rocket.refresh();
            if (game.active) soundFireRed();
          });
        }

        break;
      case "ArrowUp":
        if (player.health > 0 && game.active === true) {
          key.ArrowUp.pressed = true;
          missile1.push(new Missile1());
          missile1.forEach((rocket) => {
            rocket.visible = true;
            rocket.speed.y = -10;
            rocket.refresh();
            if (game.active) soundFire();
          });
        }
        break;
      case "ArrowDown":
        if (player.health > 0 && game.active === true) {
          key.ArrowDown.pressed = true;
          missile2.push(new Missile2());
          missile2.forEach((rocket, i) => {
            rocket.visible = true;
            rocket.speed.y = -2;
            rocket.refresh();
            soundFireRed();
          });
        }
        break;
    }
  });

  window.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "ArrowRight":
        key.ArrowRight.pressed = false;
        break;
      case "d":
        key.d.pressed = false;
        break;
      case "ArrowLeft":
        key.ArrowLeft.pressed = false;
        break;
      case "q":
        key.q.pressed = false;
        break;
      case "z":
        key.z.pressed = false;
        break;
      case "s":
        key.s.pressed = false;
        break;
      case "ArrowUp":
        key.z.pressed = false;
        break;
      case "ArrowDown":
        key.s.pressed = false;
        break;
    }
  });

  // generic audio

  const audio = new Audio();
  audio.src = "./sound & effect/mainMusic.wav";
  audio.loop = true;
  const soundPlay = () => {
    audio.play();
  };
  const soundPause = () => {
    audio.pause();
  };
  audio.addEventListener("canplaythrough", soundPlay);
  const soundOnOff = document.querySelector("img.soundBtn");
  function mute() {
    if (audio.muted) {
      audio.muted = false;
      soundOnOff.style.backgroundImage = "url('./images/volumeBtn.png')";
    } else {
      audio.muted = true;
      soundOnOff.style.backgroundImage = "url('./images/muteBtn.png')";
    }
  }
  soundOnOff.addEventListener("click", mute);

  // fire sound

  const audioPlayerFire = new Audio();
  audioPlayerFire.src = "./sound & effect/ufoFireSound.wav";
  const soundFire = () => {
    audioPlayerFire.play();
  };
  const audioPlayerFireRed = new Audio();
  audioPlayerFireRed.src = "./sound & effect/playerFireSound.wav";
  const soundFireRed = () => {
    audioPlayerFireRed.play();
  };
  const audioPlayerExplosion = new Audio();
  audioPlayerExplosion.src = "./sound & effect/explosionSoundPlayer.wav";
  const soundExplosionPlayer = () => {
    audioPlayerExplosion.play();
  };
  const audioUfoExplosion = new Audio();
  audioUfoExplosion.src = "./sound & effect/explosionUfo.wav";
  const soundExplosionUfo = () => {
    audioUfoExplosion.play();
  };
  const soundGameOver = new Audio();
  soundGameOver.src = "./sound & effect/gameOverSound.wav";
  const soundEndGame = () => {
    soundGameOver.play();
  };
  const soundGameWin = new Audio();
  soundGameWin.src = "./sound & effect/winner.mp3";
  const soundWinGame = () => {
    soundGameWin.play();
  };
  const btnEffect = new Audio();
  btnEffect.src = "./sound & effect/hitButtonEffect.wav";
  const clickEffect = () => {
    btnEffect.play();
  };
  const audioReadyGo = new Audio();
  audioReadyGo.src = "./sound & effect/readyGo.mp3";
  const soundReadyGo = () => {
    audioReadyGo.play();
  };

  // loger winner
  const winnerLog = () => {
    information.textContent = "Well done !";
  };
  const loserLog = () => {
    information.textContent = "No chance !";
  };
  const restartLog = () => {
    information.textContent = "Go";
  };
  const empltyLog = () => {
    information.textContent = "";
  };
  const readyLog = () => {
    information.textContent = "Ready!";
  };
};
