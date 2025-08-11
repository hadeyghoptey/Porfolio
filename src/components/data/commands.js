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
      `<a href="mailto:manashada@proton.me">Email: manashada@proton.me</a>`,
      `<a href="https://github.com/sadistic2keed">GitHub: sadistic2keed</a>`,
      `<a href="https://www.linkedin.com/in/manash-hada-12694u/">LinkedIn: Manash Hada</a>`,
      `<a href="https://medium.com/@hadamanash2023">Medium: hadamanash2023</a>`,
      `<a href="https://www.pinterest.com/s4distycub/">Pinterest: s4distycub</a>`,
    ],
  },

  projects: {
    description: "My projects",
    action: () => [
      `<a href="https://github.com/sadistic2keed/Words-Counter">1. Words-Counter</a> – word counting web app`,
      `<a href="https://github.com/sadistic2keed/ESP32-Marauder">2. ESP32-Marauder</a> – ESP32 WiFi tool`,
      `<a href="https://github.com/sadistic2keed/ESP8266-DEAUTH">3. ESP8266-DEAUTH</a> – WiFi deauth tool`,
      `<a href="https://github.com/sadistic2keed/BAU_KO_PHONE">4. BAU_KO_PHONE</a> – Android exploit toolkit`,
      `<a href="https://github.com/sadistic2keed/DEAUTH-with-Wifi-Dongle">5. DEAUTH-with-Wifi-Dongle</a> – WiFi deauth guide`,
      `<a href="https://github.com/sadistic2keed/Arduino">6. Arduino</a> – Arduino basics guide`,
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
