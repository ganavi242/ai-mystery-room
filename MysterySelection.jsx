function MysterySelection({ onBack, onSelectReadyMade, onCreateCustom }) {
  const mysteries = [
    {
      id: 'diamond',
      icon: '💎',
      title: 'The Midnight Diamond Heist',
      description:
        'A priceless diamond has vanished from a museum. Investigate the clues and discover the culprit.',
      difficulty: 'Medium',
    },
    {
      id: 'painting',
      icon: '🎨',
      title: 'The Missing Masterpiece',
      description:
        'A famous painting disappeared from an art gallery just before its grand exhibition.',
      difficulty: 'Hard',
    },
    {
      id: 'necklace',
      icon: '💍',
      title: 'The Vanished Necklace',
      description:
        'A valuable necklace disappeared during a private celebration at a mansion.',
      difficulty: 'Easy',
    },
  ]

  return (
    <main className="selection-page">
      <button
        className="back-button"
        type="button"
        onClick={onBack}
      >
        ← Back to Home
      </button>

      <header className="investigation-header">
        <div className="badge">CHOOSE YOUR ADVENTURE</div>

        <h1>
          Enter the World of <span>Mystery</span>
        </h1>

        <p className="create-description">
          Every case hides a secret. Are you ready to uncover the truth?
        </p>
      </header>

      <div className="selection-grid">
        {mysteries.map((mystery) => (
          <article className="selection-card" key={mystery.id}>
            <div className="selection-icon">{mystery.icon}</div>

            <div className="badge">READY-MADE CASE</div>

            <h2>{mystery.title}</h2>

            <p>{mystery.description}</p>

            <p>
              <strong>Difficulty:</strong> {mystery.difficulty}
            </p>

            <button
              className="start-button"
              type="button"
              onClick={() => onSelectReadyMade(mystery.id)}
            >
              Solve This Mystery →
            </button>
          </article>
        ))}

        <article className="selection-card">
          <div className="selection-icon">✍️</div>

          <div className="badge">YOUR OWN STORY</div>

          <h2>Create Your Own Mystery</h2>

          <p>
            Build your own case by entering a mystery description
            and choosing a difficulty.
          </p>

          <p>
            <strong>Difficulty:</strong> Your Choice
          </p>

          <button
            className="start-button"
            type="button"
            onClick={onCreateCustom}
          >
            Create a Mystery →
          </button>
        </article>
      </div>
    </main>
  )
}

export default MysterySelection