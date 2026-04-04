export const portfolioContent = {
  site: {
    name: "Manash Hada",
    role: "Offensive Security | PT | Red Team",
    availability: "Open to internships, security collaborations, and teaching-led technical work.",
    status: "Available for focused cyber work",
    statusHref: "#contact",
  },
  navigation: [
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "stack", label: "Stack" },
    { id: "education", label: "Education" },
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Contact" },
    { href: "/gallery", label: "Gallery" },
  ],
  hero: {
    eyebrow: "Cybersecurity Portfolio",
    title: "Practical offensive security, project-driven learning, and tooling built close to the terminal.",
    intro:
      "I am a cybersecurity student focused on offensive security, penetration testing, and hands-on vulnerability assessment. My work stays rooted in shipped projects, embedded attack tooling, and fast iteration across web and hardware surfaces.",
    location: "Kathmandu, Nepal",
  },
  projects: [
    {
      slug: "Flagforge",
      title: "FlagForge",
      titleHref: "https://www.flagforgectf.com/",
      titleAccent: "#ab2d2d",
      category: "Featured Build",
      summary:
        "Cybersecurity-focused project work centered on building a usable product surface around security ideas, team execution, and practical delivery.",
      impact:
        "Used as the featured repository in the portfolio because it best represents shipped work, team collaboration, and security-adjacent product building.",
      stack: ["React", "Node.js", "Express", "MongoDB", "Product Delivery", "Cyber Project"],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/hadeyghoptey/flagForge",
          accent: "#ffffff",
          value: "hadeyghoptey/flagForge",
        },
      ],
      media: [
        {
          src: "/gallery/flagforge-page.png",
          alt: "FlagForge website interface screenshot.",
          kind: "screenshot",
        },
      ],
    },
    {
      slug: "bau-ko-phone",
      title: "BAU_KO_PHONE",
      category: "Android Security Workflow",
      summary:
        "ADB-based Android hacking toolkit built around command-line control, device interaction, and practical mobile-side experimentation.",
      impact:
        "Keeps the work section grounded in offensive experimentation beyond the browser by focusing on Android and device-level workflows.",
      stack: ["Python", "Shell", "ADB", "Android", "Automation"],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/hadeyghoptey/BAU_KO_PHONE",
          accent: "#ffffff",
          value: "hadeyghoptey/BAU_KO_PHONE",
        },
      ],
      media: [],
    },
    {
      slug: "raspberry-pi-nids-with-suricata",
      title: "Raspberry Pi NIDS with Suricata",
      category: "Network Defense Lab",
      summary:
        "Home-lab style network intrusion detection work using Raspberry Pi and Suricata to monitor traffic and surface suspicious activity.",
      impact:
        "Adds defensive visibility and detection engineering to a portfolio otherwise weighted toward offensive practice.",
      stack: ["Raspberry Pi", "Suricata", "Linux", "Network Monitoring", "NIDS"],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/hadeyghoptey/Raspberry-Pi-NIDS-with-Suricata",
          accent: "#ffffff",
          value: "hadeyghoptey/Raspberry-Pi-NIDS-with-Suricata",
        },
      ],
      media: [],
    },
    {
      slug: "secyourflow",
      title: "SecYourFlow",
      titleHref: "https://secyourflow.vercel.app/",
      titleAccent: "#0a66c2",
      category: "Collaborative Security Project",
      summary:
        "A collaborative repository included here as part of the portfolio’s current project focus.",
      impact:
        "Represents team-oriented implementation and broadens the work section beyond solo tooling projects.",
      stack: ["Collaboration", "Security Workflow", "Web Project"],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/lagzenthakuri/secyourflow",
          accent: "#ffffff",
          value: "lagzenthakuri/secyourflow",
        },
      ],
      media: [
        {
          src: "/gallery/secyourflow-page.png",
          alt: "SecYourFlow website interface screenshot.",
          kind: "screenshot",
        },
      ],
    },
    {
      slug: "esp32-marauder",
      title: "ESP32-Marauder",
      category: "Embedded Offensive Tooling",
      summary:
        "Portable Wi-Fi and Bluetooth security experimentation built around ESP32 hardware.",
      impact:
        "Extends the project section into embedded offensive tooling and moves the work closer to hardware-backed attack workflows.",
      stack: ["ESP32", "C++", "Wi-Fi Testing", "Bluetooth Testing", "Hardware Security"],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/hadeyghoptey/ESP32-Marauder",
          accent: "#ffffff",
          value: "hadeyghoptey/ESP32-Marauder",
        },
      ],
      media: [],
    },
    {
      slug: "deauth-with-wifi-dongle",
      title: "DEAUTH with Wi-Fi Dongle",
      category: "Wireless Lab Tool",
      summary:
        "Wireless deauthentication workflow built for a compatible dongle-based testing setup.",
      impact:
        "Adds another practical wireless lab path and shows experimentation across multiple hardware setups.",
      stack: ["Python", "Linux", "Wi-Fi Adapters", "Wireless Security"],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/hadeyghoptey/DEAUTH-with-Wifi-Dongle",
          accent: "#ffffff",
          value: "hadeyghoptey/DEAUTH-with-Wifi-Dongle",
        },
      ],
      media: [],
    },
  ],
  experience: [
    {
      org: "GURU Institute of Engineering and Technology",
      role: "Instructor",
      start: "January 2026",
      end: "Present",
      href: "https://nepguru.com/",
      accent: "#0a66c2",
      summary:
        "Technical teaching role that sharpens communication, mentoring, and the ability to explain complex systems clearly.",
    },
    {
      org: "FlagForge",
      role: "Frontend Developer",
      start: "August 2025",
      end: "Present",
      href: "https://www.flagforgectf.com/",
      accent: "#ab2d2d",
      summary:
        "Contributed frontend implementation for a student-led cybersecurity project presence, translating product ideas into usable interface work.",
    },
    {
      org: "PGS Software Club",
      role: "Teaching Assistant",
      start: "December 2025",
      end: "February 2026",
      href: "https://soft-club.presidential.edu.np/",
      accent: "#8b5cf6",
      summary:
        "Supported peer learning and technical momentum inside a college club environment built around practical software work.",
    },
    {
      org: "FlagForge",
      role: "Backend Development Intern",
      start: "June 2025",
      end: "September 2025",
      href: "https://www.flagforgectf.com/",
      accent: "#ab2d2d",
      summary:
        "Developed a backend using Node.js, Express, and MongoDB with RESTful CRUD endpoints, authentication, authorization, validation, and production-minded error handling.",
    },
  ],
  credentials: [
    {
      title: "Junior Penetration Tester",
      issuer: "INE",
      href: "https://certs.ine.com/db5052a5-334e-4515-9948-12d2cfaad9c2#acc.zTXFNJQl",
      accent: "#f59e0b",
    },
    {
      title: "APIsec Certified Practitioner",
      issuer: "APIsec University",
      href: "https://www.credly.com/badges/07c62653-7ca4-4293-a37b-14894f0c4dcf/public_url",
      accent: "#2563eb",
    },
    {
      title: "Certified Red Team Operations Management",
      issuer: "Red Team Leaders",
      href: "https://courses.redteamleaders.com/exam-completion/c2920989d2273464",
      accent: "#ef4444",
    },
    {
      title: "ISO/IEC 27001:2022 Lead Auditor",
      issuer: "Mastermind Assurance",
      href: "https://www.credly.com/badges/e0e012c8-0ac0-470b-bb25-0bef75750bad/public_url",
      accent: "#8b5cf6",
    },
    {
      title: "Fortinet Certified Associate in Cybersecurity",
      issuer: "Fortinet",
      href: "https://www.credly.com/badges/69ed9eee-239f-4611-9ea4-b19e3ecc8275/public_url",
      accent: "#ee3124",
    },
    {
      title: "FCA – FortiGate Operator",
      issuer: "Fortinet",
      href: "https://www.credly.com/badges/d9e848f8-5532-429d-af55-1dc8ba1015fc/public_url",
      accent: "#ee3124",
    },
  ],
  otherCredentials: [
    {
      title: "Certified Associate Penetration Tester (CAPT)",
      issuer: "Hackviser",
      href: "https://hackviser.com/capt",
      accent: "#39ff14",
    },
    {
      title: "Project Exhibition",
      issuer: "Acme Club Of IT",
      note: "Secured 2nd position with FlagForge (CTF platform)",
    },
    {
      title: "Presidential Innovista 2025",
      issuer: "Presidential Graduate School",
      note: "Certificate of Recognition (4 projects: FlagForge, BAU_KO_PHONE, ESP32-Marauder, CodeKickStarters)",
      href: "https://www.presidential.edu.np/innovation-lab",
      accent: "#ef4444",
    },
    {
      title: "Hack-A-Flag 2025",
      issuer: "IEEE Computer Society Pulchowk Student Branch Chapter",
      note: "Participated (Team: ChandaalShaitaan)",
    },
    {
      title: "Waste Hackathon",
      issuer: "Khaalisisi",
      note: "Certificate of Participation",
    },
    {
      title: "Check Point Jump Start – Quantum Management",
      issuer: "Check Point Software",
      href: "https://www.checkpoint.com/mind/atc/",
      accent: "#e02633",
    },
    {
      title: "Check Point Jump Start – Cloud Security",
      issuer: "Check Point Software",
      href: "https://www.checkpoint.com/mind/atc/",
      accent: "#e02633",
    },
    {
      title: "Check Point Jump Start – SMB",
      issuer: "Check Point Software",
      href: "https://www.checkpoint.com/mind/atc/",
      accent: "#e02633",
    },
    {
      title: "Check Point Jump Start – CloudGuard Posture Management",
      issuer: "Check Point Software",
      href: "https://www.checkpoint.com/mind/atc/",
      accent: "#e02633",
    },
    {
      title: "Introduction to Cybersecurity",
      issuer: "Cisco",
      href: "https://www.netacad.com/cybersecurity",
      accent: "#1ba0d7",
    },
  ],
  skills: {
    offensive: [
      "Web application testing",
      "Network enumeration",
      "Privilege escalation",
      "Vulnerability assessment",
      "Wi-Fi and Bluetooth exploitation",
    ],
    web: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "HTML",
      "Tailwind CSS",
    ],
    scripting: ["Python", "JavaScript", "Shell scripting"],
    hardware: ["ESP Module", "Arduino", "ADB"],
    platforms: [
      "Kali Linux",
      "Parrot OS",
      "Windows",
      "Windows Server",
      "Apache"
    ],
  },
  education: [
    {
      institution: "Presidential Graduate School",
      award: "Bachelor of Science in Information Technology",
      start: "Fall 2024",
      end: "Fall 2028",
      href: "https://www.presidential.edu.np/",
      accent: "#f97316",
    },
    {
      institution: "Trinity International SS & College",
      award: "+2, Biology",
      start: "March 2022",
      end: "April 2024",
      href: "https://www.trinity.edu.np/",
      accent: "#ca8a04",
    },
    {
      institution: "Little Angels' School",
      award: "School Level",
      start: "May 2018",
      end: "April 2022",
      href: "https://www.las.edu.np/",
      accent: "#7f1d1d",
    },
  ],
  resume: {
    href: "/Manash Hada.pdf",
    downloadName: "Manash-Hada.pdf",
    label: "Download Portfolio",
  },
  gallery: {
    href: "/gallery",
    items: [
      {
        src: "/gallery/flagforge-showcase.png",
        title: "FlagForge Showcase",
        note: "Project booth / event",
        alt: "FlagForge project showcase at an event booth.",
        width: 1600,
        height: 1066,
      },
      {
        src: "/gallery/flagforge-page.png",
        title: "FlagForge Website",
        note: "Project page / interface",
        alt: "FlagForge website page screenshot.",
        width: 1920,
        height: 970,
      },
      {
        src: "/gallery/team-flagforge.png",
        title: "Team FlagForge",
        note: "Team / project build",
        alt: "Team photo of the FlagForge builders at their booth.",
        width: 1600,
        height: 1066,
      },
      {
        src: "/gallery/team-safastack.png",
        title: "Team SafaStack",
        note: "Team / collaboration",
        alt: "Group photo of Team SafaStack.",
        width: 1140,
        height: 760,
      },
      {
        src: "/gallery/chandaal-shaitaan.png",
        title: "ChandaalShaitaan",
        note: "Hackathon / team moment",
        alt: "Team ChandaalShaitaan at a hacking event.",
        width: 2048,
        height: 1365,
      },
      {
        src: "/gallery/presidential-innovista.jpg",
        title: "Innovista",
        note: "Exhibition / recognition",
        alt: "Photo from Presidential Innovista.",
        width: 6000,
        height: 4000,
      },
      {
        src: "/gallery/pentester-nepal.png",
        title: "Pentester Nepal",
        note: "Cybersecurity / community",
        alt: "Pentester Nepal event photo.",
        width: 2048,
        height: 1366,
      },
      {
        src: "/gallery/secyourflow-page.png",
        title: "SecYourFlow Website",
        note: "Project page / interface",
        alt: "SecYourFlow website page screenshot.",
        width: 1920,
        height: 970,
      },
      {
        src: "/gallery/literature-event.jpg",
        title: "Literature",
        note: "College / event",
        alt: "Photo labeled Literature from a college event.",
        width: 1600,
        height: 1200,
      },
      {
        src: "/gallery/kid-portrait.jpg",
        title: "Kid",
        note: "Portrait / candid",
        alt: "Portrait photo titled Kid.",
        width: 1008,
        height: 466,
      },
      {
        src: "/gallery/lamp-portrait.jpg",
        title: "Lamp",
        note: "Portrait / candid",
        alt: "Portrait photo titled Lamp.",
        width: 1200,
        height: 1800,
      },
    ],
  },
  contacts: [
    {
      label: "Email",
      value: "manashada@proton.me",
      href: "mailto:manashada@proton.me",
      accent: "#8b5cf6",
    },
    {
      label: "Discord",
      value: "hadeyghopte",
      accent: "#5865F2",
    },
    {
      label: "GitHub",
      value: "hadeyghoptey",
      href: "https://github.com/hadeyghoptey",
      accent: "#ffffff",
    },
    {
      label: "FlagForge",
      value: "Manash-Hada",
      href: "https://www.flagforgectf.com/user/Manash-Hada",
      accent: "#ab2d2d",
    },
    {
      label: "TryHackMe",
      value: "hadeyghoptey",
      href: "https://tryhackme.com/p/hadeyghoptey",
      accent: "#e43f3f",
    },
    {
      label: "Hack The Box",
      value: "hadeyghoptey",
      href: "https://profile.hackthebox.com/profile/019cfb4f-f67e-7359-b0d1-083445e3c8c4",
      accent: "#9fef00",
    },
    {
      label: "LinkedIn",
      value: "manash-hada-12694u",
      href: "https://www.linkedin.com/in/manash-hada-12694u/",
      accent: "#0a66c2",
    },
    {
      label: "Medium",
      value: "@hadamanash2023",
      href: "https://medium.com/@hadamanash2023",
      accent: "white",
    },
  ],
};
