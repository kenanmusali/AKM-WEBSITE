// Prevent dragging on all elements with .No-Select
document.querySelectorAll('.No-Select').forEach(el => {
  el.addEventListener('dragstart', event => {
    event.preventDefault();
  });
});
