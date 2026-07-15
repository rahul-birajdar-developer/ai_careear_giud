import "./App.css";
import AiCoverLetterWriter from "./Component/AiCoverLetterWriter";
import AiGuide from "./Component/AiGuide";
import AiInterviewCoach from "./Component/AiInterviewCoach";
import AiLearningRoadMap from "./Component/AiLearningRoadMap";
import AiResumeAnalyze from "./Component/AiResumeAnalyze";
import AiTools from "./Component/AiTools";
// import AppNavBar from './Component/AppNavbar'
import CareerPaths from "./Component/CareerPaths";
// import Footer from "./Component/Footer";
import HomePage from "./Component/HomePage";
import CareerDetails from "./Component/CareerDetails";
import LoginPage from "./Component/LoginPage";
import SalaryIntelligence from "./Component/SalaryIntelligence";
import SkillGapAnalyzer from "./Component/SkillGapAnalyzer";
import SocialFeedBack from "./Component/SocialFeedback";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./context/protectedRoutes";
import ProfilePage from "./Component/UserProfile.jsx";
import PublicLayout from "./context/publicLayout";
import PrivateLayout from "./context/privateLayout";
import AuthoLayout from "./context/AuthLayout";
function App() {
  return (
    <>
      <Routes>
        {/*Public Layouts */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/guide" element={<AiGuide />} />
          <Route path="/tools" element={<AiTools />} />
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
          <Route path="/careerpaths" element={<CareerPaths />} />
          <Route path="/resumeanalyze" element={<AiResumeAnalyze />} />
          <Route path="/skillgapanalyze" element={<SkillGapAnalyzer />} />
          <Route path="/roadmap" element={<AiLearningRoadMap />} />
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
