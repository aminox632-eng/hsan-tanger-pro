/* ===== CONFIG : modifiez ici prix, contact et adresse ===== */
const CONFIG={phone:'+212 5 22 00 00 00',whatsapp:'212600000000',email:'contact@hilaq.ma',address:'12 Boulevard Zerktouni, Casablanca, Maroc',instagram:'https://instagram.com/',facebook:'https://facebook.com/'};
const SERVICES=[
{id:'classique',icon:'fa-scissors',name:'Coupe classique',desc:'Coupe aux ciseaux et à la tondeuse, finitions soignées.',price:70},
{id:'coupe-barbe',icon:'fa-user-tie',name:'Coupe + barbe',desc:'Le duo complet, avec serviette chaude et finitions.',price:100},
{id:'barbe',icon:'fa-face-grin-beam',name:'Taille de barbe',desc:'Dessin des contours, taille et soin à l’huile.',price:50},
{id:'fade',icon:'fa-bars-staggered',name:'Dégradé / Fade',desc:'Dégradé net, du low au high fade.',price:80},
{id:'enfant',icon:'fa-child',name:'Coupe enfant',desc:'Pour les moins de 12 ans, dans une ambiance détendue.',price:50},
{id:'coloration',icon:'fa-palette',name:'Coloration',desc:'Couleur, patine ou camouflage des cheveux blancs.',price:120},
{id:'soin',icon:'fa-droplet',name:'Soin capillaire',desc:'Soin hydratant et massage du cuir chevelu.',price:90},
{id:'styling',icon:'fa-wand-magic-sparkles',name:'Styling',desc:'Coiffage pour un événement, avec produits premium.',price:40}];
const TEAM=[{n:'Yassine',r:'Barber Senior',i:'t1'},{n:'Adam',r:'Expert Fade',i:'t2'},{n:'Hamza',r:'Spécialiste Barbe',i:'t3'}];
const GALLERY=[['g1','coupes','Coupe moderne'],['g2','barbes','Barbe taillée'],['g3','salon','Intérieur du salon'],['g4','salon','Barber au travail'],['g5','coupes','Fade net'],['g6','avant-après','Avant / après'],['g7','barbes','Contours de barbe'],['g8','salon','Espace d’attente']];
const REVIEWS=[['Excellent service, coupe très propre et équipe professionnelle.','Karim B.'],['Très bonne ambiance et résultat impeccable.','Omar L.'],['Un des meilleurs salons que j’ai testés.','Reda M.']];
/* ========================================================== */
const $=(s,e=document)=>e.querySelector(s),$$=(s,e=document)=>[...e.querySelectorAll(s)];
const page=location.pathname.split('/').pop()||'index.html';
function toast(m,t=''){const d=document.createElement('div');d.className='toast '+t;d.textContent=m;$('#toasts').append(d);setTimeout(()=>d.remove(),4000)}
/* Header / footer */
const links=[['index.html','Accueil'],['services.html','Services'],['index.html#about','À propos'],['index.html#gallery','Galerie'],['booking.html','Réservation'],['contact.html','Contact']];
$('#site-header').innerHTML=`<div class="container nav"><a href="index.html" class="logo">HILAQ</a><button class="burger" aria-label="Menu" aria-expanded="false"><i class="fa-solid fa-bars"></i></button><ul class="menu">${links.map(([h,t])=>`<li><a href="${h}" class="${h===page?'active':''}">${t}</a></li>`).join('')}<li><a class="btn sm" href="booking.html">Prendre rendez-vous</a></li></ul></div>`;
$('#site-footer').innerHTML=`<div class="container"><div class="fgrid"><div><div class="logo">HILAQ</div><p>L’art de la coupe, depuis 2020.</p></div><div><h4>Horaires</h4><p>Lun – Sam : 09:00 – 20:00<br>Dimanche : fermé</p></div><div><h4>Contact</h4><p>${CONFIG.address}<br>${CONFIG.phone}</p><div class="social" style="justify-content:flex-start"><a href="https://wa.me/${CONFIG.whatsapp}" aria-label="WhatsApp"><i class="fa-brands fa-whatsapp"></i></a><a href="${CONFIG.instagram}" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a><a href="${CONFIG.facebook}" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a></div></div></div><p class="copy">© ${new Date().getFullYear()} HILAQ. Projet portfolio.</p></div>`;
const hd=$('header'),menu=$('.menu'),bg=$('.burger');
bg.onclick=()=>{const o=menu.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.firstChild.className=o?'fa-solid fa-xmark':'fa-solid fa-bars'};
menu.onclick=e=>{if(e.target.closest('a')){menu.classList.remove('open');bg.firstChild.className='fa-solid fa-bars'}};
const topBtn=$('#top');topBtn.onclick=()=>scrollTo({top:0,behavior:'smooth'});
const onScroll=()=>{hd.classList.toggle('scrolled',scrollY>40);topBtn.classList.toggle('show',scrollY>500)};addEventListener('scroll',onScroll,{passive:true});onScroll();
/* Rendu des données */
const svcCard=s=>`<article class="card reveal"><i class="fa-solid ${s.icon} ico"></i><h3>${s.name}</h3><p>${s.desc}</p><div class="price-row"><strong>${s.price} DH</strong><a class="btn sm" href="booking.html?service=${s.id}">Réserver</a></div></article>`;
$$('[data-services]').forEach(e=>e.innerHTML=SERVICES.slice(0,+e.dataset.services||99).map(svcCard).join(''));
$$('[data-team]').forEach(e=>e.innerHTML=TEAM.map(t=>`<article class="card reveal"><img src="images/${t.i}.svg" alt="${t.n}, ${t.r}" loading="lazy"><div class="info"><h3>${t.n}</h3><span>${t.r}</span><div class="social"><a href="${CONFIG.instagram}" aria-label="Instagram ${t.n}"><i class="fa-brands fa-instagram"></i></a><a href="${CONFIG.facebook}" aria-label="Facebook ${t.n}"><i class="fa-brands fa-facebook-f"></i></a></div></div></article>`).join(''));
const gal=$('#gallery-grid');
if(gal){gal.innerHTML=GALLERY.map(([f,c,a])=>`<button class="g-item reveal" data-cat="${c}" aria-label="Agrandir : ${a}"><img src="images/${f}.svg" alt="${a}" loading="lazy"></button>`).join('');
 $('.filters').onclick=e=>{const b=e.target.closest('button');if(!b)return;$$('.filters button').forEach(x=>x.classList.toggle('on',x===b));$$('.g-item').forEach(g=>g.classList.toggle('hide',b.dataset.f!=='all'&&g.dataset.cat!==b.dataset.f))};
 const lb=$('#lb'),im=$('img',lb);let cur=0;const vis=()=>$$('.g-item:not(.hide)');
 const show=i=>{const v=vis();cur=(i+v.length)%v.length;const s=$('img',v[cur]);im.src=s.src;im.alt=s.alt};
 gal.onclick=e=>{const g=e.target.closest('.g-item');if(g){lb.classList.add('open');show(vis().indexOf(g))}};
 lb.onclick=e=>{if(e.target===lb||e.target.closest('.x'))lb.classList.remove('open');if(e.target.closest('.p'))show(cur-1);if(e.target.closest('.n'))show(cur+1)};
 addEventListener('keydown',e=>{if(!lb.classList.contains('open'))return;if(e.key==='Escape')lb.classList.remove('open');if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)})}
/* Slider témoignages */
const tr=$('.track');
if(tr){tr.innerHTML=REVIEWS.map(([q,n])=>`<div class="slide"><div class="stars" aria-label="5 étoiles">★★★★★</div><q>${q}</q><small>${n}</small></div>`).join('');
 const dots=$('.dots');dots.innerHTML=REVIEWS.map((_,i)=>`<button aria-label="Avis ${i+1}"></button>`).join('');let k=0,t;
 const go=i=>{k=(i+REVIEWS.length)%REVIEWS.length;tr.style.transform=`translateX(-${k*100}%)`;$$('button',dots).forEach((b,j)=>b.classList.toggle('on',j===k))};
 const auto=()=>{clearInterval(t);t=setInterval(()=>go(k+1),5000)};
 dots.onclick=e=>{const i=$$('button',dots).indexOf(e.target.closest('button'));if(i>-1){go(i);auto()}};
 let x0;tr.ontouchstart=e=>x0=e.touches[0].clientX;tr.ontouchend=e=>{const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50){go(k+(d<0?1:-1));auto()}};go(0);auto()}
/* Animations au scroll + compteurs */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');io.unobserve(e.target)}),{threshold:.15});
$$('.reveal').forEach(e=>io.observe(e));
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);const el=e.target,end=+el.dataset.n,t0=performance.now();
 (function f(t){const p=Math.min((t-t0)/1500,1);el.textContent=Math.round(end*p);if(p<1)requestAnimationFrame(f)})(t0)}));
$$('[data-n]').forEach(e=>cio.observe(e));
/* Validation */
const rules={req:v=>v.trim()!==''||'Ce champ est obligatoire.',name:v=>v.trim().length>=3||'Entrez votre nom complet.',
phone:v=>/^(\+212|0)[5-7]\d{8}$/.test(v.replace(/[\s.-]/g,''))||'Numéro invalide (ex. 06 12 34 56 78).',
email:v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)||'Adresse email invalide.',
date:v=>{if(!v)return'Choisissez une date.';const d=new Date(v+'T00:00'),n=new Date();n.setHours(0,0,0,0);return d<n?'La date doit être aujourd’hui ou plus tard.':d.getDay()===0?'Le salon est fermé le dimanche.':true}};
function validate(f){let ok=true;$$('[data-rule]',f).forEach(i=>{const r=rules[i.dataset.rule](i.value),e=i.parentNode.querySelector('.err');i.classList.toggle('bad',r!==true);e.textContent=r===true?'':r;if(r!==true)ok=false});if(!ok)$('.bad',f)?.focus();return ok}
$$('form').forEach(f=>f.addEventListener('input',e=>{if(e.target.classList.contains('bad'))validate(f)}));
/* Réservation (stockée dans localStorage) */
const bf=$('#booking-form');
if(bf){const sv=$('[name=service]'),ba=$('[name=barber]'),dt=$('[name=date]'),tm=$('[name=time]'),db=()=>JSON.parse(localStorage.getItem('hilaq_bookings')||'[]');
 sv.innerHTML='<option value="">Choisir un service</option>'+SERVICES.map(s=>`<option value="${s.id}">${s.name} — ${s.price} DH</option>`).join('');
 ba.innerHTML='<option>Peu importe</option>'+TEAM.map(t=>`<option>${t.n}</option>`).join('');
 const q=new URLSearchParams(location.search).get('service');if(q)sv.value=q;
 dt.min=new Date().toISOString().slice(0,10);
 const slots=()=>{const taken=db().filter(b=>b.date===dt.value&&b.barber===ba.value).map(b=>b.time);let o='<option value="">Choisir une heure</option>';for(let h=9;h<20;h++)for(const m of['00','30']){const s=`${String(h).padStart(2,'0')}:${m}`;o+=`<option ${taken.includes(s)?'disabled':''}>${s}</option>`}tm.innerHTML=o};
 slots();dt.onchange=ba.onchange=slots;
 bf.onsubmit=e=>{e.preventDefault();if(!validate(bf))return toast('Merci de corriger les champs en rouge.','error');
  const d=Object.fromEntries(new FormData(bf));d.ref='HLQ-'+Date.now().toString(36).toUpperCase().slice(-5);const all=db();all.push(d);localStorage.setItem('hilaq_bookings',JSON.stringify(all));
  const s=SERVICES.find(x=>x.id===d.service);$('#ok-text').textContent=`${d.name}, votre rendez-vous « ${s.name} » est enregistré le ${new Date(d.date+'T00:00').toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})} à ${d.time} avec ${d.barber}. Référence : ${d.ref}.`;
  bf.hidden=true;$('.ok').classList.add('show');toast('Réservation confirmée !')}}
/* Contact */
const cf=$('#contact-form');
if(cf){cf.onsubmit=e=>{e.preventDefault();if(!validate(cf))return toast('Merci de corriger les champs en rouge.','error');cf.reset();toast('Message envoyé. Nous vous répondons rapidement.')};
 $$('[data-c]').forEach(e=>e.textContent=CONFIG[e.dataset.c]);$('#map').src='https://www.google.com/maps?q='+encodeURIComponent(CONFIG.address)+'&output=embed';
 $('#wa').href='https://wa.me/'+CONFIG.whatsapp;$('#ig').href=CONFIG.instagram;$('#fb').href=CONFIG.facebook}
