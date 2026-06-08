async function load(){
    const res = await fetch('channels.json');
    const channels = await res.json();
    const wrap = document.getElementById('channels');
    const video = document.getElementById('video');
    const title = document.getElementById('title');
    let currentIndex = 0;

    function play(index) {
        currentIndex = index;
        const ch = channels[index];
        title.textContent = ch.name;
        if(Hls.isSupported()){
            const hls = new Hls();
            hls.loadSource(ch.url);
            hls.attachMedia(video);
        } else {
            video.src = ch.url;
        }
    }

    channels.forEach((ch, i) => {
        const d = document.createElement('div');
        d.className = 'card';
        d.innerHTML = `<img src="${ch.logo}"><div><b>${ch.name}</b><br>${ch.category}</div>`;
        d.onclick = () => play(i);
        wrap.appendChild(d);
    });

    document.getElementById('prevBtn').onclick = () => {
        if(currentIndex > 0) play(currentIndex - 1);
    };
    document.getElementById('nextBtn').onclick = () => {
        if(currentIndex < channels.length - 1) play(currentIndex + 1);
    };

    document.getElementById('search').oninput = e => {
        const q = e.target.value.toLowerCase();
        [...wrap.children].forEach((c, i) => {
            c.style.display = channels[i].name.toLowerCase().includes(q) ? 'flex' : 'none';
        });
    };

    if(channels.length) play(0);
}
load();
