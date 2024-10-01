import './App.css'
import VideoBG from './components/VideoBG'
import Navbar from './components/Navbar/Navbar'
import Presentation from './components/Presentation/Presentation'
import Projects from './components/Projects/Projects'
import Skills from './components/Skills/Skills'

const App = () => {
  return (
    <div className="app-container">
      <VideoBG />
      <Navbar />
      <main>
        <Presentation />
        <Projects />
        <Skills />
      </main>
    </div>
  )
}

export default App