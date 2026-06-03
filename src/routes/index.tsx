import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export const Route = createFileRoute('/')({
  component: WeddingInvitation,
})

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const diff = targetDate.getTime() - now.getTime()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  return timeLeft
}

function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const weddingDate = new Date('2026-06-13T19:00:00+03:00');
  const countdown = useCountdown(weddingDate);
  const pad = (n: number) => String(n).padStart(2, '0');

useEffect(() => {
  // نضيف mirror: true لكي تختفي العناصر عند الرجوع للأعلى، و once: false ليظهر السكشن دائماً عند السكرول
  AOS.init({ 
    duration: 1000, 
    once: false, 
    mirror: true 
  });
}, []);

  useEffect(() => {
  if (opened) {
    // تحديث AOS بعد فتح الظرف ليتعرف على العناصر الموجودة داخل الـ DOM
    setTimeout(() => {
      AOS.refresh();
    }, 500);
  }
}, [opened]);
  const handleOpen = () => {
    if (animating || opened) return;
    setAnimating(true);

    setTimeout(() => {
      setOpened(true);
      setAnimating(false);
      if (audioRef.current) {
        audioRef.current.play().catch(console.error);
      }
      setTimeout(() => setIsVisible(true), 100);
    }, 1500);
  };

  return (
    <div className="wedding-root">
      <audio ref={audioRef} src="/wedding-music.mp3" loop preload="auto" />
      <style>{css}</style>

      {!opened && (
        <div
          className={`envelope-scene ${animating ? 'opening' : ''}`}
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
          aria-label="Open wedding invitation"
        >
          <div className="env-photo-bg" />
          <div className="env-overlay" />
          <div className="env-photo-corners">
            <div className="epc epc-tl" />
            <div className="epc epc-tr" />
            <div className="epc epc-bl" />
            <div className="epc epc-br" />
          </div>
          <div className="env-photo-content">
            <p className="env-you">You are cordially invited</p>
            <div className="env-monogram">B · A</div>
            <div className="env-divider"><span>✦</span></div>
            <div className="env-tap-area">
              <div className="env-tap-ring" />
              <div className="env-tap-ring env-tap-ring-2" />
              <div className="env-tap-icon">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
                  <path d="M20 4C20 4 12 12 12 20C12 24.4183 15.5817 28 20 28C24.4183 28 28 24.4183 28 20C28 12 20 4 20 4Z" fill="rgba(201,168,76,0.15)" stroke="#c9a84c" strokeWidth="1.5"/>
                  <circle cx="20" cy="20" r="3.5" fill="#c9a84c"/>
                  <circle cx="20" cy="32" r="2" fill="#c9a84c" opacity="0.5"/>
                </svg>
              </div>
              <p className="env-tap-hint">{animating ? 'Opening…' : 'Tap to open'}</p>
            </div>
          </div>
        </div>
      )}

      {opened && (
        <div className={`invitation-page ${animating ? "opening" : ""}`}>
          <div className="rose-petals">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className={`petal p${i}`}>❀</span>
            ))}
          </div>

          <div className="gold-particles">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} className={`particle p${i}`} />
            ))}
          </div>
          
          <div className="page-corners">
            <div className="pc pc-tl" />
            <div className="pc pc-tr" />
            <div className="pc pc-bl" />
            <div className="pc pc-br" />
          </div>

          <div className={`inv-inner ${isVisible ? 'is-visible' : ''}`}>
            <p className="ayah" data-aos="fade-down" dir="rtl" lang="ar">
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
            </p>
            <div className="divider" data-aos="zoom-in"><span>✦</span></div>
            <p className="cordially-text" data-aos="fade-up">You are cordially invited</p>
            <p className="together-text">
              Together with their families, they request the honour of<br />
              your presence at the marriage celebration of
            </p>
            <h1 className="couple-names" data-aos="fade-up">Bassem & Anoud</h1>
            <div className="photo-section" data-aos="zoom-in">
              <div className="photo-outer-ring" />
              <div className="photo-outer-ring photo-outer-ring-2" />
              <div className="photo-shimmer-ring" />
              <div className="photo-frame">
                <img src="/couple2.jpg" alt="Bassem and Anoud" />
                <div className="photo-shine" />
              </div>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`photo-spark photo-spark-${i}`} />
              ))}
            </div>
            <div className="divider" data-aos="zoom-in"><span>✦</span></div>
            <div className="date-section" data-aos="fade-up">
              <span className="day-name">Saturday</span>
              <span className="day-number">13</span>
              <span className="month-year">June · 2026</span>
              <span className="time-text">7:00 in the evening</span>
            </div>
            <div className="divider" data-aos="zoom-in"><span>✦</span></div>
            <div className="countdown" data-aos="fade-up">
              {[
                { label: 'Days', value: countdown.days },
                { label: 'Hours', value: countdown.hours },
                { label: 'Minutes', value: countdown.minutes },
                { label: 'Seconds', value: countdown.seconds },
              ].map(({ label, value }) => (
                <div key={label} className="count-unit">
                  <span className="count-num">{pad(value)}</span>
                  <span className="count-lbl">{label}</span>
                </div>
              ))}
            </div>
  <section className="s-whenwhere" data-aos="fade-up">
            <div className="divider" data-aos="zoom-in"><span>✦</span></div>
  <div className="ww-title">When & Where</div>

  <div className="ww-card-grid">
    {/* الكارد الأول يأتي من اليسار */}
    <div className="ww-card" data-aos="fade-right" data-aos-duration="1000">
      <span className="ww-card-icon">🏛️</span>
      <span className="ww-card-label">Venue</span>
      <span className="ww-card-main">Opera Hall</span>
      <span className="ww-card-sub">Sheraton El-Matar, Cairo</span>
    </div>
    
    {/* الكارد الثاني يأتي من اليمين */}
    <div className="ww-card" data-aos="fade-left" data-aos-duration="1000">
      <span className="ww-card-icon">✨</span>
      <span className="ww-card-label">Dress Code</span>
      <span className="ww-card-main">Smart Casual</span>
      <span className="ww-card-sub">Wear what makes you feel beautiful</span>
    </div>
  </div>
</section>
            <div className="divider" data-aos="zoom-in"><span>✦</span></div>
            
            <div className="location-container" data-aos="fade-up">
              <h3 className="location-title">Wedding Venue</h3>
              <div className="map-wrapper">
                <div className="map-frame">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.1712759040556!2d31.392008399999998!3d30.1179121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145816f88d84668d%3A0x33544e7d220e542b!2sOpera%20Hall!5e0!3m2!1sar!2seg!4v1780514412105!5m2!1sar!2seg"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
              <p className="location-hint">Tap the map to open in Google Maps</p>
            </div>

            <div className="divider" data-aos="zoom-in"><span>✦</span></div>
            <p className="footer-monogram">B · A</p>
            <p className="footer-tagline" data-aos="fade-up">Forever begins tonight</p>
          </div>
        </div>
      )}
      <footer className="inv-footer">
            <div className="inv-footer-text">
                Create a similar digital invitation for your wedding ✨
                <a href="https://wa.me/0201144064313" target="_blank">WhatsApp: 01144064313</a>
            </div>
        </footer>
    </div>
    
  );
}
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Montserrat:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --royal: #760031;
    --royal-deep: #3d0019;
    --royal-mid: #5c0028;
    --gold: #c9a84c;
    --gold-lt: #e8d07a;
    --gold-pale: #f5e8b0;
    --cream: #fdf6e3;
    --ink: #1a0009;
  }

  body { overflow-x: hidden; }

  .wedding-root {
    min-height: 100vh;
    background: var(--royal-deep);
    font-family: 'Montserrat', sans-serif;
  }

  /* ===========================
     PHOTO ENVELOPE SCENE
  =========================== */
  .envelope-scene {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    overflow: hidden;
  }

  .env-photo-bg {
    position: absolute;
    inset: 0;
    background-image: url('/envelope-photo.jpg');
    background-size: cover;
    background-position: center top;
    transition: transform 1.3s cubic-bezier(.34,1.26,.64,1), opacity 1.3s ease;
  }

  .opening .env-photo-bg {
    transform: scale(1.08);
    opacity: 0;
  }

  .env-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(61,0,25,.55) 0%,
      rgba(61,0,25,.3) 40%,
      rgba(61,0,25,.55) 80%,
      rgba(61,0,25,.75) 100%
    );
    transition: opacity 1.3s ease;
  }

  .opening .env-overlay { opacity: 0; }

  /* Corner decorations on photo scene */
  .env-photo-corners {
    position: absolute;
    inset: 20px;
    pointer-events: none;
  }

  .epc {
    position: absolute;
    width: 60px;
    height: 60px;
  }
  .epc::before, .epc::after {
    content: '';
    position: absolute;
    background: var(--gold);
    opacity: .7;
  }
  .epc-tl { top: 0; left: 0; }
  .epc-tl::before { width: 2px; height: 60px; top: 0; left: 0; }
  .epc-tl::after  { width: 60px; height: 2px; top: 0; left: 0; }
  .epc-tr { top: 0; right: 0; }
  .epc-tr::before { width: 2px; height: 60px; top: 0; right: 0; }
  .epc-tr::after  { width: 60px; height: 2px; top: 0; right: 0; }
  .epc-bl { bottom: 0; left: 0; }
  .epc-bl::before { width: 2px; height: 60px; bottom: 0; left: 0; }
  .epc-bl::after  { width: 60px; height: 2px; bottom: 0; left: 0; }
  .epc-br { bottom: 0; right: 0; }
  .epc-br::before { width: 2px; height: 60px; bottom: 0; right: 0; }
  .epc-br::after  { width: 60px; height: 2px; bottom: 0; right: 0; }

  /* Photo scene content */
  .env-photo-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: center;
    padding: 40px 32px;
    transition: opacity 1s ease;
  }

  .opening .env-photo-content { opacity: 0; }

  .env-you {
    font-family: 'Great Vibes', cursive;
    font-size: clamp(1.8rem, 5.5vw, 2.8rem);
    color: var(--gold-pale);
    text-shadow: 0 2px 20px rgba(0,0,0,.6);
    line-height: 1.2;
  }

  .env-monogram {
    font-family: 'Great Vibes', cursive;
    font-size: clamp(5rem, 16vw, 9rem);
    color: var(--gold);
    text-shadow:
      0 0 60px rgba(201,168,76,.5),
      0 4px 30px rgba(0,0,0,.5);
    line-height: 1;
    animation: monogramGlow 3s ease-in-out infinite;
  }

  @keyframes monogramGlow {
    0%, 100% { text-shadow: 0 0 60px rgba(201,168,76,.5), 0 4px 30px rgba(0,0,0,.5); }
    50%       { text-shadow: 0 0 90px rgba(201,168,76,.85), 0 0 60px rgba(201,168,76,.4), 0 4px 30px rgba(0,0,0,.5); }
  }

  .env-divider {
    width: 200px;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--gold) 40%, var(--gold) 60%, transparent);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .env-divider span {
    position: absolute;
    color: var(--gold-lt);
    font-size: .7rem;
    background: transparent;
    padding: 0 8px;
    text-shadow: 0 0 12px rgba(201,168,76,.5);
  }

  /* Tap area with pulsing rings */
  .env-tap-area {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding-top: 16px;
  }

  .env-tap-ring {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: 2px solid rgba(201,168,76,.6);
    animation: tapRingPulse 2s ease-out infinite;
  }

  .env-tap-ring-2 {
    animation-delay: 1s;
  }

  @keyframes tapRingPulse {
    0%   { transform: translateX(-50%) scale(1);   opacity: .7; }
    100% { transform: translateX(-50%) scale(2.6); opacity: 0; }
  }

  .env-tap-icon {
    position: relative;
    z-index: 1;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(61,0,25,.6);
    border: 2px solid rgba(201,168,76,.7);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: tapIconBounce 2.2s ease-in-out infinite;
    backdrop-filter: blur(4px);
  }

  @keyframes tapIconBounce {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-6px); }
  }

  .env-tap-hint {
    font-family: 'Montserrat', sans-serif;
    font-size: .72rem;
    letter-spacing: .28em;
    text-transform: uppercase;
    color: var(--gold-pale);
    text-shadow: 0 2px 8px rgba(0,0,0,.5);
    animation: pulseOpacity 2.2s ease-in-out infinite;
  }

  @keyframes pulseOpacity {
    0%, 100% { opacity: .5; }
    50%       { opacity: 1; }
  }

  /* ===========================
     INVITATION PAGE
  =========================== */
  .invitation-page {
    min-height: 100vh;
    background:
      radial-gradient(ellipse at 25% 15%, #8b003a 0%, transparent 55%),
      radial-gradient(ellipse at 80% 80%, #5c0028 0%, transparent 55%),
      var(--royal-deep);
    position: relative;
    overflow-x: hidden;
    animation: pageReveal .9s ease forwards;
  }

  @keyframes pageReveal {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Gold lattice overlay */
  .invitation-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      repeating-linear-gradient(0deg,   rgba(201,168,76,.045) 0, rgba(201,168,76,.045) 1px, transparent 1px, transparent 48px),
      repeating-linear-gradient(90deg,  rgba(201,168,76,.045) 0, rgba(201,168,76,.045) 1px, transparent 1px, transparent 48px);
    pointer-events: none;
    z-index: 0;
  }

  /* Floating gold particles */
  .particle {
    position: fixed;
    border-radius: 50%;
    background: var(--gold-lt);
    pointer-events: none;
    z-index: 1;
    opacity: 0;
  }
  ${Array.from({length:20},(_,i)=>`
  .p${i} {
    width: ${2+(i%3)}px;
    height: ${2+(i%3)}px;
    left: ${(i*4.8+3)}%;
    bottom: -8px;
    animation: particleFloat ${7+(i%5)}s ease-in-out ${i*.38}s infinite;
  }`).join('')}

  @keyframes particleFloat {
    0%   { opacity:0; transform:translateY(0) translateX(0); }
    8%   { opacity:.75; }
    92%  { opacity:.3; }
    100% { opacity:0; transform:translateY(-100vh) translateX(${Math.sin(1)*18}px); }
  }

  /* Page corner lines */
  .page-corners { position: fixed; inset: 0; pointer-events: none; z-index: 2; }
  .pc { position: absolute; }
  .pc::before, .pc::after {
    content: '';
    position: absolute;
    background: var(--gold);
    opacity: .55;
  }
  .pc-tl { top: 22px; left: 22px; }
  .pc-tl::before { width: 2px; height: 80px; top:0; left:0; }
  .pc-tl::after  { width: 80px; height: 2px; top:0; left:0; }
  .pc-tr { top: 22px; right: 22px; }
  .pc-tr::before { width: 2px; height: 80px; top:0; right:0; }
  .pc-tr::after  { width: 80px; height: 2px; top:0; right:0; }
  .pc-bl { bottom: 22px; left: 22px; }
  .pc-bl::before { width: 2px; height: 80px; bottom:0; left:0; }
  .pc-bl::after  { width: 80px; height: 2px; bottom:0; left:0; }
  .pc-br { bottom: 22px; right: 22px; }
  .pc-br::before { width: 2px; height: 80px; bottom:0; right:0; }
  .pc-br::after  { width: 80px; height: 2px; bottom:0; right:0; }

  /* ===== Main content ===== */
  .inv-inner {
    position: relative;
    z-index: 3;
    max-width: 700px;
    margin: 0 auto;
    padding: 90px 44px 110px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* ==========================
   CINEMATIC LUXURY REVEAL
========================== */
/* هذا هو الكود المسؤول عن تحريك الكلام ليظهر بسلاسة */
.inv-inner > * {

  
}

/* هذا الكلاس يتم إضافته تلقائياً عند الفتح */
.inv-inner.is-visible > * {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0px);
}

/* توزيع التوقيت ليظهر الكلام سطراً تلو الآخر */
.inv-inner > *:nth-child(1) { transition-delay: 0.2s; }
.inv-inner > *:nth-child(2) { transition-delay: 0.4s; }
.inv-inner > *:nth-child(3) { transition-delay: 0.6s; }
.inv-inner > *:nth-child(4) { transition-delay: 0.8s; }
.inv-inner > *:nth-child(5) { transition-delay: 1.0s; }
.inv-inner > *:nth-child(6) { transition-delay: 1.2s; }
.inv-inner > *:nth-child(7) { transition-delay: 1.4s; }
.inv-inner > *:nth-child(8) { transition-delay: 1.6s; }
.inv-inner > *:nth-child(9) { transition-delay: 1.8s; }
.inv-inner > *:nth-child(10) { transition-delay: 2.0s; }
@keyframes royalReveal {

  0%{
    opacity:0;
    transform:
      translateY(120px)
      scale(.92);
    filter:
      blur(16px)
      brightness(1.4);
  }

  55%{
    opacity:1;
    transform:
      translateY(-14px)
      scale(1.03);
    filter:
      blur(0px)
      brightness(1.1);
  }

  75%{
    transform:
      translateY(5px)
      scale(.995);
  }

  100%{
    opacity:1;
    transform:
      translateY(0)
      scale(1);
    filter:
      blur(0)
      brightness(1);
  }
}
  


  .ayah {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(.9rem, 2.3vw, 1.15rem);
    font-weight: 300;
    color: var(--gold-pale);
    line-height: 2.2;
    letter-spacing: .04em;
    opacity: .88;
    max-width: 580px;
    margin-bottom: 0;
  }

  .divider {
    width: 280px;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--gold) 40%, var(--gold) 60%, transparent);
    margin: 30px 0;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .divider span {
    position: absolute;
    color: var(--gold-lt);
    font-size: .75rem;
    background: var(--royal-deep);
    padding: 0 10px;
    text-shadow: 0 0 12px rgba(201,168,76,.5);
  }

  .cordially-text {
    font-family: 'Great Vibes', cursive;
    font-size: clamp(2.6rem, 7.5vw, 4.4rem);
    color: var(--gold-lt);
    text-shadow: 0 0 50px rgba(201,168,76,.4);
    margin-bottom: 16px;
  }

  .together-text {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(.8rem, 2.1vw, 1rem);
    font-weight: 300;
    color: var(--cream);
    letter-spacing: .14em;
    text-transform: uppercase;
    line-height: 2;
    opacity: .8;
    margin-bottom: 0;
  }

  .couple-names {
    font-family: 'Great Vibes', cursive;
    font-size: clamp(4.5rem, 14vw, 8rem);
    color: var(--gold);
    text-shadow:
      0 0 70px rgba(201,168,76,.5),
      0 4px 24px rgba(0,0,0,.4);
    line-height: 1.05;
    margin: 8px 0 0;
  }

  /* ===== Photo with enhanced animations ===== */
  .photo-section {
    position: relative;
    width: min(290px, 70vw);
    height: min(290px, 70vw);
    margin: 28px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .photo-outer-ring {
    position: absolute;
    inset: -14px;
    border-radius: 50%;
    border: 2px solid var(--gold);
    opacity: .5;
    animation: spinSlow 30s linear infinite;
  }

  .photo-outer-ring::before {
    content: '';
    position: absolute;
    inset: 6px;
    border-radius: 50%;
    border: 1px dashed rgba(201,168,76,.4);
  }

  .photo-outer-ring-2 {
    inset: -26px;
    border: 1px solid rgba(201,168,76,.25);
    animation: spinSlow 22s linear infinite reverse;
    opacity: .35;
  }

  .photo-outer-ring-2::before {
    border: 1px dashed rgba(201,168,76,.15);
  }

  .photo-shimmer-ring {
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      transparent 0deg,
      rgba(201,168,76,.55) 60deg,
      rgba(232,208,122,.8) 90deg,
      rgba(201,168,76,.55) 120deg,
      transparent 180deg,
      transparent 360deg
    );
    animation: shimmerSpin 4s linear infinite;
    z-index: 0;
    mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px));
    -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px));
  }

  @keyframes shimmerSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes spinSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .photo-frame {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid var(--gold);
    box-shadow:
      0 0 0 8px rgba(118,0,49,.6),
      0 0 40px rgba(201,168,76,.3),
      0 20px 60px rgba(0,0,0,.5);
    position: relative;
    z-index: 1;
    animation: photoGlow 3.5s ease-in-out infinite;
  }

  @keyframes photoGlow {
    0%, 100% {
      box-shadow: 0 0 0 8px rgba(118,0,49,.6), 0 0 40px rgba(201,168,76,.3), 0 20px 60px rgba(0,0,0,.5);
    }
    50% {
      box-shadow: 0 0 0 8px rgba(118,0,49,.6), 0 0 70px rgba(201,168,76,.6), 0 0 100px rgba(201,168,76,.2), 0 20px 60px rgba(0,0,0,.5);
    }
  }

  .photo-frame img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }

  .photo-shine {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      rgba(255,255,255,.18) 0%,
      rgba(255,255,255,.06) 30%,
      transparent 60%
    );
    pointer-events: none;
    animation: shineMove 6s ease-in-out infinite;
  }

  @keyframes shineMove {
    0%, 100% { opacity: 1; transform: rotate(0deg); }
    50%       { opacity: .4; transform: rotate(180deg); }
  }

  /* Orbiting sparkles */
  ${Array.from({length:8},(_,i)=>{
    const angle = i * 45;
    const delay = i * 0.5;
    return `
  .photo-spark-${i} {
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--gold-lt);
    top: 50%;
    left: 50%;
    transform-origin: 0 0;
    animation: orbitSpark-${i} 8s linear ${delay}s infinite;
    opacity: 0;
    box-shadow: 0 0 6px rgba(201,168,76,.8);
  }
  @keyframes orbitSpark-${i} {
    0%   { transform: rotate(${angle}deg) translateX(calc(min(145px, 35vw))) scale(0); opacity: 0; }
    10%  { opacity: .9; transform: rotate(${angle}deg) translateX(calc(min(145px, 35vw))) scale(1); }
    90%  { opacity: .4; transform: rotate(${angle + 360}deg) translateX(calc(min(145px, 35vw))) scale(1); }
    100% { transform: rotate(${angle + 360}deg) translateX(calc(min(145px, 35vw))) scale(0); opacity: 0; }
  }`;}).join('')}

  .photo-gem {
    position: absolute;
    color: var(--gold-lt);
    font-size: .85rem;
    z-index: 2;
    text-shadow: 0 0 10px rgba(201,168,76,.6);
    animation: gemTwinkle 2s ease-in-out infinite;
  }
  .photo-gem-top    { top: -18px;  left: 50%; transform: translateX(-50%); }
  .photo-gem-bottom { bottom: -18px; left: 50%; transform: translateX(-50%); animation-delay: .5s; }
  .photo-gem-left   { left: -18px;  top: 50%; transform: translateY(-50%); animation-delay: 1s; }
  .photo-gem-right  { right: -18px; top: 50%; transform: translateY(-50%); animation-delay: 1.5s; }

  @keyframes gemTwinkle {
    0%, 100% { opacity: .6; transform: translateX(-50%) scale(1); text-shadow: 0 0 10px rgba(201,168,76,.6); }
    50%       { opacity: 1;  transform: translateX(-50%) scale(1.4); text-shadow: 0 0 18px rgba(201,168,76,1); }
  }
  .photo-gem-left  { animation-name: gemTwinkleY; }
  .photo-gem-right { animation-name: gemTwinkleY; animation-delay: 1.5s; }
  @keyframes gemTwinkleY {
    0%, 100% { opacity: .6; transform: translateY(-50%) scale(1); text-shadow: 0 0 10px rgba(201,168,76,.6); }
    50%       { opacity: 1;  transform: translateY(-50%) scale(1.4); text-shadow: 0 0 18px rgba(201,168,76,1); }
  }

  /* ===== Date ===== */
  .date-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .day-name {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(.75rem, 2vw, .92rem);
    letter-spacing: .35em;
    text-transform: uppercase;
    color: var(--gold);
    opacity: .8;
  }

  .day-number {
    font-family: 'Great Vibes', cursive;
    font-size: clamp(6rem, 18vw, 10rem);
    color: var(--gold-lt);
    line-height: .85;
    text-shadow: 0 0 60px rgba(201,168,76,.45);
  }

  .month-year {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(1rem, 3.2vw, 1.5rem);
    font-weight: 500;
    letter-spacing: .28em;
    text-transform: uppercase;
    color: var(--gold);
  }

  .time-text {
    font-family: 'Great Vibes', cursive;
    font-size: clamp(1.8rem, 5.5vw, 2.8rem);
    color: var(--cream);
    margin-top: 8px;
    opacity: .92;
  }

  /* ===== Countdown ===== */
  .countdown {
    display: flex;
    gap: clamp(14px, 4.5vw, 48px);
    align-items: flex-start;
  }

  .count-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }

  .count-num {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(2rem, 6.5vw, 3.8rem);
    font-weight: 600;
    color: var(--gold-lt);
    letter-spacing: .04em;
    line-height: 1;
    text-shadow: 0 0 24px rgba(201,168,76,.4);
  }

  .count-lbl {
    font-family: 'Montserrat', sans-serif;
    font-size: .62rem;
    letter-spacing: .22em;
    text-transform: uppercase;
    color: var(--gold);
    opacity: .65;
  }

  /* ===== Venue button with location hint animations ===== */
  .venue-btn {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    padding: 24px 52px;
    border: 2px solid var(--gold);
    color: var(--gold-pale);
    text-decoration: none;
    position: relative;
    cursor: pointer;
    transition: all .38s ease;
    background: rgba(118,0,49,.25);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    animation: venuePulse 2.5s ease-in-out infinite;
  }

  @keyframes venuePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,.0), 0 0 20px rgba(201,168,76,.1); }
    50%       { box-shadow: 0 0 0 12px rgba(201,168,76,.0), 0 0 40px rgba(201,168,76,.25); }
  }

  .vb-pulse-ring {
    position: absolute;
    inset: -8px;
    border-radius: 4px;
    border: 2px solid rgba(201,168,76,.5);
    animation: vbRingExpand 2.4s ease-out infinite;
    pointer-events: none;
  }

  .vb-pulse-ring-2 {
    animation-delay: 1.2s;
  }

  @keyframes vbRingExpand {
    0%   { inset: -4px;  opacity: .7; }
    100% { inset: -28px; opacity: 0; }
  }

  .vb-pin {
    animation: pinBounce 1.8s ease-in-out infinite;
    margin-bottom: 2px;
  }

  @keyframes pinBounce {
    0%, 100% { transform: translateY(0); }
    40%       { transform: translateY(-5px); }
    60%       { transform: translateY(-3px); }
  }

  .venue-btn::before, .venue-btn::after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border-color: var(--gold-lt);
    border-style: solid;
    transition: all .38s ease;
  }
  .venue-btn::before { top:-5px; left:-5px; border-width:2px 0 0 2px; }
  .venue-btn::after  { bottom:-5px; right:-5px; border-width:0 2px 2px 0; }

  .venue-btn:hover {
    background: rgba(201,168,76,.14);
    box-shadow: 0 0 40px rgba(201,168,76,.18), inset 0 0 20px rgba(201,168,76,.05);
    transform: translateY(-3px);
    color: var(--gold-lt);
    animation: none;
  }

  .venue-btn:hover::before { top:-9px; left:-9px; }
  .venue-btn:hover::after  { bottom:-9px; right:-9px; }

  .vb-eyebrow {
    font-family: 'Montserrat', sans-serif;
    font-size: .68rem;
    letter-spacing: .3em;
    text-transform: uppercase;
    opacity: .65;
    margin-bottom: 4px;
  }

  .vb-main {
    font-family: 'Great Vibes', cursive;
    font-size: clamp(2.2rem, 6.5vw, 3.4rem);
    color: var(--gold);
    line-height: 1;
  }

  .vb-sub {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(.78rem, 2.1vw, .95rem);
    letter-spacing: .22em;
    text-transform: uppercase;
    opacity: .7;
    margin-top: 3px;
  }

  /* ===== Footer ===== */
  .footer-monogram {
    font-family: 'Great Vibes', cursive;
    font-size: clamp(3.2rem, 10vw, 5.5rem);
    color: var(--gold);
    text-shadow: 0 0 50px rgba(201,168,76,.5);
  }

  .footer-tagline {
    font-family: 'Montserrat', sans-serif;
    font-size: clamp(.75rem, 2.1vw, .92rem);
    letter-spacing: .32em;
    text-transform: uppercase;
    color: var(--cream);
    opacity: .55;
    margin-top: 6px;
  }

  /* ===== Mobile ===== */
  @media (max-width: 480px) {
    .inv-inner { padding: 70px 22px 90px; }
    .venue-btn { padding: 18px 30px; }
    .page-corners { display: none; }
    .countdown { gap: 10px; }
    .count-unit { min-width: 48px; }
    .divider { width: 200px; }
  }


  /* ==========================
   ROSE PETALS (WHITE FLOWERS)
========================== */
/* ===========================
   ROSE PETALS (تساقط الورد)
========================== */

.rose-petals {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 10;
}

.petal {
  position: absolute;
  top: -50px;
color: #fca5a5;  font-size: 20px;
  opacity: 0;
  /* تأثير الوردة */
  animation: fallPetal linear infinite;
}

/* توزيع عشوائي للورد */
.p0  { left: 5%; animation-duration: 12s; animation-delay: 0s; }
.p1  { left: 15%; animation-duration: 15s; animation-delay: 1s; }
.p2  { left: 25%; animation-duration: 10s; animation-delay: 2s; }
.p3  { left: 35%; animation-duration: 14s; animation-delay: 0.5s; }
.p4  { left: 45%; animation-duration: 18s; animation-delay: 3s; }
.p5  { left: 55%; animation-duration: 11s; animation-delay: 1.5s; }
.p6  { left: 65%; animation-duration: 16s; animation-delay: 2.5s; }
.p7  { left: 75%; animation-duration: 13s; animation-delay: 0s; }
.p8  { left: 85%; animation-duration: 17s; animation-delay: 1s; }
.p9  { left: 95%; animation-duration: 12s; animation-delay: 2s; }
.p10 { left: 10%; animation-duration: 14s; animation-delay: 0.8s; }
.p11 { left: 40%; animation-duration: 15s; animation-delay: 3.5s; }
.p12 { left: 70%; animation-duration: 11s; animation-delay: 1.2s; }
.p13 { left: 90%; animation-duration: 19s; animation-delay: 0.2s; }

/* حركة التساقط */
@keyframes fallPetal {
  0% {
    transform: translateY(-100px) translateX(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(100vh) translateX(50px) rotate(360deg);
    opacity: 0;
  }
}
  .location-container {
  margin: 40px auto;
  padding: 25px;
  max-width: 500px;
  background: rgba(61, 0, 25, 0.4); /* لون خلفية ملكي شفاف */
  border: 1px solid var(--gold);
  border-radius: 25px;
  text-align: center;
  backdrop-filter: blur(10px); /* تأثير ضبابي فخم */
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.location-title {
  color: var(--gold);
  font-family: 'Great Vibes', cursive;
  font-size: 2.2rem;
  margin-bottom: 15px;
}

.map-wrapper {
  border-radius: 15px;
  overflow: hidden; /* ليجعل حدود الإطار منحنية */
  border: 2px solid var(--gold);
  box-shadow: 0 0 15px rgba(201, 168, 76, 0.3);
  transition: transform 0.3s ease;
}

.map-wrapper:hover {
  transform: scale(1.02); /* تكبير بسيط عند المرور بالفأرة */
}

.location-hint {
  color: var(--gold-pale);
  font-size: 0.8rem;
  margin-top: 10px;
  opacity: 0.8;
  font-style: italic;
}
  /* سكشن When & Where - مصحح وجاهز */
//* سكشن When & Where */
.s-whenwhere { 
  padding: 60px 20px; 
  text-align: center; 
  position: relative;
}

.ww-card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; 
  gap: 15px; /* تقليل المسافة قليلاً لتناسب الشاشة */
  max-width: 700px; 
  margin: 30px auto;
}

.ww-card {
  background: rgba(61, 0, 25, 0.4);
  border: 1px solid var(--gold);
  border-radius: 20px;
  padding: 20px 10px; /* تقليل الـ padding ليأخذ النص مساحته */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* تغيير لـ flex-start لترتيب العناصر من الأعلى */
  min-height: 220px; 
}

.ww-card-icon { font-size: 2rem; margin-bottom: 15px; }

.ww-card-label { 
  font-family: 'Great Vibes', cursive; 
  font-size: 1.6rem; 
  color: var(--gold); 
  margin-bottom: 15px; 
}

.ww-card-main { 
  display: block; 
  font-family: 'Montserrat', sans-serif; 
  font-weight: 700; 
  color: #fff; /* جعل اللون أبيض لتباين أفضل */
  font-size: 0.95rem;
  line-height: 1.4;
  margin-bottom: 5px;
}

.ww-card-sub { 
  display: block; 
  font-family: 'Montserrat', sans-serif; 
  color: var(--gold-pale); 
  font-size: 0.8rem; 
  line-height: 1.5;
  opacity: 0.9;
  padding: 0 5px;
}
  .s-whenwhere{padding:80px 24px 70px;position:relative;text-align:center}
            .s-whenwhere::before{content:'';position:absolute;top:0;left:10%;right:10%;height:1px;background:linear-gradient(90deg,transparent,var(--gold-lt),transparent)}
            .ww-title{font-family:'Great Vibes',cursive;font-size:clamp(2.8rem,10vw,4rem);color:var(--gold);margin-bottom:30px}
          .inv-footer{
    text-align:center;
    padding:22px 15px 30px;
    border-top:1px solid rgba(196,169,122,.18);
}

.inv-footer-text{
    font-family:'Amiri',serif;
    font-size:clamp(.95rem,3vw,1.08rem);
    color:var(--gold-pale);
    line-height:1.9;
}

.inv-footer a{
    color:var(--gold);
    text-decoration:none;
    font-weight:700;
    margin-right:4px;
}

.inv-footer a:hover{
    opacity:.8;
}

  
`
