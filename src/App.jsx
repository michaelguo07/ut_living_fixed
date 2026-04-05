import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import SearchResultsPage from './pages/SearchResultsPage'
import AboutPage from './pages/AboutPage'
import ApartmentDetailPage from './pages/ApartmentDetailPage'
import FloorPlanDetailPage from './pages/FloorPlanDetailPage'
import FloorPlanComparePage from './pages/FloorPlanComparePage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/apartments/:apartmentId" element={<ApartmentDetailPage />} />
        <Route path="/floorplans/:floorPlanId" element={<FloorPlanDetailPage />} />
        <Route path="/compare" element={<FloorPlanComparePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Layout>
  )
}
