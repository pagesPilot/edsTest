export default function decorate(block) {
  // alternate layout: every other hero-horizontal is reversed (text left, image right)
  const allHeros = document.querySelectorAll('.hero-horizontal');
  const index = [...allHeros].indexOf(block);
  if (index % 2 === 1) {
    block.classList.add('reverse');
  }
}
