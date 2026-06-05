const simulationBenchmarks = [
  {
    label: "LIBERO-Plus Total",
    values: [
      { method: "pi_0.5", value: 77.4 },
      { method: "Being-H0.7", value: 82.1 },
      { method: "Cosmos Policy", value: 79.7 },
      { method: "World Pilot", value: 84.7 },
    ],
  },
  {
    label: "RoboCasa",
    values: [
      { method: "pi_0.5", value: 41.4 },
      { method: "Being-H0.7", value: 62.1 },
      { method: "Cosmos Policy", value: 67.1 },
      { method: "World Pilot", value: 65.5 },
    ],
  },
];

function formatValue(value) {
  return Number(value).toFixed(1).replace(".0", "");
}

function isHighlightedMethod(method) {
  return method === "World Pilot";
}

function renderSimulationCharts() {
  const root = document.getElementById("simulation-charts");

  if (!root) {
    return;
  }

  root.innerHTML = "";

  simulationBenchmarks.forEach((benchmark) => {
    const panel = document.createElement("article");
    panel.className = "chart-panel chart-panel--benchmark";

    const title = document.createElement("h3");
    title.className = "chart-title";
    title.textContent = benchmark.label;
    panel.appendChild(title);

    const list = document.createElement("div");
    list.className = "bar-list";

    benchmark.values.forEach((entry) => {
      const row = document.createElement("div");
      row.className = "bar-row";

      const label = document.createElement("span");
      label.className = "bar-row__label";
      label.textContent = entry.method;

      const track = document.createElement("div");
      track.className = "bar-row__track";

      const bar = document.createElement("div");
      bar.className = isHighlightedMethod(entry.method) ? "bar-row__fill bar-row__fill--accent" : "bar-row__fill";
      bar.style.width = `${entry.value}%`;

      const value = document.createElement("span");
      value.className = "bar-row__value";
      value.textContent = formatValue(entry.value);

      track.append(bar);
      row.append(label, track, value);
      list.appendChild(row);
    });

    panel.appendChild(list);
    root.appendChild(panel);
  });
}

function setupVideoFallback() {
  const player = document.querySelector("[data-video-player]");
  const fallback = document.querySelector("[data-video-fallback]");

  if (!(player instanceof HTMLVideoElement) || !(fallback instanceof HTMLElement)) {
    return;
  }

  player.addEventListener("error", () => {
    player.hidden = true;
    fallback.hidden = false;
  });
}

function setupStickyOffset() {
  const header = document.querySelector(".site-header");
  const root = document.documentElement;

  if (!(header instanceof HTMLElement) || !root || !root.style || typeof root.style.setProperty !== "function") {
    return;
  }

  const applyOffset = () => {
    const headerHeight = header.offsetHeight || 0;
    root.style.setProperty("--sticky-offset", `${headerHeight + 24}px`);
  };

  applyOffset();

  if (typeof window.addEventListener === "function") {
    window.addEventListener("resize", applyOffset);
  }
}

function setupCitationCopy() {
  const button = document.getElementById("citation-copy");
  const code = document.getElementById("citation-code");

  if (!(button instanceof HTMLElement) || !(code instanceof HTMLElement)) {
    return;
  }

  button.addEventListener("click", async () => {
    const citationText = code.textContent || "";
    const clipboard = typeof navigator !== "undefined" ? navigator.clipboard : undefined;

    if (!citationText || !clipboard || typeof clipboard.writeText !== "function") {
      return;
    }

    try {
      await clipboard.writeText(citationText);
      button.classList.add("is-copied");

      if (typeof window.setTimeout === "function") {
        window.setTimeout(() => {
          button.classList.remove("is-copied");
        }, 1200);
      }
    } catch (_error) {
      // Keep the interaction silent when clipboard access is unavailable.
    }
  });
}

function setupHeaderTheme() {
  const header = document.querySelector(".site-header");
  const hero = document.querySelector(".hero");

  if (
    !(header instanceof HTMLElement) ||
    !(hero instanceof HTMLElement)
  ) {
    return;
  }

  const applyTheme = () => {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const headerBottom = (window.scrollY || 0) + (header.offsetHeight || 0);
    const onHero = headerBottom <= heroBottom - 8;
    header.classList.toggle("site-header--on-hero", onHero);
  };

  applyTheme();

  if (typeof window.addEventListener === "function") {
    window.addEventListener("scroll", applyTheme, { passive: true });
    window.addEventListener("resize", applyTheme);
  }
}

renderSimulationCharts();
setupVideoFallback();
setupStickyOffset();
setupCitationCopy();
setupHeaderTheme();
