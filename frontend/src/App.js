import "./App.css";
import LoginScreen from "./Screens/LoginScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupScreen from "./Screens/SignupScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
