import './App.css'

import VideoBG from './components/VideoBG'
import Navbar from './components/Navbar/Navbar'
import Presentation from './components/Presentation/Presentation'
import ResponsiveNavbar from './components/Navbar/ResponsiveNavbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <ResponsiveNavbar />
      <VideoBG />
      <Presentation />
      
    </div>
  )
}

export default App