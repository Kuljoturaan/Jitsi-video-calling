import "./App.css";
// import VideoCall from "./component/Jitsi-Video-calling/VideoCall";
// import Payment from "./component/Razorpay-payment/payment";
import ZoomMeetings from "./component/zoom-meeting/ZoomMeetings";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const startMeeting = () => {
    navigate("/meeting");
  };

  return (
    <div>
      <button onClick={startMeeting}>Start Meeting</button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meeting" element={<ZoomMeetings />} />
      </Routes>

      {/* 
      <div>
        <VideoCall
          roomName="Skillverse Demo Room"
          userName="Admin"
          jwtToken="token_here"
        />
      </div>

      <div>
        <Payment />
      </div>
      */}
    </Router>
  );
}

export default App;
