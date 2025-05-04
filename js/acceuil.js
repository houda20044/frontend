window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".card").forEach((card, i) => {
      setTimeout(() => {
        card.style.opacity = 1;
        card.style.transform = "translateY(0)";
      }, i * 150);
    });
  });