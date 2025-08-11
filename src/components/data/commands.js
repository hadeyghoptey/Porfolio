export const cmdMap = {
  help: {
    description: "List all available commands",
    action: () => [
      "Available commands:",
      `  <span style="color: #1e90ff">help</span>     <span style="color: #1e90ff">–</span> <span style="color: #b5651d">Show this list</span>`,
      `  <span style="color: #1e90ff">about</span>    <span style="color: #1e90ff">–</span> <span style="color: #b5651d">About me</span>`,
      `  <span style="color: #1e90ff">socials</span>  <span style="color: #1e90ff">–</span> <span style="color: #b5651d">My social links</span>`,
      `  <span style="color: #1e90ff">projects</span> <span style="color: #1e90ff">–</span> <span style="color: #b5651d">My projects</span>`,
      `  <span style="color: #1e90ff">gallery</span>  <span style="color: #1e90ff">–</span> <span style="color: #b5651d">View my gallery</span>`,
      `  <span style="color: #1e90ff">clear</span>    <span style="color: #1e90ff">–</span> <span style="color: #b5651d">Clear the terminal</span>`,
    ],
  },

  about: {
    description: "About me",
    action: () => [
      "👋 Hi, I’m Manash Hada.",
      "I’m a cybersecurity student.",
      "Currently sharpening skills in Offensive security tools and scripting.",
    ],
  },
  socials: {
    description: "Social links",
    action: () => [
      `<a href="mailto:manashada@proton.me" style="text-decoration: none; transition: color 0.3s ease;" onmouseover="this.style.color='#66b3ff'" onmouseout="this.style.color='#1e90ff'">Email: <span style="color: #b5651d; transition: color 0.3s ease;" onmouseover="this.style.color='#d4825a'" onmouseout="this.style.color='#b5651d'">manashada@proton.me</span></a>`,
      `<a href="https://github.com/sadistic2keed" style="text-decoration: none; transition: color 0.3s ease;" onmouseover="this.style.color='#66b3ff'" onmouseout="this.style.color='#1e90ff'">GitHub: <span style="color: #b5651d; transition: color 0.3s ease;" onmouseover="this.style.color='#d4825a'" onmouseout="this.style.color='#b5651d'">sadistic2keed</span></a>`,
      `<a href="https://www.linkedin.com/in/manash-hada-12694u/" style="text-decoration: none; transition: color 0.3s ease;" onmouseover="this.style.color='#66b3ff'" onmouseout="this.style.color='#1e90ff'">LinkedIn: <span style="color: #b5651d; transition: color 0.3s ease;" onmouseover="this.style.color='#d4825a'" onmouseout="this.style.color='#b5651d'">Manash Hada</span></a>`,
      `<a href="https://medium.com/@hadamanash2023" style="text-decoration: none; transition: color 0.3s ease;" onmouseover="this.style.color='#66b3ff'" onmouseout="this.style.color='#1e90ff'">Medium: <span style="color: #b5651d; transition: color 0.3s ease;" onmouseover="this.style.color='#d4825a'" onmouseout="this.style.color='#b5651d'">hadamanash2023</span></a>`,
      `<a href="https://www.pinterest.com/s4distycub/" style="text-decoration: none; transition: color 0.3s ease;" onmouseover="this.style.color='#66b3ff'" onmouseout="this.style.color='#1e90ff'">Pinterest: <span style="color: #b5651d; transition: color 0.3s ease;" onmouseover="this.style.color='#d4825a'" onmouseout="this.style.color='#b5651d'">s4distycub</span></a>`,
    ],
  },

  projects: {
    description: "My projects",
    action: () => [
      `<a href="https://github.com/sadistic2keed/Words-Counter" target="_blank" rel="noopener noreferrer" style="text-decoration:none; transition: color 0.3s ease;" onmouseover="this.style.color='#66b3ff'" onmouseout="this.style.color='#1e90ff'">Words-Counter</a>`,
      `<a href="https://github.com/sadistic2keed/ESP32-Marauder" target="_blank" rel="noopener noreferrer" style="text-decoration:none; transition: color 0.3s ease;" onmouseover="this.style.color='#66b3ff'" onmouseout="this.style.color='#1e90ff'">ESP32-Marauder</a>`,
      `<a href="https://github.com/sadistic2keed/ESP8266-DEAUTH" target="_blank" rel="noopener noreferrer" style="text-decoration:none; transition: color 0.3s ease;" onmouseover="this.style.color='#66b3ff'" onmouseout="this.style.color='#1e90ff'">ESP8266-DEAUTH</a>`,
      `<a href="https://github.com/sadistic2keed/BAU_KO_PHONE" target="_blank" rel="noopener noreferrer" style="text-decoration:none; transition: color 0.3s ease;" onmouseover="this.style.color='#66b3ff'" onmouseout="this.style.color='#1e90ff'">BAU_KO_PHONE</a>`,
      `<a href="https://github.com/sadistic2keed/DEAUTH-with-Wifi-Dongle" target="_blank" rel="noopener noreferrer" style="text-decoration:none; transition: color 0.3s ease;" onmouseover="this.style.color='#66b3ff'" onmouseout="this.style.color='#1e90ff'">DEAUTH-with-Wifi-Dongle</a>`,
      `<a href="https://github.com/sadistic2keed/Arduino" target="_blank" rel="noopener noreferrer" style="text-decoration:none; transition: color 0.3s ease;" onmouseover="this.style.color='#66b3ff'" onmouseout="this.style.color='#1e90ff'">Arduino</a>`,
    ],
  },
  gallery: {
    description: "Gallery",
    action: () => ["__GALLERY__"],
  },

  clear: {
    description: "Clear terminal",
    action: () => "__CLEAR__",
  },
};
