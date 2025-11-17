/* Load nav-bar */

fetch('/pages/reuseable/nav-bar.html')
.then(response => response.text())
.then(data => {
  document.getElementById('nav-bar').innerHTML = data;

  const currentPage = window.location.pathname.split('/').pop().replace('.html', '');

  const currentNav = document.getElementById(`nav-${currentPage}`);
  if (currentNav) {
    currentNav.setAttribute('href', 'javascript:void(0)');
  }
});

/* Load con-bar */

fetch('/pages/reuseable/con-bar.html')
.then(response => response.text())
.then(data => {
  document.getElementById('con-bar').innerHTML = data;
})

/* FADE-IN */
document.addEventListener('DOMContentLoaded', () => {
  const fadeInElements = document.querySelectorAll('.fade-in');
  
  fadeInElements.forEach(element => {
    setTimeout(() => {
      element.classList.add('visible');
    }, 100);
  });
});

/* Load Fade Ins */

document.addEventListener('DOMContentLoaded', () => {
  const fadeInElements = document.querySelectorAll('.fade-in');
  
  fadeInElements.forEach(element => {
    setTimeout(() => {
      element.classList.add('visible');
    }, 100);
  });
});

/* SVG Managment */

function setViewBox(svg) {
  const boundingBox = svg.getBBox();
  svg.setAttribute('viewBox', `${boundingBox.x} ${boundingBox.y} ${boundingBox.width} ${boundingBox.height}`);
}

function processSVGs() {
  const svgElements = document.querySelectorAll('.svg-bounds:not([data-processed])');
  svgElements.forEach(svgElement => {
    setViewBox(svgElement);
    svgElement.setAttribute('data-processed', 'true');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  processSVGs();

  const observer = new MutationObserver(() => processSVGs());
  observer.observe(document.body, { childList: true, subtree: true });
});

/* iframe Paragraph Resizer */

(function () {
  const MAX_WIDTH = 900;
  const MIN_WIDTH = 800;

  function buildMap() {
    const map = new Map();
    document.querySelectorAll('iframe.paragraph').forEach(iframe => {
      if (iframe.contentWindow) map.set(iframe.contentWindow, iframe);
    });
    return map;
  }

  window.addEventListener('message', (event) => {
    const data = event.data || {};
    if (data.type !== 'size') return;

    const map = buildMap();
    const iframe = map.get(event.source);
    if (!iframe) return;

    let w = Number(data.width) || iframe.clientWidth;
    if (w < MIN_WIDTH) w = MIN_WIDTH;
    else if (w > MAX_WIDTH) w = MAX_WIDTH;

    let h = Number(data.height) || iframe.clientHeight;

    iframe.style.width = w + 'px';
    iframe.style.height = h + 'px';
    iframe.style.display = 'block';
    iframe.style.margin = '0 auto 1rem';
  });
})();


/* New Tab Opener */

function makeNewTabs(root = document) {
  root.querySelectorAll && root.querySelectorAll('a.new_tab').forEach(a => {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  });
}

document.addEventListener('DOMContentLoaded', () => makeNewTabs());

const mo = new MutationObserver(muts => {
  for (const m of muts) {
    m.addedNodes.forEach(node => {
      if (node.nodeType !== 1) return;
      if (node.matches && node.matches('a.new_tab')) makeNewTabs(node);
      if (node.querySelectorAll) makeNewTabs(node);
    });
  }
});
mo.observe(document.documentElement, { childList: true, subtree: true });