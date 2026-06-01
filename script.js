(function () {
  const MESSAGE = "Te Amo";
  const MIN_WORDS = 25;
  const MAX_WORDS = 120;
  const WORDS_PER_PX = 0.06;

  function heartPoint(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    );
    return { x, y };
  }

  function getNumWords() {
    const minDim = Math.min(window.innerWidth, window.innerHeight);
    return Math.max(
      MIN_WORDS,
      Math.min(MAX_WORDS, Math.round(minDim * WORDS_PER_PX))
    );
  }

  function buildLayer(layer, numWords) {
    if (!layer) return;
    const scale = Math.min(window.innerWidth, window.innerHeight) * 0.022;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < numWords; i++) {
      const t = (i / numWords) * Math.PI * 2;
      const { x, y } = heartPoint(t);

      const word = document.createElement("span");
      word.className = "word";
      word.textContent = MESSAGE;
      word.style.left = `${x * scale}px`;
      word.style.top = `${y * scale}px`;

      const sizeVar = 0.9 + Math.random() * 0.4;
      word.style.fontSize = `${(18 * sizeVar).toFixed(1)}px`;

      fragment.appendChild(word);
    }

    layer.appendChild(fragment);
  }

  function buildBackgroundHearts(container) {
    if (!container) return;
    const HEART_CHARS = ["\u2764", "\u2665", "\u2661"];
    const COUNT = 22;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < COUNT; i++) {
      const heart = document.createElement("span");
      heart.className = "bg-heart";
      heart.textContent = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)];

      const x = Math.random() * 100;
      const size = 10 + Math.random() * 18;
      const peakOpacity = 0.12 + Math.random() * 0.18;
      const duration = 18 + Math.random() * 18;
      const delay = -(Math.random() * duration);
      const drift = (Math.random() - 0.5) * 160;
      const rotation = (Math.random() - 0.5) * 720;

      heart.style.left = `${x}vw`;
      heart.style.fontSize = `${size.toFixed(1)}px`;
      heart.style.animationDuration = `${duration.toFixed(1)}s`;
      heart.style.animationDelay = `${delay.toFixed(1)}s`;
      heart.style.setProperty("--drift", `${drift.toFixed(1)}px`);
      heart.style.setProperty("--rotation", `${rotation.toFixed(0)}deg`);
      heart.style.setProperty("--peak-opacity", peakOpacity.toFixed(2));

      fragment.appendChild(heart);
    }

    container.appendChild(fragment);
  }

  const layerIds = [
    "layer-trail-3",
    "layer-trail-2",
    "layer-trail-1",
    "layer-main",
  ];

  function render() {
    const numWords = getNumWords();
    layerIds.forEach((id) => {
      const layer = document.getElementById(id);
      if (layer) {
        layer.innerHTML = "";
        buildLayer(layer, numWords);
      }
    });
  }

  render();
  buildBackgroundHearts(document.getElementById("bg-hearts"));

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 150);
  });
})();
