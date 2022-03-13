import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ask from "./pages/Ask";
import Job from "./pages/Job";
import Top from "./pages/Top";
import Show from "./pages/Show";
import News from "./pages/News";
import UserInfo from "./pages/UserInfo";

function App() {
  return (
    <>
      <Header />
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/ask" element={<Ask />}></Route>
        <Route path="/job" element={<Job />}></Route>
        <Route path="/top" element={<Top />}></Route>
        <Route path="/show" element={<Show />}></Route>
        <Route path="/news" element={<News />}></Route>
        <Route path="/user/:by" element={<UserInfo />}></Route>
      </Routes>
    </>
  );
}

export default App;
