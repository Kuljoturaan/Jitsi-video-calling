import { useEffect, useRef } from "react";
import ZoomMtgEmbedded from "@zoom/meetingsdk/embedded";
import "./styles/ZoomMeetings.css";

const ZoomMeetings = () => {
  const isMeetingStarted = useRef(false);

  useEffect(() => {
    if (isMeetingStarted.current) return;
    isMeetingStarted.current = true;

    joinMeeting();
  }, []);

  const joinMeeting = async () => {
    try {
      console.log("🟡 joinMeeting() started");

      const meetingNumber = "82101008895";
      const staticPassword = "123456";

      console.log("📌 Meeting Details:", {
        meetingNumber,
        staticPassword,
      });

      console.log("🌐 Calling backend for signature...");

      const res = await fetch("http://localhost:5000/api/zoom-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingNumber,
          userEmail: "uraan.kuljot@gmail.com",
        }),
      });

      console.log("📥 Raw response from backend:", res);

      const result = await res.json();
      console.log("📦 Parsed API Response:", result);

      // --- BACKEND DATA INSPECTION ---
      console.log("🔍 ========== BACKEND DATA CHECK ==========");
      console.log("Full Response Object:", result);

      if (!result.success) {
        console.error("❌ Signature API returned success=false");
        alert("Signature error");
        return;
      }

      const { signature, role } = result.data;

      console.log("🔍 --- SIGNATURE ANALYSIS ---");
      console.log("1. Full Signature:", signature);

      console.log("🧩 Creating Zoom Embedded Client...");
      const client = ZoomMtgEmbedded.createClient();
      console.log("🧩 Client Object:", client);

      const zoomRoot = document.getElementById("zoom-root");
      console.log("📍 Zoom Root Element:", zoomRoot);
      if (!zoomRoot) {
        console.error("❌ zoom-root element nahi mila! Rendering rukk gayi hai.");
        return;
      }

      console.log("⚙️ Initializing Zoom Client...");
      client.init({
        zoomAppRoot: zoomRoot,
        language: "en-US",
      });

      client.join({
        signature: signature,
        meetingNumber: meetingNumber,
        passWord: staticPassword,
        userName: role === 1 ? "Teacher" : "Student",
        role: parseInt(role),
        success: (s) => console.log("Meeting Joined 🎉", s),
        error: (e) => {
          console.error("❌ Join Error Detail:", e);
          if (e.errorCode === 3004)
            console.log(
              "HINT: Agar portal par password sahi hai, toh backend signature check karein.",
            );
        },
      });
    } catch (err) {
      console.error("💥 CRITICAL JS ERROR:", err);
    }
  };

  return <div id="zoom-root" style={{ width: "100%", height: "600px" }} />;
};

export default ZoomMeetings;
