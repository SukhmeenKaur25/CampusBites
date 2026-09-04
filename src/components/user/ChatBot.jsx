import ChatBot, { ChatBotProvider, useChatWindow } from "react-chatbotify";
import AuthServices from "../../services/AuthServices";


const userName = AuthServices.getName() || "Guest";

const flow = {
  start: {
    message: `👋 Hello ${userName}!

Welcome to Campus Bites 🍔

How can I help you today?`,

    options: [
      "🍔 View Menu",
      "🛒 Cart",
      "📦 Order Tracking",
      "📞 Contact",
      "⏰ College Timing"
    ],

    path: "answer"
  },

  answer: {
    message: ({ userInput }) => {

      switch (userInput) {

        case "🍔 View Menu":
          return `🍔 Great choice!

Our menu includes:

🍕 Pizza
🍔 Burgers
🥪 Sandwiches
🥤 Cold Drinks
🍟 Snacks

Please visit the Menu page to explore everything.`;

        case "🛒 Cart":
          return `🛒 Your cart stores all the food items you select.

From there you can:

✅ Change quantity
✅ Remove items
✅ Place your order`;

        case "📦 Order Tracking":
          return `📦 After placing your order,

Go to "My Orders"

There you can see:

🟡 Pending
🟠 Preparing
🟢 Ready
✅ Completed`;

        case "📞 Contact":
          return `📞 Campus Bites Contact Details

☎ Phone : +91 9876543210

📧 Email : campusbites@gmail.com

📍 Location :
DAV Institute of Engineering & Technology,
Jalandhar

😊 We are happy to help you!`;

        case "⏰ College Timing":
          return `⏰ Campus Bites Timing

🕘 Opening Time : 9:00 AM

🕒 Closing Time : 3:00 PM

😊 Happy Ordering!`;

        case "🏠 Main Menu":
          return `🏠 Sure!

How can I help you today?`;

        default:
          return `Sorry 😊 I am the Campus Bites Assistant.

I can help only with:

🍔 Menu
🛒 Cart
📦 Order Tracking
⏰ Timings
📞 Contact Details`;
      }
    },

    options: [
      "🏠 Main Menu"
    ],

    path: "start"
  }
};

const settings = {
  general: {
    primaryColor: "#dc3545",
    secondaryColor: "#ffffff",
    fontFamily: "Poppins, sans-serif",
  },

  header: {
    title: "🍔 Campus Bites"
  },

  chatButton: {
    // hide the default floating trigger — we use our own "Need help?" button instead
    icon: () => null
  },

  tooltip: {
    mode: "NEVER" // disable the built-in tooltip completely
  },

  notification: {
    disabled: false
  }
};

const styles = {

  // hide the default round button visually as a fallback
  chatButtonStyle: {
    display: "none"
  },

  headerStyle: {
    background: "#dc3545",
    color: "#ffffff",
    padding: "14px 16px",
    minHeight: "64px",
    display: "flex",
    alignItems: "center",
    fontSize: "17px",
    lineHeight: "1.3"
  },

  chatWindowStyle: {
    width: "420px",
    height: "600px",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 8px 30px rgba(0,0,0,0.18)"
  },

  bodyStyle: {
    backgroundColor: "#ffffff"
  },

  botBubbleStyle: {
    backgroundColor: "#fff5f5",
    color: "#333333",
    border: "1px solid #dc3545",
    borderRadius: "18px",
    padding: "12px 16px",
    boxShadow: "0 3px 10px rgba(220,53,69,0.12)"
  },

  userBubbleStyle: {
    backgroundColor: "#dc3545",
    color: "#ffffff",
    borderRadius: "18px",
    padding: "12px 16px",
    boxShadow: "0 3px 10px rgba(220,53,69,0.18)"
  },

  botOptionStyle: {
    backgroundColor: "#ffffff",
    color: "#dc3545",
    border: "1.5px solid #dc3545",
    borderRadius: "22px",
    padding: "10px 18px",
    margin: "5px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease"
  },

  botOptionHoveredStyle: {
    backgroundColor: "#dc3545",
    color: "#ffffff",
    border: "1.5px solid #dc3545",
    borderRadius: "22px",
    padding: "10px 18px",
    margin: "5px",
    fontSize: "15px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
    boxShadow: "0 3px 10px rgba(220,53,69,0.3)"
  },

  chatInputAreaStyle: {
    borderRadius: "10px",
    border: "1.5px solid #dc3545"
  },

  chatInputAreaFocusedStyle: {
    border: "2px solid #dc3545"
  },

  sendButtonStyle: {
    backgroundColor: "#dc3545",
    borderRadius: "10px"
  },

  sendButtonHoveredStyle: {
    backgroundColor: "#b02a37"
  },

  footerStyle: {
    backgroundColor: "#f8f9fa"
  }
};

function NeedHelpButton() {
  const { toggleChatWindow } = useChatWindow();

  return (
    <button
      onClick={() => toggleChatWindow()}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        background: "linear-gradient(135deg, #dc3545, #b02a37)",
        color: "#ffffff",
        border: "none",
        borderRadius: "30px",
        padding: "12px 20px",
        fontSize: "15px",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 4px 14px rgba(220,53,69,0.35)",
        cursor: "pointer",
        transition: "transform 0.15s ease, box-shadow 0.2s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(220,53,69,0.45)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 14px rgba(220,53,69,0.35)";
      }}
    >
      Need help? 🍔
    </button>
  );
}

export default function ChatBotComponent() {
  return (
    <ChatBotProvider>
      <ChatBot flow={flow} settings={settings} styles={styles} />
      <NeedHelpButton />
    </ChatBotProvider>
  );
}
