import "./App.css";
import AiCoverLetterWriter from "./pages/AiCoverLetterWriter";
import AiGuide from "./pages/AiGuide";
import AiInterviewCoach from "./pages/AiInterviewCoach";
import LearningRoadMap from "./pages/learningRoadMap.jsx";
// import AiLearningRoadMap from "./pages/AiLearningRoadMap";
import AiResumeAnalyze from "./pages/AiResumeAnalyze";
import AllAiTools from "./pages/AllAiTools.jsx";
// import AiTools from "./pages/AiTools";
// import AppNavBar from './pages/AppNavbar'
// import CareerPaths from "./pages/CareerPaths";
// import Footer from "./pages/Footer";
import HomePage from "./pages/HomePage";
import CareerDetails from "./pages/CareerDetails";
import LoginPage from "./pages/LoginPage";
import SalaryIntelligence from "./pages/SalaryIntelligence";
import SkillGapAnalyzer from "./pages/SkillGapAnalyzer";
import SocialFeedBack from "./pages/SocialFeedback";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./context/protectedRoutes";
import ProfilePage from "./pages/UserProfile.jsx";
import PublicLayout from "./context/publicLayout";
import PrivateLayout from "./context/privateLayout";
import AuthoLayout from "./context/AuthLayout";
import ResumeAnalyze from "./pages/resumeAnalyze.jsx";
import AiCareearPath from "./pages/AiCareearPath.jsx";
function App() {
  return (
    <>
      <Routes>
        {/*Public Layouts */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/guide" element={<AiGuide />} />
          <Route path="/tools" element={<AllAiTools />} />
        </Route>

        {/* Auth pages without Navbar/Footer */}
        <Route element={<AuthoLayout />}>
          <Route path="/signup" element={<LoginPage />} />
        </Route>
        {/*Private Layouts */}
        <Route
          element={
            <ProtectedRoutes>
              <PrivateLayout />
            </ProtectedRoutes>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/careerpaths" element={<AiCareearPath />} />
          <Route path="/resumeanalyze" element={<AiResumeAnalyze />} />
          <Route path="/skillgapanalyze" element={<SkillGapAnalyzer />} />
          <Route path="/resume" element={<ResumeAnalyze />} />
          <Route path="/roadmap" element={<LearningRoadMap />} />
          <Route path="/career/:careerName" element={<CareerDetails />} />
          <Route path="/dashboard" element={<ProfilePage />} />
          <Route path="/salary" element={<SalaryIntelligence />} />
          <Route path="/interview" element={<AiInterviewCoach />} />
          <Route path="/coverletter" element={<AiCoverLetterWriter />} />
          <Route path="/feedback" element={<SocialFeedBack />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
