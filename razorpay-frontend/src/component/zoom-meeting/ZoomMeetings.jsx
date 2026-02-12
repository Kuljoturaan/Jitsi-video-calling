import { ZoomMtg } from "@zoomus/websdk";
import "@zoomus/websdk/dist/css/bootstrap.css";
import "@zoomus/websdk/dist/css/react-select.css";
import "./styles/ZoomMeetings.css";
import { useEffect } from "react";

ZoomMtg.setZoomJSLib("https://source.zoom.us/2.18.0/lib", "/av");
ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

const ZoomMeetings = () => {
  useEffect(() => {
    joinMeeting();
  }, []);
  const joinMeeting = async () => {
    const meetingNumber = "86296229680";
    const passWord = "HtM41q";

    const res = await fetch("http://localhost:5000/api/zoom-signature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meetingNumber,
        userEmail: process.env.REACT_APP_ADMIN_EMAIL,
      }),
    });

    const result = await res.json();
    console.log("Full API Response:", result);

    if (!result.success) {
      alert("Signature error");
      return;
    }

    const { signature, sdkKey, role } = result.data[0];
    console.log("✅ Signature Received:", signature);
    console.log("✅ SDK Key:", sdkKey);
    console.log("✅ Role:", role);

    ZoomMtg.init({
      leaveUrl: window.location.origin,
      patchJsMedia: true,
      success: () => {
        ZoomMtg.join({
          sdkKey,
          signature,
          meetingNumber,
          userName: role === 1 ? "Teacher" : "Student",
          passWord,
          success: () => console.log("Meeting Joined"),
          error: (e) => console.error("Join Error", e),
        });
      },
      error: (e) => console.error("Init Error", e),
    });
  };
};

export default ZoomMeetings;
