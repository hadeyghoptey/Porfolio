// Utility commands
import quotes from "./quotes.json";

export const randomquote = {
  description: "Display a random quote",
  action: () => {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    return [
      "",
      `"${quote.quote}"`,
      "",
      `    — ${quote.author}`,
      "",
    ];
  },
};

export const stats = {
  description: "Show session statistics",
  action: () => {
    // Get or initialize stats
    const commandCount = window.terminalCommandCount || 0;
    
    // Get visit count from localStorage
    let visitCount = parseInt(localStorage.getItem("terminalVisitCount") || "0");
    
    // Get total commands from localStorage
    const totalCommands = parseInt(localStorage.getItem("terminalTotalCommands") || "0");
    
    // Get first visit date
    const firstVisit = localStorage.getItem("terminalFirstVisit") || new Date().toLocaleDateString();
    
    return [
      "Session Statistics:",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      `Commands (this session):  ${commandCount}`,
      `Total commands (all):     ${totalCommands}`,
      `Site visits:              ${visitCount}`,
      `First visit:              ${firstVisit}`,
      `Current session:          ${new Date().toLocaleString()}`,
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    ];
  },
};

export const calendar = {
  description: "Display current month calendar",
  action: () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();
    
    // Get month name
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Build calendar
    const lines = [];
    lines.push("");
    lines.push(`     ${monthNames[month]} ${year}`);
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push(" Su Mo Tu We Th Fr Sa");
    
    let week = " ";
    
    // Add empty spaces for days before month starts
    for (let i = 0; i < firstDay; i++) {
      week += "   ";
    }
    
    // Add days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayStr = day.toString().padStart(2, " ");
      
      // Highlight today
      if (day === today) {
        week += `[${dayStr}]`;
      } else {
        week += ` ${dayStr} `;
      }
      
      // New week on Saturday
      if ((firstDay + day) % 7 === 0) {
        lines.push(week);
        week = " ";
      }
    }
    
    // Add last week if not complete
    if (week.trim()) {
      lines.push(week);
    }
    
    lines.push("━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    lines.push(`Today: ${monthNames[month]} ${today}, ${year}`);
    lines.push("");
    
    return lines;
  },
};

export const motd = {
  description: "Message of the day",
  action: () => {
    const motivationalMessages = [
      "Keep pushing forward! 💪",
      "Today is a great day to code! 💻",
      "Believe in yourself! ⭐",
      "You're doing amazing! 🚀",
      "Stay curious, stay hungry! 🔥",
      "Debug your doubts! 🐛",
      "Compile your dreams! ⚡",
      "Your code matters! 🌟",
      "Keep learning, keep growing! 📚",
      "Make it happen! 🎯",
      "Hack the planet! 🌍",
      "Stay secure, stay sharp! 🔐",
      "Break things, learn things! 🔓",
      "Code with passion! ❤️",
      "Think different, code different! 💡",
    ];
    
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    
    const asciiArt = [
      "    _____ _____ _____ ____  ",
      "   |     |     |_   _|    \\ ",
      "   | | | |  |  | | | |  |  |",
      "   |_|_|_|_____| |_| |____/ ",
      "",
    ];
    
    return [
      "",
      ...asciiArt,
      `   ${randomMessage}`,
      "",
      `   ${new Date().toLocaleDateString("en-US", { 
        weekday: "long", 
        year: "numeric", 
        month: "long", 
        day: "numeric" 
      })}`,
      "",
    ];
  },
};
