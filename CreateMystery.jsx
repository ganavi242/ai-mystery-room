import { useState } from 'react'

function CreateMystery({ onBack, onCreate }) {
  const [title, setTitle] = useState('')
  const [premise, setPremise] = useState('')
  const [difficulty, setDifficulty] = useState('Easy')

  function handleSubmit(event) {
    event.preventDefault()

    if (title.trim() === '') {
      alert('Please enter a case title!')
      return
    }

    if (premise.trim() === '') {
      alert('Please enter a mystery idea first!')
      return
    }

    onCreate({
      title: title.trim(),
      premise: premise.trim(),
      difficulty: difficulty,
    })
  }

  return (
    <main className="create-page">
      <button
        className="back-button"
        onClick={onBack}
        type="button"
      >
        ← Back to Home
      </button>

      <div className="create-card">
        <div className="badge">
          YOUR INVESTIGATION STARTS HERE
        </div>

        <h1>
          Create Your <span>Mystery</span>
        </h1>

        <p className="create-description">
          Every great detective needs a case.
          Give your case a title, describe your mystery,
          and choose your difficulty.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="title">
            Case Title
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Example: The Midnight Diamond Heist"
            maxLength={80}
          />

          <label htmlFor="premise">
            Your Mystery Idea
          </label>

          <textarea
            id="premise"
            value={premise}
            onChange={(event) => setPremise(event.target.value)}
            placeholder="Example: A priceless diamond disappears during a party at a mansion..."
            rows={5}
            maxLength={500}
          />

          <p className="character-count">
            {premise.length}/500 characters
          </p>

          <label htmlFor="difficulty">
            Choose Your Difficulty
          </label>

          <select
            id="difficulty"
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
          >
            <option value="Easy">
              Easy — Beginner Detective
            </option>

            <option value="Medium">
              Medium — Skilled Detective
            </option>

            <option value="Hard">
              Hard — Master Detective
            </option>
          </select>

          <button
            className="start-button submit-button"
            type="submit"
          >
            Create My Mystery →
          </button>
        </form>
      </div>
    </main>
  )
}

export default CreateMystery