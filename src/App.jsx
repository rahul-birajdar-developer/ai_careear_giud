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
// import LoginPage from './Component/LoginPage'
import SalaryIntelligence from './Component/SalaryIntelligence'
import SkillGapAnalyzer from './Component/SkillGapAnalyzer'
import SocialFeedBack from './Component/SocialFeedback'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      {/* <LoginPage /> */}
      <AppNavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/tools' element={<AiTools />} />
        <Route path='/guide' element={<AiGuide />} />
        <Route path='/careerpaths' element={<CareerPaths />} />
        <Route path='/resumeanalyze' element={<AiResumeAnalyze />} />
        <Route path='/skillgapanalyze' element={<SkillGapAnalyzer />} />
        <Route path='/roadmap' element={<AiLearningRoadMap />} />
        <Route
          path="/career/:careerName"
          element={<CareerDetails />}
        />
        <Route path='/salary' element={<SalaryIntelligence />} />
        <Route path='/interview' element={<AiInterViewCoach />} />
        <Route path='/coverletter' element={<AiCoverLetterWriter />} />
        <Route path='/feedback' element={<SocialFeedBack />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
