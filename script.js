
  // Playhead + timecode tied to scroll position
  const trackFill = document.getElementById('trackFill');
  const playhead = document.getElementById('playhead');
  const timecode = document.getElementById('timecode');

  function toTimecode(pct){
    const totalFrames = Math.floor(pct * 30 * 60 * 4); // fake 4-min "runtime" at 30fps
    const fps = 30;
    const totalSeconds = Math.floor(totalFrames / fps);
    const h = String(Math.floor(totalSeconds/3600)).padStart(2,'0');
    const m = String(Math.floor((totalSeconds%3600)/60)).padStart(2,'0');
    const s = String(totalSeconds%60).padStart(2,'0');
    const f = String(totalFrames%fps).padStart(2,'0');
    return `${h}:${m}:${s}:${f}`;
  }

  function updateScrub(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
    trackFill.style.width = (pct*100) + '%';
    playhead.style.left = (pct*100) + '%';
    timecode.textContent = toTimecode(pct);
  }
  document.addEventListener('scroll', updateScrub, { passive:true });
  updateScrub();

  // Filter buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('#videoGrid .card');
  filterBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filterBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(card=>{
        card.style.display = (f==='all' || card.dataset.cat===f) ? '' : 'none';
      });
    });
  });


