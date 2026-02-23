import { useEffect } from "react";
import { useSelector } from "react-redux";

const TawkMessenger = () => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const PROPERTY_ID = "699adb301d5e101c336ad774";
    const WIDGET_ID = "default";

    // 1. Inject Script only if it doesn't exist
    if (!document.getElementById("tawk-script")) {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.id = "tawk-script";
      s1.async = true;
      s1.src = `https://embed.tawk.to/${PROPERTY_ID}/${WIDGET_ID}`;
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "*");
      s0.parentNode.insertBefore(s1, s0);
    }

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    // 2. Identity & Automatic Popup Logic
    window.Tawk_API = window.Tawk_API || {};

    // This is the secret sauce to force the window open
    window.Tawk_API.onChatMessageSystem = function (message) {
      window.Tawk_API.maximize();
    };

    window.Tawk_API.onLoad = function () {
      if (user) {
        window.Tawk_API.setAttributes({
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        });
      }
    };

    // 4. FIX: Prevent Chat from "Ending"
    // We removed the hideWidget() from cleanup to keep the session alive
    // during internal React route changes.
    return () => {
      // We leave the chat active so it persists across pages
    };
  }, [user]);

  return null;
};

export default TawkMessenger;
