import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Swipe from "./pages/Swipe";
import Matches from "./pages/Matches";
import Chat from "./pages/Chat";
import AIWorkout from "./pages/AIWorkout";
import AIDiet from "./pages/AIDiet";
import AICoach from "./pages/AICoach";
import Streak from "./pages/Streak";
import Leaderboard from "./pages/Leaderboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import AIHub from "./pages/AIHub";
import Progress from "./pages/Progress";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/profile" element={<Profile />} />
          <Route path="/swipe" element={<Swipe />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/chat/:matchId" element={<Chat />} />
          <Route path="/ai-workout" element={<AIWorkout />} />
          <Route path="/ai-diet" element={<AIDiet />} />
          <Route path="/ai-coach" element={<AICoach />} />
          <Route path="/streak" element={<Streak />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/ai-hub" element={<AIHub />} />
          <Route path="/progress" element={<Progress />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;