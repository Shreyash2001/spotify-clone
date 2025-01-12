import "./App.css";
import LoginScreen from "./Screens/LoginScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupScreen from "./Screens/SignupScreen";
import HomeScreen from "./Screens/HomeScreen";
import MusicPlayer from "./Components/MusicPlayer";

function App() {
  const currentPath = window.location.pathname; // Get the current path
  const showMusicPlayer = currentPath !== "/login" && currentPath !== "/signup";
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
        {showMusicPlayer && <MusicPlayer />}
      </div>
    </Router>
  );
}

export default App;
