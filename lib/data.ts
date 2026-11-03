export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  longDesc: string;
  category: "Industrial & IoT" | "AI & Data Science" | "Web & Mobile" | "Enterprise & Finance";
  tags: string[];
  image: string;
  link: string;
  github?: string;
  soon?: boolean;
  color: string;
  stats?: ProjectStat[];
  features?: string[];
  techStack?: string[];
  impact?: string;
}

export const projectsData: Project[] = [
  // 1. Predictive Maintenance (Industrial & IoT)
  {
    id: "predictive-maintenance",
    title: "Predictive Maintenance",
    subtitle: "Sistem IoT & Machine Learning untuk Deteksi Kerusakan Dini Mesin Industri",
    desc: "Platform pemantauan kondisi mesin manufaktur secara real-time dengan sensor getaran, temperatur, dan algoritma AI deteksi anomali.",
    longDesc: "Predictive Maintenance System dirancang untuk industri manufaktur modern guna mendeteksi potensi kegagalan mesin sebelum terjadi downtime yang merugikan. Mengintegrasikan sensor IoT (vibrasi, suhu, arus listrik) dengan pipeline Machine Learning untuk menghitung Remaining Useful Life (RUL) komponen kritis dan memberikan rekomendasi jadwal perbaikan secara presisi.",
    category: "Industrial & IoT",
    tags: ["IoT", "Machine Learning", "Python", "MQTT", "Dashboard"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    link: "https://github.com/ricky1211",
    github: "https://github.com/ricky1211",
    soon: false,
    color: "#06b6d4",
    stats: [
      { label: "Akurasi Prediksi", value: "96.4%" },
      { label: "Reduksi Downtime", value: "38%" },
      { label: "Sensor Latency", value: "< 200ms" },
      { label: "Monitoring Point", value: "24/7 Realtime" },
    ],
    features: [
      "Pemantauan telemetri multi-sensor (akselerometer getaran, termokopel, akustik)",
      "Deteksi anomali otomatis berbasis algoritma Autoencoder & Random Forest",
      "Perhitungan Remaining Useful Life (RUL) dan estimasi Mean Time Between Failures (MTBF)",
      "Sistem alarm bertingkat (Warning, Critical, Emergency) via Telegram & Webhook",
      "Visualisasi FFT (Fast Fourier Transform) untuk spektrum frekuensi vibrasi bearing"
    ],
    techStack: ["Python", "FastAPI", "TensorFlow/PyTorch", "ESP32 Sensor Hub", "MQTT / InfluxDB", "Next.js / Chart.js"],
    impact: "Menekan risiko unscheduled downtime mesin pabrik hingga 38% dan menghemat biaya penggantian spare-part darurat."
  },

  // 2. Preventive Maintenance (Industrial & IoT)
  {
    id: "preventive-maintenance",
    title: "Preventive Maintenance",
    subtitle: "Manajemen Jadwal Perawatan & Inventaris Aset Mesin Terjadwal",
    desc: "Sistem pengelolaan work order perawatan preventif, riwayat servis mesin, checklist digital mekanik, dan monitoring lifecycle aset pabrik.",
    longDesc: "Aplikasi Preventive Maintenance memusatkan operasional tim maintenance pabrik dari sistem pencatatan kertas ke platform digital terintegrasi. Menampilkan kalender servis otomatis, pelacakan jam operasi mesin (running hours), alokasi teknisi, checklist inspeksi digital berkala, serta pelaporan Mean Time To Repair (MTTR).",
    category: "Industrial & IoT",
    tags: ["Maintenance", "Next.js", "PostgreSQL", "Workflow", "Asset Management"],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    link: "https://github.com/ricky1211",
    github: "https://github.com/ricky1211",
    soon: false,
    color: "#3b82f6",
    stats: [
      { label: "Penyelesaian WO", value: "98.2%" },
      { label: "Efisiensi MTTR", value: "-25% Waktu" },
      { label: "Aset Terdaftar", value: "150+ Mesin" },
      { label: "Paperless Rate", value: "100%" },
    ],
    features: [
      "Penjadwalan otomatis berdasarkan kalender dan counter running-hours mesin",
      "Digital Work Order dispatch dengan penugasan teknisi dan status SLA",
      "Checklist inspeksi harian/mingguan dengan verifikasi QR Code di lokasi mesin",
      "Riwayat perbaikan komprehensif, konsumsi spare-part, dan histori pergantian",
      "Laporan analitik MTBF & MTTR untuk evaluasi performa departemen maintenance"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Prisma ORM"],
    impact: "Meningkatkan kepatuhan jadwal perawatan mesin hingga 98% dan memangkas waktu birokrasi work order sebesar 60%."
  },

  // 3. Claim Customers (Enterprise & Finance)
  {
    id: "claim-customers",
    title: "Claim Customers System",
    subtitle: "Enterprise Quality Assurance & Customer Claim Resolution Workflow (8D)",
    desc: "Sistem pelacakan klaim kualitas pelanggan, investigasi cacat produk (RCA & 8D Report), koordinasi antar departemen, dan SLA kompensasi.",
    longDesc: "Sistem terpadu untuk menangani klaim komplain kualitas produk dari pelanggan industri manufaktur dan ritel. Dilengkapi metodologi investigasi 8D (Eight Disciplines), penugasan Corrective & Preventive Action (CAPA), perhitungan biaya kerugian akibat produk cacat (Cost of Poor Quality), dan dashboard SLA respon.",
    category: "Enterprise & Finance",
    tags: ["Quality Control", "Enterprise", "8D Report", "React", "SQL"],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    link: "https://github.com/ricky1211",
    github: "https://github.com/ricky1211",
    soon: false,
    color: "#f59e0b",
    stats: [
      { label: "Response SLA", value: "< 24 Jam" },
      { label: "Kasus Terselesaikan", value: "99.1%" },
      { label: "Cost Saving", value: "30% COPQ" },
      { label: "Metodologi", value: "8D & CAPA" },
    ],
    features: [
      "Portal registrasi klaim cacat produk pelanggan dengan upload bukti foto/video",
      "Sistem generator investigasi 8D otomatis berstandar industri otomotif/elektronik",
      "Workflow approval berjenjang (QA, Engineering, Production, Finance Manager)",
      "Pelacakan Root Cause Analysis (Fishbone 5M + 5-Why Analysis)",
      "Penerbitan otomatis Credit Note / Garansi Penggantian Barang"
    ],
    techStack: ["React", "TypeScript", "REST API", "PostgreSQL", "Tailwind CSS", "PDF Exporter"],
    impact: "Mempercepat closing klaim pelanggan dari rata-rata 14 hari menjadi 3 hari kerja dengan transparansi investigasi penuh."
  },

  // 4. Andon Quality (Industrial & IoT)
  {
    id: "andon-quality",
    title: "Andon Quality Monitoring",
    subtitle: "Sistem Visual Andon Floor & Deteksi Defect Real-Time di Lini Produksi",
    desc: "Sistem display Andon interaktif pabrik untuk memberi sinyal darurat kualitas lini perakitan, peringatan audio-visual, dan live OEE tracking.",
    longDesc: "Andon Quality adalah sistem kontrol visual lini manufaktur modern yang memungkinkan operator menghentikan lini produksi ketika mendeteksi anomali kualitas (Jidoka). Menampilkan status warna Andon (Hijau, Kuning, Merah), menghitung OEE (Overall Equipment Effectiveness) detik-ke-detik, serta mengirim notifikasi instan ke tim QA dan Leader shift.",
    category: "Industrial & IoT",
    tags: ["Andon System", "Smart Factory", "WebSockets", "IoT", "OEE"],
    image: "https://images.unsplash.com/photo-1565515267329-8739cf9e525a?auto=format&fit=crop&w=1200&q=80",
    link: "https://github.com/ricky1211",
    github: "https://github.com/ricky1211",
    soon: false,
    color: "#ef4444",
    stats: [
      { label: "Latency Update", value: "< 50ms" },
      { label: "Defect Prevention", value: "-45% Scrap" },
      { label: "Lini Terhubung", value: "12 Line" },
      { label: "OEE Tracking", value: "Live Dynamic" },
    ],
    features: [
      "Tampilan Fullscreen TV Display resolusi tinggi khusus dashboard lantai pabrik",
      "WebSockets real-time sync antara tombol fisik operator dan monitor manajemen",
      "Matriks defect visual (peta lokasi cacat produk per stasiun kerja)",
      "Audio siren dan push alert ke smartwatch leader saat terjadi line stop",
      "Statistik otomatis pareto defect harian, mingguan, dan pergantian shift"
    ],
    techStack: ["Node.js WebSocket", "React", "Tailwind CSS", "ESP32 Andon Box", "Redis", "SQLite/MySQL"],
    impact: "Menurunkan produk scrap hingga 45% dan memangkas waktu respon supervisor lantai kerja ke stasiun bermasalah menjadi di bawah 40 detik."
  },

  // 5. Capex Management (Enterprise & Finance)
  {
    id: "capex",
    title: "Capex Management System",
    subtitle: "Platform Anggaran Belanja Modal, Evaluasi ROI, & Lifecycle Investasi",
    desc: "Aplikasi penganggaran Capital Expenditure (CAPEX) perusahaan, tracking realisasi budget pengadaan mesin, evaluasi kelayakan ROI, dan approval hierarkis.",
    longDesc: "Capex Management System mengotomatisasi siklus belanja modal perusahaan dari pengajuan proposal pembelian mesin baru, kalkulasi kelayakan investasi (NPV, IRR, Payback Period), tracking kontrak vendor, hingga realisasi penerimaan aset dan depresiasi tahunan.",
    category: "Enterprise & Finance",
    tags: ["CAPEX", "Finance Tech", "ROI Engine", "Next.js", "Enterprise"],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
    link: "https://github.com/ricky1211",
    github: "https://github.com/ricky1211",
    soon: false,
    color: "#10b981",
    stats: [
      { label: "Akurasi Budget", value: "99.8%" },
      { label: "Approval Time", value: "3x Lebih Cepat" },
      { label: "ROI Analysis", value: "NPV & IRR Auto" },
      { label: "Audit Trail", value: "100% Verified" },
    ],
    features: [
      "Formulir Proposal CAPEX dengan kalkulator ROI, IRR, dan Payback Period terpasang",
      "Matriks otorisasi approval bertingkat sesuai batas nominal anggaran (DoA)",
      "Real-time budget burn rate vs target alokasi kuartalan/tahunan",
      "Integrasi dokumen Purchase Order, penawaran vendor, dan serah terima BAST",
      "Export laporan komprehensif ke Excel dan PDF untuk komite direksi"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma ORM", "PostgreSQL", "Chart.js"],
    impact: "Mencegah pembengkakan anggaran belanja modal (budget overrun) dan mempercepat siklus approval investasi alat baru dari 3 minggu menjadi 3 hari."
  },

  // 6. Absensi Seminar (Existing)
  {
    id: "absensi-seminar",
    title: "Absensi Seminar",
    subtitle: "Sistem Presensi Real-Time, QR Code Check-in & Generator Sertifikat",
    desc: "Sistem absensi seminar real-time berbasis Firebase Database dengan fitur scan QR Code, export Excel, dan distribusi sertifikat digital otomatis.",
    longDesc: "Aplikasi web manajemen event dan presensi peserta seminar akademik. Menggunakan teknologi Firebase Realtime Database untuk sinkronisasi check-in peserta tanpa reload, validasi unik nomor pendaftaran, ekspor rekapitulasi kehadiran ke Excel (.xlsx), dan pengiriman e-sertifikat langsung ke email peserta.",
    category: "Web & Mobile",
    tags: ["Firebase", "React", "Vercel", "QR Code", "Realtime"],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    link: "https://absensi-seminar.vercel.app/",
    github: "https://github.com/ricky1211",
    soon: false,
    color: "#e8673a",
    stats: [
      { label: "Peserta Aktif", value: "500+ Hadir" },
      { label: "Check-in Speed", value: "< 2 Detik" },
      { label: "Format Export", value: "Excel & PDF" },
      { label: "Database", value: "Firebase NoSQL" },
    ],
    features: [
      "Scanner QR Code presensi responsif via kamera smartphone maupun webcam",
      "Pembaruan data peserta hadir secara real-time via Firebase Realtime Database",
      "Fitur download laporan kehadiran dalam format spreadsheet Excel",
      "Manajemen database nomor sertifikat dan verifikasi keaslian dokumen",
      "User interface adaptif untuk panitia penerima tamu dan peserta"
    ],
    techStack: ["React.js", "Firebase Realtime DB", "Tailwind CSS", "Vercel Hosting", "XLSX Lib"],
    impact: "Mengeliminasi antrian panjang pendaftaran seminar hingga 85% dengan presensi instan QR code."
  },

  // 7. Landing Page SEO (Existing)
  {
    id: "landing-page-seo",
    title: "Landing Page SEO",
    subtitle: "Website Pemasaran Teroptimasi Core Web Vitals & Search Engine Authority",
    desc: "Landing page modern berkinerja ultra-cepat dengan optimasi skor Google Lighthouse 100, metadata OpenGraph lengkap, dan struktur schema markup.",
    longDesc: "Proyek pengembangan landing page komersial yang difokuskan pada keunggulan Search Engine Optimization (SEO) dan kecepatan pemuatan halaman (Core Web Vitals). Menerapkan SSR (Server-Side Rendering), kompresi gambar modern, semantic HTML5, dan JSON-LD Structured Data untuk meningkatkan visibilitas di Google Search.",
    category: "Web & Mobile",
    tags: ["Next.js", "SEO", "Marketing", "Tailwind", "Performance"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    link: "https://project-uas-digital-marketing-klmpk.vercel.app/",
    github: "https://github.com/ricky1211",
    soon: false,
    color: "#3a7be8",
    stats: [
      { label: "Lighthouse Score", value: "99/100" },
      { label: "Page Load Time", value: "< 0.8s" },
      { label: "SEO Indexing", value: "Schema.org" },
      { label: "Device Friendly", value: "100% Mobile" },
    ],
    features: [
      "Penerapan Next.js Metadata API modern dan dynamic Open Graph preview",
      "Struktur Semantic HTML5 dengan breadcrumbs dan microdata JSON-LD",
      "Optimasi gambar otomatis WebP/AVIF dengan zero layout shift (CLS 0.00)",
      "Integrasi formulir lead capture dan CTA interaktif terarah",
      "Analitik konversi traffic dan heat map tracking ready"
    ],
    techStack: ["Next.js App Router", "TypeScript", "Tailwind CSS", "Vercel Analytics"],
    impact: "Mencapai nilai sempurna di Google PageSpeed Insights dan meningkatkan rasio konversi pengunjung halaman."
  },

  // 8. NLP Project (Existing)
  {
    id: "nlp-project",
    title: "NLP Bahasa Indonesia",
    subtitle: "Natural Language Processing untuk Analisis Sentimen & Klasifikasi Teks",
    desc: "Aplikasi Natural Language Processing untuk analisis sentimen teks opini berbahasa Indonesia dengan visualisasi word cloud interaktif.",
    longDesc: "Aplikasi berbasis machine learning untuk memproses teks bahasa Indonesia menggunakan teknik NLP mutakhir (tokenizing, stemming Sastrawi, stopword removal, TF-IDF). Mampu mengklasifikasikan polaritas sentimen (Positif, Netral, Negatif) dari ribuan ulasan publik dengan visualisasi distribusi kata kunci interaktif.",
    category: "AI & Data Science",
    tags: ["Python", "NLP", "Machine Learning", "Streamlit", "Sastrawi"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80",
    link: "https://project-uas-nlp.vercel.app/",
    github: "https://github.com/ricky1211",
    soon: false,
    color: "#8b5cf6",
    stats: [
      { label: "Model Accuracy", value: "91.8%" },
      { label: "Corpus Size", value: "10k+ Data" },
      { label: "Algorithm", value: "Naïve Bayes / SVM" },
      { label: "Pre-processing", value: "Sastrawi Indo" },
    ],
    features: [
      "Pipeline preprocessing teks bahasa Indonesia (Cleansing, Case Folding, Stopwords, Stemming)",
      "Ekstraksi fitur TF-IDF dan Word Vectorization",
      "Klasifikasi sentimen otomatis multi-class dengan confusion matrix",
      "Visualisasi Word Cloud interaktif untuk kata teratas yang sering muncul",
      "Input teks kustom langsung untuk pengujian sentimen real-time"
    ],
    techStack: ["Python", "NLTK", "Scikit-Learn", "Sastrawi", "Streamlit / Next.js", "Pandas"],
    impact: "Mempermudah ekstraksi opini publik dalam skala besar untuk pengambilan keputusan strategis."
  },

  // 9. MCGOO Guide (Existing)
  {
    id: "mcgoo-guide",
    title: "MCGOO Guide",
    subtitle: "Interactive Strategy Guide & Synergy Builder untuk Game Mobile",
    desc: "Landing page panduan interaktif Magic Chest dengan kalkulator sinergi, rekomendasi commander, dan strategi combo tier list.",
    longDesc: "Platform web interaktif yang didedikasikan untuk komunitas gamer mobile strategi (Magic Chest). Menyediakan panduan lengkap sinergi hero, efek item equipment, rekomendasi pemilihan commander terkuat, serta kalkulator sinergi real-time untuk menyusun formasi kemenangan.",
    category: "Web & Mobile",
    tags: ["React", "Tailwind CSS", "Gaming UI", "Interactive", "Vercel"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
    link: "https://magicchestguide.vercel.app/",
    github: "https://github.com/ricky1211",
    soon: false,
    color: "#f59e0b",
    stats: [
      { label: "Data Hero", value: "80+ Karakter" },
      { label: "Sinergi Combo", value: "20+ Faksi" },
      { label: "Interaktivitas", value: "Live Calculator" },
      { label: "Community", value: "Mobile Gamers" },
    ],
    features: [
      "Kalkulator komposisi sinergi interaktif dengan perhitungan buff tim otomatis",
      "Database lengkap hero, harga gold, skill aktif, dan rekomendasi item",
      "Tier list strategi meta terbaru yang diperbarui berkala",
      "Desain antarmuka gaming yang dinamis dengan animasi transisi halus",
      "Optimasi performa tinggi untuk akses lancar di smartphone"
    ],
    techStack: ["React.js", "Tailwind CSS", "Lucide Icons", "Vercel"],
    impact: "Membantu ribuan pemain menguasai strategi sinergi hero dengan penyajian data yang intuitif dan cepat."
  },

  // 10. Website Berita Live (Existing)
  {
    id: "website-berita-live",
    title: "Website Berita Live",
    subtitle: "Portal Berita Digital Responsif dengan Live Search & Dynamic News Feed",
    desc: "Portal berita dengan integrasi REST API, pemfilteran kategori dinamis, pencarian artikel instan, dan pembaca artikel yang nyaman.",
    longDesc: "Aplikasi portal media berita digital modern yang terhubung ke REST API berita terkini. Menghadirkan berita terupdate dari berbagai kanal (Nasional, Teknologi, Olahraga, Bisnis) lengkap dengan paginasi, pencarian judul instan, dan mode baca bersih tanpa distraksi.",
    category: "Web & Mobile",
    tags: ["React", "REST API", "Frontend", "News App", "Tailwind"],
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80",
    link: "https://fe-berita-mandiri-seal.vercel.app/",
    github: "https://github.com/ricky1211",
    soon: false,
    color: "#10b981",
    stats: [
      { label: "Kategori Berita", value: "8+ Topik" },
      { label: "Search Latency", value: "< 100ms" },
      { label: "Tampilan", value: "Clean Reader" },
      { label: "Integrasi", value: "Live REST API" },
    ],
    features: [
      "Konsumsi REST API berita dinamis dengan cache caching cerdas",
      "Fitur pencarian live search real-time tanpa delay reload halaman",
      "Pilihan kategori topik artikel (Teknologi, Olahraga, Bisnis, Hiburan)",
      "Halaman detail berita dengan tipografi nyaman untuk membaca lama",
      "Desain adaptif penuh untuk tablet, ponsel pintar, dan desktop"
    ],
    techStack: ["React", "Tailwind CSS", "RESTful API", "Axios", "Vercel"],
    impact: "Menghadirkan pengalaman membaca berita modern dengan akses konten yang cepat dan tampilan minimalis."
  },

  // 11. Data Science Dashboard (Existing)
  {
    id: "data-science-dashboard",
    title: "Data Science Dashboard",
    subtitle: "Exploratory Data Analysis & Interactive Business Intelligence Suite",
    desc: "Dashboard analitik data interaktif dengan visualisasi multi-chart, statistik korelasi variabel, dan insight metrik performa bisnis.",
    longDesc: "Platform dashboard business intelligence dan analisis data eksploratif. Dirancang untuk mengolah dataset multi-dimensi menjadi grafik interaktif yang mudah dipahami manajemen, mencakup visualisasi tren historis, matriks korelasi, distribusi frekuensi, serta ringkasan KPI eksekutif.",
    category: "AI & Data Science",
    tags: ["Python", "Data Science", "Visualization", "Pandas", "Analytics"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    link: "https://data-science-xi.vercel.app/",
    github: "https://github.com/ricky1211",
    soon: false,
    color: "#ec4899",
    stats: [
      { label: "Dimensi Analisis", value: "15+ Metrik" },
      { label: "Chart Types", value: "Bar, Line, Heatmap" },
      { label: "Filter Dinamis", value: "Multi-parameter" },
      { label: "Data Pipeline", value: "Automated ETL" },
    ],
    features: [
      "Visualisasi grafik interaktif (Line Chart, Bar Chart, Scatter Plot, Pie)",
      "Heatmap korelasi antar variabel untuk menemukan pola tersembunyi",
      "Filter rentang tanggal dan parameter metrik kustom yang responsif",
      "Ekstraksi statistik deskriptif otomatis (Mean, Median, Standar Deviasi)",
      "Ekspor laporan visual dalam format resolusi tinggi"
    ],
    techStack: ["Python", "Data Analytics", "Pandas", "Plotly / Chart.js", "Next.js"],
    impact: "Mempercepat proses pengambilan keputusan berbasis data hingga 70% melalui ringkasan grafik interaktif."
  },

  // 12. WargaRT02 App (Existing)
  {
    id: "wargart02-app",
    title: "WargaRT02 App",
    subtitle: "Smart Community Living & IoT Automated Plant Watering System",
    desc: "Aplikasi manajemen komunitas warga RT 02 dengan fitur iuran digital, pengumuman warga, serta integrasi sistem penyiraman otomatis IoT.",
    longDesc: "Ekosistem smart community yang menggabungkan aplikasi seluler warga dengan perangkat keras IoT di lingkungan RT 02. Mengatur pencatatan kas & iuran transparan, pengumuman darurat, serta kendali otomatisasi penyiraman taman lingkungan berbasis sensor kelembaban tanah ESP32.",
    category: "Industrial & IoT",
    tags: ["Flutter", "Firebase", "IoT", "ESP32", "Smart City"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    link: "https://github.com/ricky1211",
    github: "https://github.com/ricky1211",
    soon: false,
    color: "#6366f1",
    stats: [
      { label: "Cakupan Warga", value: "RT 02 Cikarang" },
      { label: "Sensor Kelembaban", value: "IoT ESP32" },
      { label: "Efisiensi Air", value: "Hemat 35%" },
      { label: "Pencatatan Kas", value: "Transparan Realtime" },
    ],
    features: [
      "Dashboard iuran bulanan dan pelaporan keuangan kas lingkungan transparan",
      "Sistem siaran pengumuman warga dan kontak darurat lingkungan",
      "Monitoring sensor kelembaban tanah taman dan kontrol relay pompa air otomatis",
      "Pencatatan data kependudukan dan surat pengantar digital warga",
      "Notifikasi reminder iuran dan agenda gotong royong"
    ],
    techStack: ["Flutter", "Dart", "Firebase Firestore", "ESP32", "C++ Arduino", "MQTT"],
    impact: "Mendukung digitalisasi lingkungan warga dan otomatisasi pemeliharaan area hijau warga secara terukur."
  }
];

export interface SkillCategory {
  label: string;
  items: string[];
}

export const skillsData: SkillCategory[] = [
  { label: "Frontend", items: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS", "TypeScript"] },
  { label: "Backend", items: ["PHP", "Python", "Java", "Dart", "REST API", "Node.js"] },
  { label: "Database", items: ["MySQL", "PostgreSQL", "Firebase", "Supabase", "Redis"] },
  { label: "Data & AI", items: ["Data Analysis", "NLP", "Machine Learning", "Pandas", "Scikit-Learn"] },
  { label: "Industrial & IoT", items: ["Arduino", "ESP32", "Sensor Hub", "MQTT", "Mikrokontroler", "Andon System"] },
  { label: "Deploy & Tools", items: ["Vercel", "Git", "GitHub", "Docker", "Postman", "Figma"] },
];
