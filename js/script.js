/* LOAD NAV-BAR */
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

/* LOAD CONNECTIONS */
fetch('/pages/reuseable/connections.html')
.then(response => response.text())
.then(data => {
  document.getElementById('connections').innerHTML = data;
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

/* SVG MANAGMENT */
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

/* COLLAPSIBLES */
/* const collapsibleButtons = document.querySelectorAll('.collapsible_button');

collapsibleButtons.forEach(button => {
  button.addEventListener('click', function() {
    const content = this.nextElementSibling;

    content.classList.toggle('collapsible_open');
  });
}); */

const collapsibleButtons = document.querySelectorAll('.collapsible_button');

collapsibleButtons.forEach(button => {
  button.addEventListener('click', function () {
    const content = this.nextElementSibling;

    if (content.classList.contains('collapsible_open')) {
      content.style.maxHeight = null;
      content.style.visibility = 'hidden';
      content.classList.remove('collapsible_open');
    } else {
      content.style.maxHeight = `${content.scrollHeight}px`;
      content.style.visibility = 'visible';
      content.classList.add('collapsible_open');
    }
  });
});