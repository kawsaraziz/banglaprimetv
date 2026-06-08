async function load(){
 const res=await fetch('channels.json');
 const channels=await res.json();
 const wrap=document.getElementById('channels');
 const video=document.getElementById('video');
 const title=document.getElementById('title');

 function play(ch){
   title.textContent=ch.name;
   if(Hls.isSupported()){
      const hls=new Hls();
      hls.loadSource(ch.url);
      hls.attachMedia(video);
   }else{
      video.src=ch.url;
   }
 }
 channels.forEach(ch=>{
   const d=document.createElement('div');
   d.className='card';
   d.innerHTML=`<img src="${ch.logo}"><div><b>${ch.name}</b><br>${ch.category}</div>`;
   d.onclick=()=>play(ch);
   wrap.appendChild(d);
 });
 if(channels.length) play(channels[0]);

 document.getElementById('search').oninput=e=>{
   const q=e.target.value.toLowerCase();
   [...wrap.children].forEach((c,i)=>{
      c.style.display=channels[i].name.toLowerCase().includes(q)?'flex':'none';
   });
 };
}
load();
