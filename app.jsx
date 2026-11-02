
import  {useState}  from 'react'
import './App.css'
import  {mysteryData}  from './mysteryData'
import CreateMystery from './pages/CreateMystery'
import InvestigationRoom from './pages/InvestigationRoom'
import MysterySelection from './pages/MysterySelection'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [caseDetails, setCaseDetails] = useState(null)

  function handleCreateMystery(details) {
    setCaseDetails(details)
    setCurrentPage('investigation')
  }
// Mystery Selection page
if (currentPage === 'selection') {
  return (
    <div className="app">
      <MysterySelection
        onBack={() => setCurrentPage('home')}
        onSelectReadyMade={(mysteryId) => {
  setCaseDetails({
    ...mysteryData[mysteryId],
    difficulty:
      mysteryId === 'necklace' ? 'Easy' : 'Medium',
  })
  setCurrentPage('investigation')
}}
        onCreateCustom={() => setCurrentPage('create')}
      />
    </div>
  )
}
  // Create Mystery page
  if (currentPage === 'create') {
    return (
      <div className="app">
        <CreateMystery
          onBack={() => setCurrentPage('home')}
          onCreate={handleCreateMystery}
        />
      </div>
    )
  }

  // Investigation Room page
  if (currentPage === 'investigation') {
    return (
      <div className="app">
        <InvestigationRoom
          caseDetails={caseDetails}
          onBack={() => setCurrentPage('home')}
        />
      </div>
    )
  }

  // Home page
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          🕵️ MYSTERY<span>ROOM</span>
        </div>

        <a href="#about" className="nav-link">
          About the Game
        </a>
      </nav>

      <main className="hero">
        <div className="badge">
          ✦ AN AI-POWERED DETECTIVE EXPERIENCE
        </div>

        <h1>
          Every Mystery Has
          <br />
          <span>A Dark Secret.</span>
        </h1>

        <p className="description">
          Enter a world of hidden clues, suspicious characters,
          and unsolved cases. Trust your instincts, investigate
          the evidence, and uncover the truth.
        </p>

        <div className="buttons">
          <button
        className="start-button"
        onClick={() => setCurrentPage('selection')}
>
        Start Investigating →
        </button>

          <a href="#about" className="learn-button">
            Discover More
          </a>
        </div>

        <div className="case-preview">
          <div className="case-icon">🔎</div>

          <div>
            <h3>YOUR NEXT CASE AWAITS</h3>
            <p>Every clue matters. Every suspect has a story.</p>
          </div>

          <div className="status">CASE #001</div>
        </div>
      </main>

      <section className="features" id="about">
        <div className="feature">
          <span>🧩</span>
          <h3>Uncover Clues</h3>
          <p>Search for evidence hidden within every mystery.</p>
        </div>

        <div className="feature">
          <span>👤</span>
          <h3>Question Suspects</h3>
          <p>Study the suspects and discover their secrets.</p>
        </div>

        <div className="feature">
          <span>🧠</span>
          <h3>Think Like a Detective</h3>
          <p>Connect the evidence before making your accusation.</p>
        </div>
      </section>

      <footer>
        AI MYSTERY ROOM · THE TRUTH IS WAITING TO BE FOUND
      </footer>
    </div>
  )
}

export default App

