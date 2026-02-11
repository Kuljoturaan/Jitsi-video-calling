import "./App.css";
import VideoCall from "./component/VideoCall";
// import Payment from "./payment";

function App() {
  return (
    <div>
      <h2>SkillVerse Live Class</h2>
      <VideoCall
        roomName="Skillverse Demo Room"
        userName="Admin"
        jwtToken={
          "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtNzkxYjlkODI2ZTA5NDBkZDkwYTI0YzFlNTkxYTExMjYvMDgxNGM1LVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3NzA4MTg3MTksImV4cCI6MTc3MDgyNTkxOSwibmJmIjoxNzcwODE4NzE0LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtNzkxYjlkODI2ZTA5NDBkZDkwYTI0YzFlNTkxYTExMjYiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsImZpbGUtdXBsb2FkIjp0cnVlLCJvdXRib3VuZC1jYWxsIjp0cnVlLCJzaXAtb3V0Ym91bmQtY2FsbCI6ZmFsc2UsInRyYW5zY3JpcHRpb24iOnRydWUsImxpc3QtdmlzaXRvcnMiOmZhbHNlLCJyZWNvcmRpbmciOnRydWUsImZsaXAiOmZhbHNlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6InVyYWFuLmt1bGpvdCIsImlkIjoiZ29vZ2xlLW9hdXRoMnwxMTI1OTMyMzE2NTM2NTQ3NzI0MTkiLCJhdmF0YXIiOiIiLCJlbWFpbCI6InVyYWFuLmt1bGpvdEBnbWFpbC5jb20ifX0sInJvb20iOiIqIn0.F4dNtmscv2bpCWncDVB05H2v_VRyWd2zFlI_Ngy286Z0buE7UjYphaLNopmPZDFzZXfdCNCVcq86aX1O7oNNhHS31AenelLAxJqphr_O2nG2oV6d_JxJCUjk274kTeXSUPt89cDAtjd3P8pDkiNNAWsAdengAmZxRSLzrQRFvkWP9-YDpuYbc31rQAm_M9Pz7L1eIvIF-4RSvzAEQNw7Bv2MuJ-dAaxMvdxBiFfW-079JXHGufY2F43fxtc0DGGSknIcBWNDf9f5r1KgCV8MucNytphRZVKDyh_MRYNZJo0Dq46hGIT3d57WHOwMWDpcwkcXt2HhWCu-PJskc5sTsg"
        }
      />
    </div>
    // <div>
    //   <Payment />
    // </div>
  );
}

export default App;
