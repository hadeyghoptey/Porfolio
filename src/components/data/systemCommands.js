// System information commands

export const systeminfo = {
  description: "Display system information",
  action: () => {
    const getBrowser = () => {
      const ua = navigator.userAgent;
      if (ua.includes("Firefox")) return "Firefox";
      if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
      if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
      if (ua.includes("Edg")) return "Edge";
      if (ua.includes("Opera") || ua.includes("OPR")) return "Opera";
      return "Unknown";
    };

    const getOS = () => {
      const ua = navigator.userAgent;
      if (ua.includes("Win")) return "Windows";
      if (ua.includes("Mac")) return "macOS";
      if (ua.includes("Linux")) return "Linux";
      if (ua.includes("Android")) return "Android";
      if (ua.includes("iOS") || ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
      return "Unknown";
    };

    const getDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) return "Mobile";
      if (width < 1024) return "Tablet";
      return "Desktop";
    };

    return [
      "System Information:",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      `Browser:        ${getBrowser()}`,
      `OS:             ${getOS()}`,
      `Screen:         ${window.innerWidth}x${window.innerHeight}`,
      `Timezone:       ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
      `Device Type:    ${getDeviceType()}`,
      `Language:       ${navigator.language}`,
      `Online:         ${navigator.onLine ? "Yes" : "No"}`,
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    ];
  },
};

export const uptime = {
  description: "Show terminal session uptime",
  action: () => {
    const startTime = window.terminalStartTime || Date.now();
    const uptime = Date.now() - startTime;
    
    const seconds = Math.floor(uptime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const displayHours = hours % 24;
    const displayMinutes = minutes % 60;
    const displaySeconds = seconds % 60;

    let uptimeStr = "";
    if (days > 0) uptimeStr += `${days}d `;
    if (hours > 0) uptimeStr += `${displayHours}h `;
    if (minutes > 0) uptimeStr += `${displayMinutes}m `;
    uptimeStr += `${displaySeconds}s`;

    return [
      `Terminal uptime: ${uptimeStr}`,
      `Session started: ${new Date(startTime).toLocaleString()}`,
    ];
  },
};

export const version = {
  description: "Show website version",
  action: () => {
    return [
      "Terminal Portfolio v2.0.0",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "Last Updated:    January 15, 2025",
      "Framework:       Next.js 15.4.6",
      "React:           19.1.0",
      "Author:          Manash Hada",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "Features:",
      "  • 12+ interactive commands",
      "  • Tab completion & command history",
      "  • Responsive design (mobile-first)",
      "  • Interactive gallery",
      "  • Real-time system info",
    ];
  },
};
