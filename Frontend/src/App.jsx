import './App.css'
import AiCoverLetterWriter from './Component/AiCoverLetterWriter'
import AiGuide from './Component/AiGuide'
import AiInterViewCoach from './Component/AiInterviewCoach'
import AiLearningRoadMap from './Component/AiLearningRoadMap'
import AiResumeAnalyze from './Component/AiResumeAnalyze'
import AiTools from './Component/AiTools'
import AppNavBar from './Component/AppNavbar'
import CareerPaths from './Component/CareerPaths'
import Footer from './Component/Footer'
import HomePage from './Component/HomePage'
import CareerDetails from './Component/CareerDetails'
import LoginPage from './Component/LoginPage'
import SalaryIntelligence from './Component/SalaryIntelligence'
import SkillGapAnalyzer from './Component/SkillGapAnalyzer'
import SocialFeedBack from './Component/SocialFeedback'
import { Route, Routes } from 'react-router-dom'
import UserProfile from './Component/UserProfile';
import ProtectedRoutes from './context/ProtectedRoutes'
function App() {

  return (
    <>


      <AppNavBar />
      <Routes>
        <Route path='/signup' element={<LoginPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/tools' element={<ProtectedRoutes><AiTools /></ProtectedRoutes>} />
        <Route path='/guide' element={<ProtectedRoutes><AiGuide /></ProtectedRoutes>} />
        <Route path='/careerpaths' element={<ProtectedRoutes><CareerPaths /></ProtectedRoutes>} />
        <Route path='/resumeanalyze' element={<ProtectedRoutes><AiResumeAnalyze /></ProtectedRoutes>} />
        <Route path='/skillgapanalyze' element={<ProtectedRoutes><SkillGapAnalyzer /></ProtectedRoutes>} />
        <Route path='/roadmap' element={<ProtectedRoutes><AiLearningRoadMap /></ProtectedRoutes>} />
        <Route
          path="/career/:careerName"
          element={<ProtectedRoutes><CareerDetails /></ProtectedRoutes>}
        />
        <Route
          path="/profile"
          element={<ProtectedRoutes><UserProfile /></ProtectedRoutes>}
        />
        <Route path='/salary' element={<ProtectedRoutes><SalaryIntelligence /></ProtectedRoutes>} />
        <Route path='/interview' element={<ProtectedRoutes><AiInterViewCoach /></ProtectedRoutes>} />
        <Route path='/coverletter' element={<ProtectedRoutes><AiCoverLetterWriter /></ProtectedRoutes>} />
        <Route path='/feedback' element={<ProtectedRoutes><SocialFeedBack /></ProtectedRoutes>} />
      </Routes>
      <Footer />
    </>
  )
}


export default App
