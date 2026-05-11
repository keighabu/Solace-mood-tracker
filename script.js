/**
 * script.js — Solace Shared Script
 * Handles: Bottom Nav injection + active state
 */
(function() {
  const navHTML = `
<nav class="bottom-nav">
  <a href="dashboard.html" class="nav-item">
    <div class="nav-icon-wrap" style="background: linear-gradient(135deg, #74B9FF, #0984E3); box-shadow: 0 4px 10px rgba(9,132,227,0.35), inset 0 1px 2px rgba(255,255,255,0.4);">
      <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
        <path d="M9 21V12h6v9"/>
      </svg>
    </div>
    <span>Home</span>
  </a>
  <a href="mood-screen.html" class="nav-item">
    <div class="nav-icon-wrap" style="background: linear-gradient(135deg, #FFEAA7, #FDCB6E); box-shadow: 0 4px 10px rgba(253,203,110,0.45), inset 0 1px 2px rgba(255,255,255,0.4);">
      <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8">
        <circle cx="12" cy="12" r="9"/>
        <path d="M8.5 14s1.5 2 3.5 2 3.5-2 3.5-2"/>
        <circle cx="9" cy="10" r="0.8" fill="white"/>
        <circle cx="15" cy="10" r="0.8" fill="white"/>
      </svg>
    </div>
    <span>Mood</span>
  </a>
  <a href="journal.html" class="nav-item">
    <div class="nav-icon-wrap" style="background: linear-gradient(135deg, #55EFC4, #00B894); box-shadow: 0 4px 10px rgba(0,184,148,0.35), inset 0 1px 2px rgba(255,255,255,0.4);">
      <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
      </svg>
    </div>
    <span>Journal</span>
  </a>
  <a href="progress.html" class="nav-item">
    <div class="nav-icon-wrap" style="background: linear-gradient(135deg, #A29BFE, #6C5CE7); box-shadow: 0 4px 10px rgba(108,92,231,0.35), inset 0 1px 2px rgba(255,255,255,0.4);">
      <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8">
        <path d="M3 20h18M5 20V10m4 10V4m4 16v-7m4 7v-3"/>
      </svg>
    </div>
    <span>Progress</span>
  </a>
  <a href="breathe.html" class="nav-item">
    <div class="nav-icon-wrap" style="background: linear-gradient(135deg, #81ECEC, #00CEC9); box-shadow: 0 4px 10px rgba(0,206,201,0.35), inset 0 1px 2px rgba(255,255,255,0.4);">
      <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8">
        <path d="M12 2C6 2 3 7 3 12s3 10 9 10 9-5 9-10S18 2 12 2z"/>
        <path d="M8 12c0-2 1.5-4 4-4s4 2 4 4-1.5 4-4 4-4-2-4-4z"/>
      </svg>
    </div>
    <span>Breathe</span>
  </a>
  <a href="support.html" class="nav-item">
    <div class="nav-icon-wrap" style="background: linear-gradient(135deg, #FF7675, #D63031); box-shadow: 0 4px 10px rgba(214,48,49,0.35), inset 0 1px 2px rgba(255,255,255,0.4);">
      <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8">
        <circle cx="12" cy="12" r="9"/>
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
        <circle cx="12" cy="17" r="0.6" fill="white"/>
      </svg>
    </div>
    <span>Help</span>
  </a>
</nav>
  `;

  const isLanding = window.location.pathname.endsWith('index.html') ||
                    window.location.pathname === '/' ||
                    window.location.pathname.endsWith('/');
  if (!isLanding) {
    document.body.insertAdjacentHTML('beforeend', navHTML);
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      }
    });
  }
})();