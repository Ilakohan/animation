// GSAP
const tline = gsap.timeline({
  defaults: { stagger: { each: 0.2, from: "center", delay: 1 } },
});

tline
  .from(".card-one", {
    scrollTrigger: {
      trigger: ".gsap-container",
      start: "top 90%",
      end: "center 40%",
      // markers: true,
      scrub: 1,
    },
    scale: 0,
    duration: 3,
  })
  .from(".card-two", {
    scrollTrigger: {
      trigger: ".gsap-container",
      start: "top 70%",
      end: "center 65%",
      // markers: true,
      scrub: 1,
    },
    rotation: 360,
    x: 150,
    y: 500,
    scale: 0.5,
    duration: 1,
  })

  .from(".card-three", {
    scrollTrigger: {
      trigger: ".gsap-container",
      start: "top 70%",
      end: "center 65%",
      // markers: true,
      scrub: 1,
    },
    rotation: 10,
    x: 500,
    y: 100,
    scale: 0.5,
    duration: 1,
  });

// canvas
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.hight = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("click", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 10; i++) {
    particlesArray.push(new Particle());
  }
});

canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle());
  }
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;
    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = "hsl(" + hue + ", 100%, 50%)";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      console.log(particlesArray.length);
      i--;
    }
  }
}

function animate() {
  //line that change to drawing
  // ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(0,0,0,0.02)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue += 5;
  requestAnimationFrame(animate);
}

animate();
