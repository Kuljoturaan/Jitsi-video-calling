import "./App.css";
import VideoCall from "./component/VideoCall";
// import Payment from "./payment";

function App() {
  return (
    <div>
      <VideoCall
        roomName="Skillverse Demo Room"
        userName="Admin"
        jwtToken={
          "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtNzkxYjlkODI2ZTA5NDBkZDkwYTI0YzFlNTkxYTExMjYvMDgxNGM1LVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3NzA4MjY0ODMsImV4cCI6MTc3MDgzMzY4MywibmJmIjoxNzcwODI2NDc4LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtNzkxYjlkODI2ZTA5NDBkZDkwYTI0YzFlNTkxYTExMjYiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsImZpbGUtdXBsb2FkIjp0cnVlLCJvdXRib3VuZC1jYWxsIjp0cnVlLCJzaXAtb3V0Ym91bmQtY2FsbCI6ZmFsc2UsInRyYW5zY3JpcHRpb24iOnRydWUsImxpc3QtdmlzaXRvcnMiOmZhbHNlLCJyZWNvcmRpbmciOnRydWUsImZsaXAiOmZhbHNlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6InVyYWFuLmt1bGpvdCIsImlkIjoiZ29vZ2xlLW9hdXRoMnwxMTI1OTMyMzE2NTM2NTQ3NzI0MTkiLCJhdmF0YXIiOiIiLCJlbWFpbCI6InVyYWFuLmt1bGpvdEBnbWFpbC5jb20ifX0sInJvb20iOiIqIn0.Ym7dhqah2UftKPJpExFehYGDE5y0vnfdCZPlz8BO9rHeA4s_r1eX_92D3xeaITQhIpnTcqLjJGY6nTC0tpjkwVCRlv44rfpihrwUeJ6_IWMtLIS_KAmNigr2-6Tw_7nfeisp241TeHeYTtFR-kNms2sqd3vtcfFDi4i6vgtAPgNrrrYYVhwhntIr26DSGEc9Mss_OXvzRFCXNuUYIJgK8GQ1xpRhH7yK2czK3TdW0ojkH9mv4uDjMO53pALQPtmx9zw_U8Vr4ZjGmEEUtZhKlNlftdALo7Xm5FRSOV2QMmaWV-tR8IVAapu5ac6GwODZWJX5KX94QNHot9UzxpWyyA"
        }
      />
    </div>
    // <div>
    //   <Payment />
    // </div>
  );
}

export default App;
