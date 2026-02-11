import { useEffect, useRef } from "react";

const VideoCall = ({ roomName, userName }) => {
  const jitsiRef = useRef(null);
  const apiRef = useRef(null);

  useEffect(() => {
    console.log("Checking Jitsi Script...", window.JitsiMeetExternalAPI);
    if (!window.JitsiMeetExternalAPI) {
      alert("Jitsi API not loaded");
      return;
    }

    const domain = "meet.jit.si";

    const options = {
      roomName,
      width: "100%",
      height: 600,
      parentNode: jitsiRef.current,
      userInfo: {
        displayName: userName,
      },
      configOverwrite: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
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
  }, [roomName, userName]);

  return <div ref={jitsiRef} />;
};

export default VideoCall;
