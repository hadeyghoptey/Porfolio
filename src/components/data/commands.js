// Import modular commands
import { systeminfo, uptime, version } from "./systemCommands";
import { randomquote, stats, calendar, motd } from "./utilityCommands";
import { 
  wow, fuck, sex, butt, muji, randi, 
  sudo, hack, hello, hi, thanks, thank, 
  love, cool, nice 
} from "./easterEggCommands";

export const cmdMap = {
  help: {
    description: "List all available commands",
    action: () => [
      "Available commands:",
      "",
      "📋 Information:",
      `  <span style="color: #1e90ff">about</span>      <span style="color: #1e90ff">–</span> <span style="color: #b5651d">About me</span>`,
      `  <span style="color: #1e90ff">skills</span>     <span style="color: #1e90ff">–</span> <span style="color: #b5651d">My technical skills</span>`,
      `  <span style="color: #1e90ff">experience</span> <span style="color: #1e90ff">–</span> <span style="color: #b5651d">Work experience</span>`,
      `  <span style="color: #1e90ff">education</span>  <span style="color: #1e90ff">–</span> <span style="color: #b5651d">Educational background</span>`,
      `  <span style="color: #1e90ff">whoami</span>     <span style="color: #1e90ff">–</span> <span style="color: #b5651d">Quick intro</span>`,
      "",
      "🔗 Connect:",
      `  <span style="color: #1e90ff">socials</span>    <span style="color: #1e90ff">–</span> <span style="color: #b5651d">My social links</span>`,
      `  <span style="color: #1e90ff">contact</span>    <span style="color: #1e90ff">–</span> <span style="color: #b5651d">Get in touch</span>`,
      `  <span style="color: #1e90ff">resume</span>     <span style="color: #1e90ff">–</span> <span style="color: #b5651d">Download my resume</span>`,
      "",
      "💼 Portfolio:",
      `  <span style="color: #1e90ff">projects</span>   <span style="color: #1e90ff">–</span> <span style="color: #b5651d">My projects</span>`,
      `  <span style="color: #1e90ff">gallery</span>    <span style="color: #1e90ff">–</span> <span style="color: #b5651d">View my gallery</span>`,
      "",
      "🖥️ System:",
      `  <span style="color: #1e90ff">systeminfo</span> <span style="color: #1e90ff">–</span> <span style="color: #b5651d">Display system information</span>`,
      `  <span style="color: #1e90ff">uptime</span>     <span style="color: #1e90ff">–</span> <span style="color: #b5651d">Show session uptime</span>`,
      `  <span style="color: #1e90ff">stats</span>      <span style="color: #1e90ff">–</span> <span style="color: #b5651d">Session statistics</span>`,
      `  <span style="color: #1e90ff">version</span>    <span style="color: #1e90ff">–</span> <span style="color: #b5651d">Website version info</span>`,
      "",
      "🎲 Fun:",
      `  <span style="color: #1e90ff">randomquote</span> <span style="color: #1e90ff">–</span> <span style="color: #b5651d">Random inspirational quote</span>`,
      `  <span style="color: #1e90ff">calendar</span>   <span style="color: #1e90ff">–</span> <span style="color: #b5651d">Display current month</span>`,
      `  <span style="color: #1e90ff">motd</span>       <span style="color: #1e90ff">–</span> <span style="color: #b5651d">Message of the day</span>`,
      "",
      "⚙️ Utility:",
      `  <span style="color: #1e90ff">clear</span>      <span style="color: #1e90ff">–</span> <span style="color: #b5651d">Clear the terminal</span>`,
      `  <span style="color: #1e90ff">help</span>       <span style="color: #1e90ff">–</span> <span style="color: #b5651d">Show this list</span>`,
      "",
      "💡 Tip: Use Tab for autocomplete, ↑/↓ for command history",
    ],
  },

  about: {
    description: "About me",
    action: () => [
      "Hey, I’m Manash Hada from Bhaktapur, Nepal.",
      "Currently a 2nd-year BScIT student at <a href='https://www.presidential.edu.np/' target='_blank' style='color:#ffcc70; text-decoration:none; transition:color 0.3s ease;' onmouseover=\"this.style.color='#ffdca8'\" onmouseout=\"this.style.color='#ffcc70'\">Presidential Graduate School</a>.",
      "Focused on offensive security, penetration testing, and real-world exploit simulation.",
      "Also building with the <a href='https://www.mongodb.com/mern-stack' target='_blank' style='color:#61dafb; text-decoration:none; transition:color 0.3s ease;' onmouseover=\"this.style.color='#aeeaff'\" onmouseout=\"this.style.color='#61dafb'\">MERN</a> stack.",
      "Tools I live in:",
      "  <a href='https://www.python.org/' target='_blank' style='color:#3776ab; text-decoration:none; transition:color 0.3s ease;' onmouseover=\"this.style.color='#6aa6d9'\" onmouseout=\"this.style.color='#3776ab'\">Python</a> · <a href='https://portswigger.net/burp' target='_blank' style='color:#ff6b35; text-decoration:none; transition:color 0.3s ease;' onmouseover=\"this.style.color='#ff9870'\" onmouseout=\"this.style.color='#ff6b35'\">Burp Suite</a> · <a href='https://www.kali.org/tools/gobuster/' target='_blank' style='color:#00d4aa; text-decoration:none; transition:color 0.3s ease;' onmouseover=\"this.style.color='#5ef3d3'\" onmouseout=\"this.style.color='#00d4aa'\">gobuster</a> · <a href='https://www.bettercap.org/' target='_blank' style='color:#00b8ff; text-decoration:none; transition:color 0.3s ease;' onmouseover=\"this.style.color='#6dd6ff'\" onmouseout=\"this.style.color='#00b8ff'\">bettercap</a> · <a href='https://www.metasploit.com/' target='_blank' style='color:#ed143d; text-decoration:none; transition:color 0.3s ease;' onmouseover=\"this.style.color='#ff5b7a'\" onmouseout=\"this.style.color='#ed143d'\">Metasploit</a>",
      "When I’m not hacking, I’m either playing chess or asleep.",
      "Let’s connect! — <a href='mailto:manashada@proton.me' style='color:#6d4aff; text-decoration:none; transition:color 0.3s ease;' onmouseover=\"this.style.color='#a18dff'\" onmouseout=\"this.style.color='#6d4aff'\">Email me</a> or drop a text on <a href='https://www.linkedin.com/in/manash-hada-12694u/' target='_blank' style='color:#0077b5; text-decoration:none; transition:color 0.3s ease;' onmouseover=\"this.style.color='#4db0e8'\" onmouseout=\"this.style.color='#0077b5'\">LinkedIn</a>.",
    ],
  },

  socials: {
    description: "Social links",
    action: () => [
      `<a href="mailto:manashada@proton.me" target="_blank" rel="noopener noreferrer" style="color:#8e44ad; text-decoration:none; transition: color 0.3s ease;" onmouseover="this.style.color='#b266d1'" onmouseout="this.style.color='#8e44ad'">Email: <span style="color:#b5651d; transition: color 0.3s ease;" onmouseover="this.style.color='#d4825a'" onmouseout="this.style.color='#b5651d'">manashada@proton.me</span></a>`,
      `<a href="https://github.com/hadeyghoptey" target="_blank" rel="noopener noreferrer" style="color:#333; text-decoration:none; transition: color 0.3s ease;" onmouseover="this.style.color='#777'" onmouseout="this.style.color='#333'">GitHub: <span style="color:#b5651d; transition: color 0.3s ease;" onmouseover="this.style.color='#d4825a'" onmouseout="this.style.color='#b5651d'">hadeyghoptey</span></a>`,
      `<a href="https://www.linkedin.com/in/manash-hada-12694u/" target="_blank" rel="noopener noreferrer" style="color:#0077b5; text-decoration:none; transition: color 0.3s ease;" onmouseover="this.style.color='#3399cc'" onmouseout="this.style.color='#0077b5'">LinkedIn: <span style="color:#b5651d; transition: color 0.3s ease;" onmouseover="this.style.color='#d4825a'" onmouseout="this.style.color='#b5651d'">Manash Hada</span></a>`,
      `<a href="https://medium.com/@hadamanash2023" target="_blank" rel="noopener noreferrer" style="color:#00ab6c; text-decoration:none; transition: color 0.3s ease;" onmouseover="this.style.color='#33d98a'" onmouseout="this.style.color='#00ab6c'">Medium: <span style="color:#b5651d; transition: color 0.3s ease;" onmouseover="this.style.color='#d4825a'" onmouseout="this.style.color='#b5651d'">hadamanash2023</span></a>`,
      `<a href="https://tryhackme.com/p/hadeyghoptey" target="_blank" rel="noopener noreferrer" style="color:#E43F3F; text-decoration:none; transition: color 0.3s ease;" onmouseover="this.style.color='#ff5c5c'" onmouseout="this.style.color='#E43F3F'">TryHackMe: <span style="color:#b5651d; transition: color 0.3s ease;" onmouseover="this.style.color='#d4825a'" onmouseout="this.style.color='#b5651d'">hadeyghoptey</span></a>`,
      `<a href="https://profile.hackthebox.com/profile/019cfb4f-f67e-7359-b0d1-083445e3c8c4" target="_blank" rel="noopener noreferrer" style="color:#9fef00; text-decoration:none; transition: color 0.3s ease;" onmouseover="this.style.color='#c5ff4d'" onmouseout="this.style.color='#9fef00'">HackTheBox: <span style="color:#b5651d; transition: color 0.3s ease;" onmouseover="this.style.color='#d4825a'" onmouseout="this.style.color='#b5651d'">hadeyghoptey</span></a>`,
    ],
  },

  projects: {
    description: "My projects",
    action: () => [
      `<a href="https://github.com/sadistic2keed/Words-Counter" target="_blank" rel="noopener noreferrer" style="color:#ffb347; text-decoration:none; transition: color 0.3s ease;" onmouseover="this.style.color='#ffd27f'" onmouseout="this.style.color='#ffb347'">Words-Counter</a> — <span style="color:#b5651d; transition: color 0.3s ease;" onmouseover="this.style.color='#d4825a'" onmouseout="this.style.color='#b5651d'">Simple CLI tool to count words in any given text or file.</span>`,

      `<a href="https://github.com/sadistic2keed/ESP32-Marauder" target="_blank" rel="noopener noreferrer" style="color:#00bfae; text-decoration:none; transition: color 0.3s ease;" onmouseover="this.style.color='#4de5d5'" onmouseout="this.style.color='#00bfae'">ESP32-Marauder</a> — <span style="color:#b5651d; transition: color 0.3s ease;" onmouseover="this.style.color='#d4825a'" onmouseout="this.style.color='#b5651d'">Wi-Fi & Bluetooth pentesting toolkit for ESP32 boards.</span>`,

      `<a href="https://github.com/sadistic2keed/ESP8266-DEAUTH" target="_blank" rel="noopener noreferrer" style="color:#1de9b6; text-decoration:none; transition: color 0.3s ease;" onmouseover="this.style.color='#6fffe0'" onmouseout="this.style.color='#1de9b6'">ESP8266-DEAUTH</a> — <span style="color:#b5651d; transition: color 0.3s ease;" onmouseover="this.style.color='#d4825a'" onmouseout="this.style.color='#b5651d'">Deauthentication attack tool using ESP8266 microcontroller.</span>`,

      `<a href="https://github.com/sadistic2keed/BAU_KO_PHONE" target="_blank" rel="noopener noreferrer" style="color:#ff7043; text-decoration:none; transition: color 0.3s ease;" onmouseover="this.style.color='#ffa07a'" onmouseout="this.style.color='#ff7043'">BAU_KO_PHONE</a> — <span style="color:#b5651d; transition: color 0.3s ease;" onmouseover="this.style.color='#d4825a'" onmouseout="this.style.color='#b5651d'">adb-based Android hacking.</span>`,

      `<a href="https://github.com/sadistic2keed/DEAUTH-with-Wifi-Dongle" target="_blank" rel="noopener noreferrer" style="color:#ff5252; text-decoration:none; transition: color 0.3s ease;" onmouseover="this.style.color='#ff8a80'" onmouseout="this.style.color='#ff5252'">DEAUTH-with-Wifi-Dongle</a> — <span style="color:#b5651d; transition: color 0.3s ease;" onmouseover="this.style.color='#d4825a'" onmouseout="this.style.color='#b5651d'">Wi-Fi deauthentication attack using a compatible dongle.</span>`,

      `<a href="https://github.com/sadistic2keed/Arduino" target="_blank" rel="noopener noreferrer" style="color:#00979d; text-decoration:none; transition: color 0.3s ease;" onmouseover="this.style.color='#33c3c9'" onmouseout="this.style.color='#00979d'">Arduino</a> — <span style="color:#b5651d; transition: color 0.3s ease;" onmouseover="this.style.color='#d4825a'" onmouseout="this.style.color='#b5651d'">Collection of small Arduino projects & experiments with sensors and modules.</span>`,
    ],
  },

  gallery: {
    description: "Gallery",
    action: () => ["__GALLERY__"],
  },

  skills: {
    description: "Technical skills",
    action: () => [
      "Technical Skills:",
      "",
      "🔐 Security & Penetration Testing:",
      "  • Burp Suite, Metasploit, Gobuster, Bettercap",
      "  • Network analysis, vulnerability assessment",
      "  • Wi-Fi & Bluetooth exploitation",
      "  • Web application security testing",
      "",
      "💻 Programming & Development:",
      "  • Python (automation, scripting, security tools)",
      "  • JavaScript/TypeScript (React, Next.js, Node.js)",
      "  • MERN Stack (MongoDB, Express, React, Node)",
      "  • HTML/CSS, Tailwind CSS",
      "",
      "🛠️ Hardware & IoT:",
      "  • ESP32/ESP8266 development",
      "  • Arduino programming",
      "  • ADB (Android Debug Bridge)",
      "",
      "🐧 Operating Systems & Tools:",
      "  • Kali Linux, Linux administration",
      "  • Git/GitHub version control",
      "  • Command line proficiency",
    ],
  },

  experience: {
    description: "Work experience",
    action: () => [
      "Experience:",
      "",
      "🎓 Security Researcher & Developer",
      "  Self-taught | 2023 - Present",
      "  • Developed multiple security tools for Wi-Fi/Bluetooth testing",
      "  • Created ESP32/ESP8266-based penetration testing devices",
      "  • Active on TryHackMe platform for hands-on security practice",
      "  • Published security-related content on Medium",
      "",
      "💡 Open Source Contributor",
      "  GitHub | 2023 - Present",
      "  • Maintained several security and IoT projects",
      "  • Built CLI tools and automation scripts",
      "  • Contributed to hardware hacking community",
    ],
  },

  education: {
    description: "Educational background",
    action: () => [
      "Education:",
      "",
      "🎓 Bachelor of Science in Information Technology (BScIT)",
      "  Presidential Graduate School, Nepal",
      "  1st Year | 2024 - Present",
      "  Focus: Software Development, Cybersecurity, Network Security",
      "",
      "📚 Self-Learning & Certifications:",
      "  • TryHackMe - Active learner",
      "  • Offensive Security practices",
      "  • Web Development (MERN Stack)",
      "  • Hardware hacking & IoT security",
    ],
  },

  contact: {
    description: "Contact information",
    action: () => [
      "📬 Get in Touch:",
      "",
      "I'm always open to interesting conversations and collaboration!",
      "",
      `📧 Email: <a href="mailto:manashada@proton.me" style="color:#6d4aff; text-decoration:none; transition:color 0.3s ease;" onmouseover="this.style.color='#a18dff'" onmouseout="this.style.color='#6d4aff'">manashada@proton.me</a>`,
      `💼 LinkedIn: <a href="https://www.linkedin.com/in/manash-hada-12694u/" target="_blank" style="color:#0077b5; text-decoration:none; transition:color 0.3s ease;" onmouseover="this.style.color='#4db0e8'" onmouseout="this.style.color='#0077b5'">Manash Hada</a>`,
      `🐙 GitHub: <a href="https://github.com/hadeyghoptey" target="_blank" style="color:#333; text-decoration:none; transition:color 0.3s ease;" onmouseover="this.style.color='#777'" onmouseout="this.style.color='#333'">hadeyghoptey</a>`,
      "",
      "Feel free to reach out for:",
      "  • Security research collaboration",
      "  • Project discussions",
      "  • Job opportunities",
      "  • Just to say hi! 👋",
    ],
  },

  resume: {
    description: "Download resume",
    action: () => [
      "📄 Resume:",
      "",
      "To download my resume, please contact me via:",
      `📧 <a href="mailto:manashada@proton.me?subject=Resume Request" style="color:#6d4aff; text-decoration:none; transition:color 0.3s ease;" onmouseover="this.style.color='#a18dff'" onmouseout="this.style.color='#6d4aff'">manashada@proton.me</a>`,
      "",
      "Or view my complete profile on:",
      `💼 <a href="https://www.linkedin.com/in/manash-hada-12694u/" target="_blank" style="color:#0077b5; text-decoration:none; transition:color 0.3s ease;" onmouseover="this.style.color='#4db0e8'" onmouseout="this.style.color='#0077b5'">LinkedIn</a>`,
    ],
  },

  whoami: {
    description: "Quick introduction",
    action: () => [
      "guest@arch: Manash Hada",
      "Location: Bhaktapur, Nepal 🇳🇵",
      "Role: Security Researcher & Full-Stack Developer",
      "Status: 1st-year BScIT student",
      "Interests: Offensive Security, IoT Hacking, Web Development",
      "Current Activity: Breaking things to learn how they work 🔓",
    ],
  },

  clear: {
    description: "Clear terminal",
    action: () => "__CLEAR__",
  },

  // System commands
  systeminfo,
  uptime,
  version,

  // Utility commands
  randomquote,
  stats,
  calendar,
  motd,

  // Easter egg commands (hidden from help)
  wow,
  fuck,
  sex,
  butt,
  muji,
  randi,
  sudo,
  hack,
  hello,
  hi,
  thanks,
  thank,
  love,
  cool,
  nice,
};
