// Tabs
document.querySelectorAll('.tabs .tab').forEach(btn=>{
  btn.addEventListener('click', ()=> {
    document.querySelectorAll('.tabs .tab').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.dataset.tab;
    document.querySelectorAll('.tab-content').forEach(sec=>sec.classList.remove('active'));
    document.getElementById(target).classList.add('active');
  });
});

/* Leaf-like subtle particles implemented by creating small divs with CSS animation */
const leafContainer = document.getElementById('leaf-particles');
const LEAF_COUNT = 22;

function makeLeaf(){
  const el = document.createElement('div');
  el.className = 'leaf';
  const size = 6 + Math.random()*18;
  el.style.width = `${size}px`;
  el.style.height = `${size*0.6}px`;
  el.style.left = `${Math.random()*100}%`;
  el.style.top = `${-20 - Math.random()*40}px`;
  el.style.opacity = 0.15 + Math.random()*0.6;
  el.style.transform = `rotate(${Math.random()*360}deg)`;
  leafContainer.appendChild(el);

  // remove after animation (~duration)
  setTimeout(()=> el.remove(), 9000 + Math.random()*8000);
}

setInterval(makeLeaf, 600);

// simple css injection for leaves so file is self-contained
const sheet = document.createElement('style');
sheet.innerHTML = `
#leaf-particles .leaf{
  position:fixed;
  background: linear-gradient(90deg, rgba(33,89,64,0.18), rgba(33,89,64,0.06));
  border-radius: 50%/40%;
  filter: blur(0.2px);
  animation: floatLeaf linear forwards;
  z-index:0;
}
@keyframes floatLeaf{
  0%{transform: translateY(0) rotate(0deg); opacity:0}
  10%{opacity:1}
  100%{transform: translateY(110vh) rotate(360deg); opacity:0}
}
`;
document.head.appendChild(sheet);
