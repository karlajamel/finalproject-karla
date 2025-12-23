document.addEventListener("DOMContentLoaded", () => {
  // ===============================
  // Mobile Nav Toggle
  // ===============================
  const menuButton = document.querySelector(".menu-button");
  const menu = document.getElementById("menu");

  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isExpanded));
      menu.classList.toggle("is-open");
    });
  }

  // ===============================
  // Accordion (Hover + Click)
  // ===============================
  const accordion = document.querySelector("[data-accordion]");
  if (!accordion) {
    console.log("Accordion not found");
    return;
  }

  const triggers = accordion.querySelectorAll(".accordion-trigger");
  console.log("Found " + triggers.length + " accordion triggers");

  triggers.forEach((btn) => {
    const panelId = btn.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;

    if (!panel) {
      console.log("Panel not found for button:", btn.textContent);
      return;
    }

    // Open on hover
    btn.addEventListener("mouseenter", () => {
      console.log("Hovering:", btn.textContent);
      openPanel(btn, panel, triggers);
    });

    // Toggle on click
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Clicking:", btn.textContent);
      const isExpanded = btn.getAttribute("aria-expanded") === "true";
      if (isExpanded) {
        closePanel(btn, panel);
      } else {
        openPanel(btn, panel, triggers);
      }
    });
  });

  function openPanel(btn, panel, allTriggers) {
    if (!panel) return;

    // Close all other panels
    allTriggers.forEach((otherBtn) => {
      const otherId = otherBtn.getAttribute("aria-controls");
      const otherPanel = otherId ? document.getElementById(otherId) : null;
      otherBtn.setAttribute("aria-expanded", "false");
      if (otherPanel) otherPanel.setAttribute("hidden", "");
    });

    // Open this panel
    btn.setAttribute("aria-expanded", "true");
    panel.removeAttribute("hidden");
  }

  function closePanel(btn, panel) {
    if (!panel) return;
    btn.setAttribute("aria-expanded", "false");
    panel.setAttribute("hidden", "");
  }
});