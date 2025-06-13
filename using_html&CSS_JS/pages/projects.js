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

document.addEventListener("DOMContentLoaded", function () {
  const videoSpotlight = document.querySelector(".video-spotlight");
  const videoItems = document.querySelectorAll(".video-item:not(.placeholder)");

  // Store the initial featured video content
  const initialFeaturedVideo =
    videoSpotlight.querySelector(".featured-video").innerHTML;

  // Set initial active state
  const youtubeVideo = document.createElement("div");
  youtubeVideo.className = "video-item active";
  youtubeVideo.dataset.video = "youtube";

  function updateActiveState(clickedItem) {
    videoItems.forEach((item) => item.classList.remove("active"));
    clickedItem.classList.add("active");
  }

  videoItems.forEach((item) => {
    item.addEventListener("click", function () {
      const videoType = this.dataset.video;

      // Update active state
      updateActiveState(this);

      if (videoType === "room") {
        // Switch to room video in spotlight
        videoSpotlight.querySelector(".featured-video").innerHTML = `
                    <video src="/vids/room.mp4" controls autoplay preload="metadata" aria-label="Room footage" loading="lazy">
                        <p>Your browser doesn't support HTML5 video.</p>
                    </video>
                    <div class="video-description">
                        <h3>Room Ambience</h3>
                        <p>A cinematic exploration of space and light</p>
                    </div>
                `;
      } else {
        // Restore YouTube video if it's not the room video
        videoSpotlight.querySelector(".featured-video").innerHTML =
          initialFeaturedVideo;
        updateActiveState(youtubeVideo);
      }

      // Smooth scroll to spotlight
      videoSpotlight.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});
