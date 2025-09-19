import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import InteractiveMaps from "./pages/InteractiveMaps"
import VirtualTour from "./pages/VirtualTour"
import Archive from "./pages/Archive"
import Events from "./pages/Events"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/virtualtour" element={<VirtualTour />} />
        <Route path="/interactive-maps" element={<InteractiveMaps />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </>
  )
}

export default App
