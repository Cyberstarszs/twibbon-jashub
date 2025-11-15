// assets/js/editor.js

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("twibbonCanvas");
  const ctx = canvas.getContext("2d");

  const photoInput = document.getElementById("photoInput");
  const templateInput = document.getElementById("templateInput");
  const photoInfo = document.getElementById("photoInfo");
  const templateInfo = document.getElementById("templateInfo");

  const zoomSlider = document.getElementById("zoomSlider");
  const rotateSlider = document.getElementById("rotateSlider");
  const zoomValue = document.getElementById("zoomValue");
  const rotateValue = document.getElementById("rotateValue");

  const resetBtn = document.getElementById("resetTransform");
  const downloadBtn = document.getElementById("downloadBtn");
  const downloadFormat = document.getElementById("downloadFormat");

  const templateThumbs = document.querySelectorAll(".template-thumb");

  // State object
  const state = {
    photoImage: null,
    templateImage: null,
    photoScale: 1,
    photoRotation: 0, // in degrees
    offsetX: 0,
    offsetY: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    initialOffsetX: 0,
    initialOffsetY: 0,
  };

  // Default templates map (id -> src)
  const templateMap = {
    1: "assets/img/twibbon-1.png",
    2: "assets/img/twibbon-2.png",
    3: "assets/img/twibbon-3.png",
  };

  // Helper: load image from src, return Promise<HTMLImageElement>
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // safer for canvas
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
      img.src = src;
    });
  }

  // Initialize default template based on URL param or first one
  async function initTemplateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const templateId = params.get("template");
    let chosenId = templateId && templateMap[templateId] ? templateId : "1";

    try {
      const img = await loadImage(templateMap[chosenId]);
      state.templateImage = img;
      updateTemplateInfo(`Menggunakan template default #${chosenId}.`);
      markActiveTemplateThumb(chosenId);
      redraw();
    } catch (err) {
      console.warn("Gagal memuat template default:", err);
      updateTemplateInfo("Gagal memuat template default. Coba upload template sendiri.");
    }
  }

  function updateTemplateInfo(text) {
    if (templateInfo) templateInfo.textContent = text;
  }

  function updatePhotoInfo(text) {
    if (photoInfo) photoInfo.textContent = text;
  }

  function markActiveTemplateThumb(id) {
    templateThumbs.forEach((btn) => {
      if (btn.dataset.template === String(id)) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  // Draw function
  function redraw() {
    if (!ctx || !canvas) return;
    const { width, height } = canvas;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#050509");
    gradient.addColorStop(1, "#151522");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Draw photo first
    if (state.photoImage) {
      const img = state.photoImage;
      const centerX = width / 2 + state.offsetX;
      const centerY = height / 2 + state.offsetY;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((state.photoRotation * Math.PI) / 180);

      const scaledW = img.width * state.photoScale;
      const scaledH = img.height * state.photoScale;

      ctx.drawImage(img, -scaledW / 2, -scaledH / 2, scaledW, scaledH);
      ctx.restore();
    }

    // Draw template on top
    if (state.templateImage) {
      const tImg = state.templateImage;

      // Fit template to canvas while preserving aspect ratio
      const scale = Math.max(
        canvas.width / tImg.width,
        canvas.height / tImg.height
      );
      const tplWidth = tImg.width * scale;
      const tplHeight = tImg.height * scale;
      const tplX = (canvas.width - tplWidth) / 2;
      const tplY = (canvas.height - tplHeight) / 2;

      ctx.drawImage(tImg, tplX, tplY, tplWidth, tplHeight);
    }
  }

  // Reset transform values
  function resetTransform() {
    state.photoScale = 1;
    state.photoRotation = 0;
    state.offsetX = 0;
    state.offsetY = 0;

    if (zoomSlider) zoomSlider.value = "1";
    if (rotateSlider) rotateSlider.value = "0";
    if (zoomValue) zoomValue.textContent = "100%";
    if (rotateValue) rotateValue.textContent = "0°";

    redraw();
  }

  // Handlers: upload photo
  if (photoInput) {
    photoInput.addEventListener("change", async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (ev) => {
        try {
          const img = await loadImage(ev.target.result);
          state.photoImage = img;
          resetTransform();
          updatePhotoInfo(`Foto terpasang: ${file.name}`);
        } catch (err) {
          console.error("Gagal memuat foto:", err);
          updatePhotoInfo("Gagal memuat foto. Coba file lain.");
        }
        redraw();
      };
      reader.readAsDataURL(file);
    });
  }

  // Handlers: upload template
  if (templateInput) {
    templateInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (ev) => {
        try {
          const img = await loadImage(ev.target.result);
          state.templateImage = img;
          updateTemplateInfo(`Template kustom terpasang: ${file.name}`);
          markActiveTemplateThumb(null);
          redraw();
        } catch (err) {
          console.error("Gagal memuat template:", err);
          updateTemplateInfo("Gagal memuat template. Coba file lain.");
        }
      };
      reader.readAsDataURL(file);
    });
  }

  // Handlers: default template thumbnails
  if (templateThumbs.length > 0) {
    templateThumbs.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.template;
        if (!id || !templateMap[id]) return;

        try {
          const img = await loadImage(templateMap[id]);
          state.templateImage = img;
          updateTemplateInfo(`Menggunakan template default #${id}.`);
          markActiveTemplateThumb(id);
          redraw();
        } catch (err) {
          console.error("Gagal memuat template default:", err);
          updateTemplateInfo("Gagal memuat template default.");
        }
      });
    });
  }

  // Zoom slider
  if (zoomSlider && zoomValue) {
    zoomSlider.addEventListener("input", () => {
      const value = parseFloat(zoomSlider.value);
      state.photoScale = value;
      zoomValue.textContent = Math.round(value * 100) + "%";
      redraw();
    });
  }

  // Rotate slider
  if (rotateSlider && rotateValue) {
    rotateSlider.addEventListener("input", () => {
      const deg = parseFloat(rotateSlider.value);
      state.photoRotation = deg;
      rotateValue.textContent = deg + "°";
      redraw();
    });
  }

  // Reset button
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      resetTransform();
    });
  }

  // Dragging on canvas (mouse)
  if (canvas) {
    canvas.addEventListener("mousedown", (e) => {
      if (!state.photoImage) return;
      state.isDragging = true;
      state.dragStartX = e.clientX;
      state.dragStartY = e.clientY;
      state.initialOffsetX = state.offsetX;
      state.initialOffsetY = state.offsetY;
    });

    window.addEventListener("mousemove", (e) => {
      if (!state.isDragging) return;
      const deltaX = e.clientX - state.dragStartX;
      const deltaY = e.clientY - state.dragStartY;
      state.offsetX = state.initialOffsetX + deltaX;
      state.offsetY = state.initialOffsetY + deltaY;
      redraw();
    });

    window.addEventListener("mouseup", () => {
      state.isDragging = false;
    });

    // Dragging on canvas (touch)
    canvas.addEventListener(
      "touchstart",
      (e) => {
        if (!state.photoImage) return;
        const touch = e.touches[0];
        if (!touch) return;
        state.isDragging = true;
        state.dragStartX = touch.clientX;
        state.dragStartY = touch.clientY;
        state.initialOffsetX = state.offsetX;
        state.initialOffsetY = state.offsetY;
      },
      { passive: true }
    );

    window.addEventListener(
      "touchmove",
      (e) => {
        if (!state.isDragging) return;
        const touch = e.touches[0];
        if (!touch) return;
        const deltaX = touch.clientX - state.dragStartX;
        const deltaY = touch.clientY - state.dragStartY;
        state.offsetX = state.initialOffsetX + deltaX;
        state.offsetY = state.initialOffsetY + deltaY;
        redraw();
      },
      { passive: true }
    );

    window.addEventListener("touchend", () => {
      state.isDragging = false;
    });
  }

  // Download merged image
  if (downloadBtn && downloadFormat) {
    downloadBtn.addEventListener("click", () => {
      if (!state.photoImage || !state.templateImage) {
        alert("Pastikan foto dan template sudah terpasang sebelum download.");
        return;
      }

      const format = downloadFormat.value === "jpeg" ? "jpeg" : "png";
      let dataUrl;

      if (format === "png") {
        dataUrl = canvas.toDataURL("image/png");
      } else {
        dataUrl = canvas.toDataURL("image/jpeg", 0.95);
      }

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `twibbon-${Date.now()}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // Initialize template from URL if possible
  initTemplateFromUrl().finally(() => {
    // initial draw
    redraw();
  });
});
