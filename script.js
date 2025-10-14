/* Tabs */
document.querySelectorAll('.menu-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.menu-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const target=btn.dataset.target;
    document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
    document.getElementById(target).classList.add('active');
    window.scrollTo({top:0,behavior:'smooth'});
  });
});

/* Particles */
const canvas=document.getElementById('tech-particles');
const ctx=canvas.getContext('2d');
let W=canvas.width=innerWidth;
let H=canvas.height=innerHeight;
const N=Math.floor((W*H)/90000);
const pts=[];
function rand(min,max){return min+Math.random()*(max-min);}
for(let i=0;i<N;i++){pts.push({x:Math.random()*W,y:Math.random()*H*0.7,vx:rand(-0.25,0.25),vy:rand(-0.12,0.12),r:rand(0.6,1.6)});}
addEventListener('resize',()=>{W=canvas.width=innerWidth;H=canvas.height=innerHeight;});
let mouse={x:-9999,y:-9999};
addEventListener('mousemove',(e)=>{mouse.x=e.clientX;mouse.y=e.clientY;});
addEventListener('mouseout',()=>{mouse.x=-9999;mouse.y=-9999;});
function draw(){
  ctx.clearRect(0,0,W,H);
  for(let i=0;i<pts.length;i++){
    let p=pts[i];
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<-20)p.x=W+20;
    if(p.x>W+20)p.x=-20;
    if(p.y<-20)p.y=H*0.7+20;
    if(p.y>H*0.7+20)p.y=-20;
    let dx=mouse.x-p.x,dy=mouse.y-p.y,d=Math.sqrt(dx*dx+dy*dy);
    if(d<160){p.x+=dx*0.002;p.y+=dy*0.002;}
    ctx.beginPath();
    ctx.fillStyle='rgba(155,123,255,0.12)';
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  }
  for(let i=0;i<pts.length;i++){
    for(let j=i+1;j<pts.length;j++){
      let a=pts[i],b=pts[j],dx=a.x-b.x,dy=a.y-b.y,dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<120){
        ctx.beginPath();
        ctx.strokeStyle=`rgba(110,168,255,${1-dist/120})`;
        ctx.lineWidth=1*(1-dist/120);
        ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();

// Timeline animation
function revealTimeline(){
  document.querySelectorAll('.timeline-item').forEach(item=>{
    const rect=item.getBoundingClientRect();
    if(rect.top < window.innerHeight*0.9){item.classList.add('visible');}
  });
}
window.addEventListener('scroll',revealTimeline);
window.addEventListener('load',revealTimeline);
