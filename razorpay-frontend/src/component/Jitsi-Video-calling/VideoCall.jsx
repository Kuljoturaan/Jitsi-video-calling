import { useEffect, useRef } from "react";
import "../Jitsi-Video-calling/styles/VideoCall.css";

const APP_ID = "vpaas-magic-cookie-791b9d826e0940dd90a24c1e591a1126";

const VideoCall = ({ roomName, userName, jwtToken }) => {
  const jitsiRef = useRef(null);
  const apiRef = useRef(null);

  useEffect(() => {
    console.log("Checking Jitsi Script...", window.JitsiMeetExternalAPI);
    if (!window.JitsiMeetExternalAPI) {
      alert("Jitsi API not loaded");
      return;
    }

    const domain = "8x8.vc";
    const formattedRoomName = `${APP_ID}/${roomName}`;

    const options = {
      roomName: formattedRoomName,
      jwt: jwtToken,
      width: "100%",
      height: "100%",
      parentNode: jitsiRef.current,
      userInfo: {
        displayName: userName,
      },
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        enableWelcomePage: false,
        hideWatermark: true,
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
      },
    };

    apiRef.current = new window.JitsiMeetExternalAPI(domain, options);

    return () => {
      apiRef.current?.dispose();
    };
  }, [roomName, userName, jwtToken]);

  return (
    <div className="video-call-wrapper">
      <img
        src={`${window.location.origin}/Skillverse-Circle.png`}
        alt="SkillVerse-Logo"
        className="custom-jitsi-logo"
      />
      <div ref={jitsiRef} className="jitsi-embed-container" />
    </div>
  );
};

export default VideoCall;
