<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Template Twibbon - TwibbonCraft</title>

  <meta name="description" content="Koleksi template twibbon modern dari TwibbonCraft dan komunitas Jashub Store. Pilih, edit, dan gunakan secara gratis.">
  <meta name="keywords" content="template twibbon, twibbon keren, twibbon komunitas, twibbon jashub store">
  <meta name="author" content="Jashub Store">
  <meta property="og:title" content="Template Twibbon - TwibbonCraft by Jashub Store">
  <meta property="og:description" content="Pilih template twibbon default atau dari komunitas, lalu edit langsung di editor TwibbonCraft.">
  <meta property="og:image" content="logo.webp">
  <meta property="og:url" content="https://jashub.web.id">
  <meta property="og:type" content="website">
  <link rel="icon" type="image/png" href="favicon.png">
  <meta name="theme-color" content="#020617">

  <link rel="stylesheet" href="assets/css/style.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;600&display=swap" rel="stylesheet" />
</head>
<body>
  <header class="navbar">
    <div class="container nav-inner">
      <a href="twibbon.html" class="nav-logo">
        <img src="assets/img/logo.png" alt="TwibbonCraft" />
        <span>TwibbonCraft</span>
      </a>
      <nav class="nav-links">
        <a href="twibbon.html">Beranda</a>
        <a href="templates.html" class="active">Template</a>
        <a href="editor.html">Editor</a>
        <a href="about.html">Tentang</a>
      </nav>
      <button class="nav-cta" onclick="window.location.href='index.html'">
        Pesan Layanan
      </button>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <nav class="nav-mobile" id="navMobile">
    <a href="twibbon.html">Beranda</a>
    <a href="templates.html" class="active">Template</a>
    <a href="editor.html">Editor</a>
    <a href="about.html">Tentang</a>
  </nav>

  <main class="templates-page">
    <section class="section hero-templates">
      <div class="container hero-inner">
        <div class="hero-copy">
          <h1>Koleksi Template Twibbon</h1>
          <p>Pilih template default atau gunakan twibbon dari komunitas, lalu edit langsung di editor TwibbonCraft.</p>
          <div class="hero-actions">
            <button class="btn primary" onclick="window.location.href='editor.html'">
              Buka Editor
            </button>
            <button class="btn ghost" onclick="window.location.href='#community-templates'">
              Lihat Template Komunitas
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="templates-section">
      <div class="container">
        <div class="section-header">
          <h2>Template Default TwibbonCraft</h2>
          <p>Template built-in dengan desain elegan. Cocok untuk event formal, promosi, maupun kampanye.</p>
        </div>

        <div class="templates-grid">
          <article class="twibbon-card card-elevated">
            <div class="twibbon-thumb">
              <img src="assets/img/twibbon-1.png" alt="Template Default 1" />
            </div>
            <div class="twibbon-body">
              <h3>Twibbon Ungu Minimalis</h3>
              <p>Frame nuansa ungu modern, cocok untuk brand dan campaign digital.</p>
              <button class="btn secondary" onclick="window.location.href='editor.html?template=1'">
                Gunakan Template
              </button>
            </div>
          </article>

          <article class="twibbon-card card-elevated">
            <div class="twibbon-thumb">
              <img src="assets/img/twibbon-2.png" alt="Template Default 2" />
            </div>
            <div class="twibbon-body">
              <h3>Twibbon Gradient Professional</h3>
              <p>Desain gradient clean untuk acara formal, webinar, dan promo produk.</p>
              <button class="btn secondary" onclick="window.location.href='editor.html?template=2'">
                Gunakan Template
              </button>
            </div>
          </article>

          <article class="twibbon-card card-elevated">
            <div class="twibbon-thumb">
              <img src="assets/img/twibbon-3.png" alt="Template Default 3" />
            </div>
            <div class="twibbon-body">
              <h3>Twibbon Celebration Frame</h3>
              <p>Frame elegan untuk wisuda, perayaan kelulusan, dan pencapaian lainnya.</p>
              <button class="btn secondary" onclick="window.location.href='editor.html?template=3'">
                Gunakan Template
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="templates-section" id="community-templates">
      <div class="container">
        <div class="section-header">
          <h2>Template Komunitas</h2>
          <p>Template yang diupload oleh pengguna TwibbonCraft. Bisa digunakan semua pengunjung.</p>
        </div>
        <div class="templates-grid" id="communityTemplates"></div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container upload-template-section card-elevated">
        <div>
          <h2>Ingin Upload Twibbon Sendiri?</h2>
          <p>Buat desain twibbon kamu, lalu upload melalui halaman editor untuk dibagikan ke pengguna lain.</p>
        </div>
        <div>
          <button class="btn primary" onclick="window.location.href='editor.html'">
            Upload Twibbon di Editor
          </button>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <h3>Jashub Store</h3>
        <p>
          Penyedia aplikasi premium berkualitas dengan harga terjangkau. Dapatkan pengalaman terbaik menggunakan aplikasi favorit Anda.
        </p>
      </div>
      <div class="footer-column">
        <h4>Produk</h4>
        <ul>
          <li><a href="#">Video Editor</a></li>
          <li><a href="#">Music &amp; Audio</a></li>
          <li><a href="#">Design Tools</a></li>
          <li><a href="#">Utility Apps</a></li>
          <li><a href="#">Semua Produk</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>Bantuan</h4>
        <ul>
          <li><a href="#">Cara Pembelian</a></li>
          <li><a href="#">Panduan Login</a></li>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Syarat &amp; Ketentuan</a></li>
          <li><a href="#">Kebijakan Privasi</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h4>Kontak</h4>
        <ul>
          <li><a href="https://jashub.web.id" target="_blank" rel="noopener noreferrer">jashub.web.id</a></li>
          <li><a href="mailto:jashubpremium@gmail.com">jashubpremium@gmail.com</a></li>
          <li><a href="https://wa.me/6287759808899" target="_blank" rel="noopener noreferrer">+62 877 5980 8899</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>© <span id="year"></span> Jashub Store. All rights reserved.</p>
      </div>
    </div>
  </footer>

  <script src="assets/js/main.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function () {
      var grid = document.getElementById("communityTemplates");
      if (!grid) return;

      fetch("/api/templates")
        .then(function (res) { return res.json(); })
        .then(function (data) {
          var templates = Array.isArray(data) ? data : (data && data.templates) ? data.templates : [];
          if (!templates.length) {
            var empty = document.createElement("p");
            empty.className = "helper-text";
            empty.textContent = "Belum ada template komunitas yang diupload.";
            grid.appendChild(empty);
            return;
          }

          templates.forEach(function (tpl) {
            var card = document.createElement("article");
            card.className = "twibbon-card card-elevated";
            var title = tpl.title || "Template Komunitas";
            var imgUrl = tpl.imageUrl;
            card.innerHTML =
              '<div class="twibbon-thumb">' +
                '<img src="' + imgUrl + '" alt="' + title + '" />' +
              "</div>" +
              '<div class="twibbon-body">' +
                "<h3>" + title + "</h3>" +
                '<p>Template dari komunitas TwibbonCraft.</p>' +
                '<button class="btn secondary" onclick="window.location.href=\'editor.html?templateUrl=' + encodeURIComponent(imgUrl) + '\'">' +
                  "Gunakan Template" +
                "</button>" +
              "</div>";
            grid.appendChild(card);
          });
        })
        .catch(function () {
          var error = document.createElement("p");
          error.className = "helper-text error";
          error.textContent = "Gagal memuat template komunitas. Coba beberapa saat lagi.";
          grid.appendChild(error);
        });
    });
  </script>
</body>
</html>
