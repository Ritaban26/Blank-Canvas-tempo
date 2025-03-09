document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.querySelector(".photo-gallery");
  if (!gallery) return;

  // Convert NodeList to Array and shuffle
  const cards = Array.from(gallery.children);
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    gallery.appendChild(cards[j]);
  }

  // Add animation class to each card
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "scale(0.95)";
  });

  // Trigger reflow
  gallery.offsetHeight;

  // Add transition styles
  const style = document.createElement("style");
  style.textContent = `
        .item-card {
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
    `;
  document.head.appendChild(style);

  // Reveal cards with slight delay between each
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "scale(1)";
    }, index * 100);
  });
});
