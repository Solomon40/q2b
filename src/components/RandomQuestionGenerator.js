import React, { useState } from 'react';

function RandomQuestionGenerator({ topics }) {
  const [numQuestions, setNumQuestions] = useState(0);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);

  const handleGenerateQuestions = () => {
    // Logic to generate random questions from selected topics
    const generatedQuestions = [];
    // Implement logic to generate random questions here
    // ...
    console.log(generatedQuestions);
    setGeneratedQuestions(generatedQuestions);
  };

  return (
    <div>
      <h2>Random Question Generator</h2>
      <div>
        <label>Number of Questions:</label>
        <input
          type="number"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
        />
      </div>
      <div>
        <label>Select Topics:</label>
        <select
          multiple
          value={selectedTopics}
          onChange={(e) => setSelectedTopics(Array.from(e.target.selectedOptions, (option) => option.value))}
        >
          {topics.map((topic, index) => (
            <option key={index} value={topic}>{topic}</option>
          ))}
        </select>
      </div>
      <button onClick={handleGenerateQuestions}>Generate Questions</button>
      {generatedQuestions.length > 0 && (
        <div>
            <h3>Generated Questions:</h3>
            <ul>
                {generatedQuestions.map((question, index) => (
                    <li key={index}>{question}</li>
                ))}
            </ul>
        </div>
      )}
    </div>
  );
}

export default RandomQuestionGenerator;
