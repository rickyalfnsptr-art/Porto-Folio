export interface SkillCategory {
  label: string;
  items: string[];
}

export interface Project {
  title: string;
  desc: string;
  tags: string[];
  link: string;
  soon?: boolean;
}

export const skillsData: SkillCategory[] = [
  { label: "Frontend", items: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS", "TypeScript"] },
  { label: "Backend", items: ["PHP", "Python", "Java", "Dart", "REST API", "Node.js"] },
  { label: "Database", items: ["MySQL", "PostgreSQL", "Firebase", "Supabase"] },
  { label: "Data", items: ["Data Analysis", "NLP", "Data Science", "Pandas", "Scikit-Learn"] },
  { label: "IoT", items: ["Arduino", "Sensor", "Mikrokontroler", "ESP32"] },
  { label: "Deploy", items: ["Vercel", "Git", "GitHub", "Cloud Hosting"] },
];

export const projectsData: Project[] = [
  {
    title: "Absensi Seminar",
    desc: "Sistem absensi seminar real-time berbasis Firebase Database dengan fitur export Excel dan manajemen sertifikat.",
    tags: ["Firebase", "React", "Vercel"],
    link: "https://absensi-seminar.vercel.app/",
    soon: false,
  },
  {
    title: "Landing Page SEO",
    desc: "Landing page teroptimasi SEO untuk kampanye digital marketing dengan performa tinggi.",
    tags: ["Next.js", "SEO", "Marketing"],
    link: "https://project-uas-digital-marketing-klmpk.vercel.app/",
    soon: false,
  },
  {
    title: "NLP Project",
    desc: "Aplikasi Natural Language Processing untuk analisis teks berbahasa Indonesia dengan visualisasi interaktif.",
    tags: ["Python", "NLP", "ML"],
    link: "https://project-uas-nlp.vercel.app/",
    soon: false,
  },
  {
    title: "MCGOO Guide",
    desc: "Landing page panduan Magic Chest untuk game mobile dengan UI yang menarik dan informatif.",
    tags: ["React", "Tailwind", "Landing Page"],
    link: "https://magicchestguide.vercel.app/",
    soon: false,
  },
  {
    title: "Website Berita Live",
    desc: "Portal berita dengan konten dinamis, kategori berita, dan fitur pencarian artikel real-time.",
    tags: ["React", "REST API", "Frontend"],
    link: "https://fe-berita-mandiri-seal.vercel.app/",
    soon: false,
  },
  {
    title: "Data Science Dashboard",
    desc: "Dashboard analisis data dengan visualisasi chart interaktif dan exploratory data analysis.",
    tags: ["Python", "Data Science", "Visualization"],
    link: "https://data-science-xi.vercel.app/",
    soon: false,
  },
  {
    title: "WargaRT02 App",
    desc: "Aplikasi manajemen warga RT 02 dengan fitur iuran, pengumuman, dan data kependudukan berbasis IoT.",
    tags: ["Coming Soon", "Flutter", "Firebase"],
    link: "#",
    soon: true,
  },
];
