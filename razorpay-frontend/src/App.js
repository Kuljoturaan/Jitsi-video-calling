import "./App.css";
import VideoCall from "./component/VideoCall";
// import Payment from "./payment";

function App() {
  return (
    <div>
      <h2>SkillVerse Live Class</h2>
      <VideoCall roomName="skillverse-demo-room" userName="Student 1" />
    </div>
    // <div>
    //   <Payment />
    // </div>
  );
}

export default App;
