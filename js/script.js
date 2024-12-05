function setViewBox(svg) {
  const boundingBox = svg.getBBox();
  svg.setAttribute('viewBox', `${boundingBox.x} ${boundingBox.y} ${boundingBox.width} ${boundingBox.height}`);
}
const svgElements = document.querySelectorAll('.svg-bounds');
svgElements.forEach(svgElement => {
  setViewBox(svgElement);
});