// Partículas de fondo
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");
let particlesArray=[];
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

class Particle{
  constructor(){
    this.x=Math.random()*canvas.width;
    this.y=Math.random()*canvas.height;
    this.size=Math.random()*3+0.8;
    this.speedX=Math.random()*1.2-0.6;
    this.speedY=Math.random()*1.2-0.6;
    this.alpha=0.45+Math.random()*0.35;
  }
  update(){
    this.x+=this.speedX;
    this.y+=this.speedY;
    if(this.x<0||this.x>canvas.width)this.speedX*=-1;
    if(this.y<0||this.y>canvas.height)this.speedY*=-1;
  }
  draw(){
    ctx.fillStyle=`rgba(255,255,255,${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}

function init(){particlesArray=[];for(let i=0;i<70;i++)particlesArray.push(new Particle());}
function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);particlesArray.forEach(p=>{p.update();p.draw();});requestAnimationFrame(animate);}
init();animate();
window.addEventListener("resize",()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;init();});

// Navegación mosaicos -> secciones
const cards=document.querySelectorAll(".materia-card");
const sections=document.querySelectorAll(".materia-seccion");
cards.forEach(card=>{
  card.addEventListener("click",()=>{
    const target=card.getAttribute("data-target");
    sections.forEach(s=>s.classList.remove("active"));
    const dest=document.getElementById(target);
    if(dest){dest.classList.add("active");dest.scrollIntoView({behavior:"smooth",block:"start"});}
  });
});

// Centrar línea del tiempo automáticamente
function centerTimeline(){
  const container=document.querySelector(".timeline-container");
  const timeline=document.querySelector(".timeline");
  if(container && timeline){
    const containerWidth=container.offsetWidth;
    const timelineWidth=timeline.scrollWidth;
    if(timelineWidth<containerWidth){timeline.style.justifyContent="center";}
    else{timeline.style.justifyContent="flex-start";}
  }
}
window.addEventListener("load",centerTimeline);
window.addEventListener("resize",centerTimeline);
