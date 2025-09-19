import Navbar from "./components/Navbar"
import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import InteractiveMaps from "./components/InteractiveMaps"
import VirtualTour from "./components/VirtualTour"
import Archive from "./components/Archive"
import Events from "./components/Events"

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
