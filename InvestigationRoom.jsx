import { useState } from 'react'
import { mysteryData } from '../mysteryData'

function InvestigationRoom({ caseDetails, onBack }) {
  


  const [selectedSuspect, setSelectedSuspect] = useState(null)
  const [discoveredClues, setDiscoveredClues] = useState([])
  const [questionedSuspects, setQuestionedSuspects] = useState([])
  const [accusedSuspect, setAccusedSuspect] = useState(null)
  const [accusationResult, setAccusationResult] = useState('')
  


  
  // Identify which mystery the player is investigating
 // Identify the selected mystery


  // Identify whether this is a ready-made or custom mystery
  const mysteryId = caseDetails?.id
  const isCustomMystery = !mysteryId

  const customMystery = {
    title: caseDetails?.title || 'Untitled Mystery',
    premise: caseDetails?.premise || 'No case description available.',

    suspects: [
      {
        id: 1,
        name: 'Alex Morgan',
        role: 'Person connected to the case',
        motive: 'Their connection to the incident needs investigation.',
        alibi: 'Their whereabouts have not yet been verified.',
      },
      {
        id: 2,
        name: 'Jordan Blake',
        role: 'Person with unanswered questions',
        motive: 'Their actions may help explain what happened.',
        alibi: 'Their account needs to be compared with the evidence.',
      },
      {
        id: 3,
        name: 'Taylor Reed',
        role: 'Person with potentially useful information',
        motive: 'They may know something important about the incident.',
        alibi: 'Further questioning may help establish their timeline.',
      },
    ],

    clues: [
      {
        id: 1,
        title: 'The Timeline',
        description: 'Establish when the incident happened and compare the timeline with each suspect’s account.',
      },
      {
        id: 2,
        title: 'Conflicting Statements',
        description: 'Compare the suspects’ accounts and look for inconsistencies that need further investigation.',
      },
      {
        id: 3,
        title: 'The Missing Detail',
        description: 'Revisit the case description and identify an unanswered question that could help explain the incident.',
      },
    ],
    correctSuspectId: 2,

    solution: 'For this basic custom-case mode, Jordan Blake is the predetermined answer. The clues are general investigative prompts, not AI-generated evidence. Review the case description and compare the available statements before making your accusation.',
  }

  const activeMystery = isCustomMystery
    ? customMystery
    : mysteryData[mysteryId] || mysteryData.diamond

  console.log('Custom mystery:', isCustomMystery)
  console.log('Loaded mystery:', activeMystery.title)
  const suspects = activeMystery.suspects
const clues = activeMystery.clues
const correctSuspectId = activeMystery.correctSuspectId
  
  const progress = Math.round(
  ((discoveredClues.length + questionedSuspects.length) /
    (clues.length + suspects.length)) *
    100
  )

  function discoverClue(clue) {
    if (!discoveredClues.includes(clue.id)) {
      setDiscoveredClues([...discoveredClues, clue.id])
    }
  }
function submitAccusation() {
  if (accusedSuspect === null) {
    setAccusationResult('Please select a suspect first!')
    return
  }

  if (discoveredClues.length < clues.length) {
    setAccusationResult(
      'Examine all the clues before making your accusation!'
    )
    return
  }

 
if (accusedSuspect === correctSuspectId) {
  const culprit = suspects.find(
    (suspect) => suspect.id === correctSuspectId
  )

  setAccusationResult(
  `Case Solved! 🎉 ${culprit.name} is the culprit!\n\n${activeMystery.solution}`
)
} else {
  setAccusationResult(
    'Not quite! Your accusation is incorrect. Review the evidence and try again.'
  )
}

}
  return (
    <main className="investigation-page">
      <button
        className="back-button"
        onClick={onBack}
        type="button"
      >
        ← Back to Home
      </button>

      <header className="investigation-header">
        <div className="badge">ACTIVE INVESTIGATION</div>

        <h1>
          The Investigation <span>Room</span>
        </h1>

        <p className="create-description">
          Read the case, examine the evidence, and question the suspects.
        </p>
      </header>

      <section className="case-summary">
  <h2>📁 Case File</h2>

  <h3 className="case-title">
    {activeMystery.title || 'Untitled Mystery'}
  </h3>

  <p>{activeMystery.premise || 'No case description available.'}</p>

  <p>
    <strong>Difficulty:</strong> {caseDetails?.difficulty || 'Easy'}
  </p>

  <div className="case-file-status">
    <span>●</span> CASE ACTIVE
  </div>
</section>

      <section className="investigation-section">
        <h2>🧩 Discover the Clues</h2>

        <div className="investigation-grid">
          {clues.map((clue) => {
            const discovered = discoveredClues.includes(clue.id)

            return (
              <article className="investigation-card" key={clue.id}>
                <h3>{clue.title}</h3>

                {discovered ? (
                  <p>{clue.description}</p>
                ) : (
                  <p>Evidence has not been examined yet.</p>
                )}

                <button
                  className="start-button"
                  type="button"
                  onClick={() => discoverClue(clue)}
                  disabled={discovered}
                >
                  {discovered ? 'Clue Discovered ✓' : 'Examine Clue'}
                </button>
              </article>
            )
          })}
        </div>
      </section>

      <section className="investigation-section">
        <h2>🕵️ Question the Suspects</h2>

        <div className="investigation-grid">
          {suspects.map((suspect) => (
            <article className="investigation-card" key={suspect.id}>
              <h3>{suspect.name}</h3>

              <p>{suspect.role}</p>

              <button
                className="start-button"
                type="button"
               onClick={() => {
  setSelectedSuspect(
    selectedSuspect === suspect.id ? null : suspect.id
  )

  if (!questionedSuspects.includes(suspect.id)) {
    setQuestionedSuspects([
      ...questionedSuspects,
      suspect.id,
    ])
  }
}}
              >
                {selectedSuspect === suspect.id
                  ? 'Hide Details'
                  : 'Question Suspect'}
              </button>

              {selectedSuspect === suspect.id && (
                <div className="suspect-details">
                  <p>
                    <strong>Possible motive:</strong> {suspect.motive}
                  </p>

                  <p>
                    <strong>Alibi:</strong> {suspect.alibi}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="case-summary">
        <h2>Investigation Progress</h2>
        <p>Case Progress: {progress}%</p>

    <div className="progress-track">
    <div
    className="progress-fill"
    style={{ width: `${progress}%` }}
    />
    </div>

        <p>
          Clues discovered: {discoveredClues.length} / {clues.length}
        </p>

        <p>
     Suspects questioned: {questionedSuspects.length} / {suspects.length}
      </p>

        <p>
          Keep investigating and compare the evidence before making an
          accusation.
        </p>
      </section>
            <section className="investigation-section">
        <h2>⚖️ Solve the Mystery</h2>

        <p>
          Examine the evidence and choose the person you believe is responsible.
        </p>

        <div className="investigation-grid">
          {suspects.map((suspect) => (
            <article className="investigation-card" key={suspect.id}>
              <h3>{suspect.name}</h3>

              <label>
                <input
                  type="radio"
                  name="accusedSuspect"
                  checked={accusedSuspect === suspect.id}
                  onChange={() => {
                    setAccusedSuspect(suspect.id)
                    setAccusationResult('')
                  }}
                />
                Select this suspect
              </label>
            </article>
          ))}
        </div>

        <button
          className="start-button"
          type="button"
          onClick={submitAccusation}
        >
          Submit Accusation
        </button>

        {accusationResult && (
  <div className="case-summary">
    <p>{accusationResult}</p>

    {accusedSuspect === correctSuspectId && (
      <div className="solution-explanation">
        <h3>🔎 Case Explanation</h3>
        <p>
          You solved the mystery! Review the clues you discovered
          and the suspect's motive and alibi to understand how
          the evidence connects to the culprit.
        </p>

        <h4>Evidence Collected</h4>
        <ul>
          {clues
            .filter((clue) => discoveredClues.includes(clue.id))
            .map((clue) => (
              <li key={clue.id}>
                <strong>{clue.title}:</strong> {clue.description}
              </li>
            ))}
        </ul>

        <h4>Suspect Identified</h4>
        <p>
          {suspects.find(
            (suspect) => suspect.id === correctSuspectId
          )?.name}
        </p>
      </div>
    )}
  </div>
)}
      </section>
    </main>
  )
}

export default InvestigationRoom