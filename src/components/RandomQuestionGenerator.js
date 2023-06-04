import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RandomQuestionGenerator() {
  const [topics, setTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [questionCount, setQuestionCount] = useState(0);
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await axios.get('http://localhost:8000/topics');
      setTopics(response.data);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);

    try {
      const topicResponse = await axios.get(`http://localhost:8000/topics`);
      const selectedTopic = topicResponse.data;

      // const questionResponse = await axios.get(`http://localhost:8000/questions?topicId=${selectedTopic.id}`);
      const questionResponse = await axios.get(`http://localhost:8000/questions`, {
        params: {
          topicId: selectedTopic.id,
        },
      });
      setQuestions(questionResponse.data);
      setLoading(false);
    }
    catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };


  const handleTopicSelectionToggle = (topicId) => {
    setSelectedTopics((prevTopics) => {
      // Check if the topic is already selected
      const isTopicSelected = prevTopics.some((topic) => topic.id === topicId);

      // If the topic is selected, remove it from the selected topics
      if (isTopicSelected) {
        return prevTopics.filter((topic) => topic.id !== topicId);
      } else {
        // If the topic is not selected, add it to the selected topics
        const selectedTopic = topics.find((topic) => topic.id === topicId);
        if (selectedTopic) {
          return [...prevTopics, selectedTopic];
        }
      }

      // If no changes are made, return the previous topics array
      return prevTopics;
    });
  };


  const handleQuestionCountChange = (event) => {
    setQuestionCount(parseInt(event.target.value));
  };

  // Function to shuffle an array in-place using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };


  const handleGenerateQuestions = () => {
   
  const selectedQuestions = [];

  // Gather questions from selected topics
  selectedTopics.forEach((selectedTopic) => {
    const topicQuestions = questions.filter(
      (question) => question.topicId === selectedTopic.id
    );
    selectedQuestions.push(...topicQuestions);
  });

  const randomizedQuestions = shuffleArray(selectedQuestions);

  const generatedQuestions = randomizedQuestions.slice(0, questionCount);

  setGeneratedQuestions(generatedQuestions);

  };

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <h3>Generate Random Questions</h3>
      <div>
        <label htmlFor="questionCount">Number of Questions:</label>
        <input
          type="number"
          id="questionCount"
          value={questionCount}
          onChange={handleQuestionCountChange}
        />
      </div>
      <div>
        <h4>Select Topics:</h4>
        {topics.map((topic) => (
          <div key={topic.id}>
            <input
              type="checkbox"
              checked={selectedTopics.some((selectedTopic) => selectedTopic.id === topic.id)}
              onChange={() => handleTopicSelectionToggle(topic.id)}
            />
            <label>{topic.name}</label>
          </div>
        ))}
      </div>
      <button onClick={handleGenerateQuestions}>Generate Questions</button>
      <div>
        <h4>Random Questions:</h4>
        {generatedQuestions.map((question) => (
          <div key={question.id}>{question.text}</div>
        ))}
      </div>
    </div>
  );
}

export default RandomQuestionGenerator;
