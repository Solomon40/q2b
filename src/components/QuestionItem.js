import React, { useState } from 'react';

function QuestionItem({ question, index, updateQuestion, deleteQuestion }) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedQuestion, setUpdatedQuestion] = useState(question);

    const handleEditQuestion = () => {
        setIsEditing(true);
    };

    const handleUpdateQuestion = () => {
        if (updatedQuestion.trim() !== '') {
            updateQuestion(index, updatedQuestion);
            setIsEditing(false);
        }
    };

    const handleDeleteQuestion = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this question?');
        if (confirmDelete) {
            deleteQuestion(index);
        }
        };

        return (
            <li>
                {isEditing ? (
                    <div>
                        <input
                            type='text'
                            value={updatedQuestion}
                            onChange={(e) => setUpdatedQuestion(e.target.value)}
                        />
                        <button onClick={handleUpdateQuestion}>Save</button>
                    </div>
                ) : (
                    <div>
                        <span>{question}</span>
                        <button onClick={handleEditQuestion}>Edit</button>
                        <button onClick={handleDeleteQuestion}>Delete</button>
                    </div>
                )
                }
            </li>
        );

    }

    export default QuestionItem;



    // OLD Random Question Generator code, when there was no databasse:

//     import { useState } from 'react';
// import { Redirect, useLocation } from 'react-router-dom';

// function RandomQuestionGenerator() {
//   const location = useLocation();
//   const [numQuestions, setNumQuestions] = useState(0);
//   const [selectedTopics, setSelectedTopics] = useState([]);
//   const [generatedQuestions, setGeneratedQuestions] = useState([]);
//   const { topics } = location.state; 

//   if (!topics) {
//     // If topic is undefined, redirect to the topic list page or any fallback route
//     return <Redirect to="/" />;
//   }

//   const handleGenerateQuestions = () => {
//     // Logic to generate random questions from selected topics
//     const generatedQuestions = [];
//     // Implement logic to generate random questions here
//     // ...
//     console.log(generatedQuestions);
//     setGeneratedQuestions(generatedQuestions);
//   };

//   return (
//     <div>
//       <h2>Random Question Generator</h2>
//       <div>
//         <label>Number of Questions:</label>
//         <input
//           type="number"
//           value={numQuestions}
//           onChange={(e) => setNumQuestions(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Select Topics:</label>
//         <select
//           multiple
//           value={selectedTopics}
//           onChange={(e) => setSelectedTopics(Array.from(e.target.selectedOptions, (option) => option.value))}
//         >
//           {topics.map((topic, index) => (
//             <option key={index} value={topic}>{topic}</option>
//           ))}
//         </select>
//       </div>
//       <button onClick={handleGenerateQuestions}>Generate Questions</button>
//       {generatedQuestions.length > 0 && (
//         <div>
//             <h3>Generated Questions:</h3>
//             <ul>
//                 {generatedQuestions.map((question, index) => (
//                     <li key={index}>{question}</li>
//                 ))}
//             </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default RandomQuestionGenerator;




// OLD Handle Generate Questions function, causing confusion between number generated and number count...
// const handleGenerateQuestions = () => {
     // const remainingCount = Math.min(questionCount, selectedTopics.length); //to ensure generated questions do not exceed question count
    // Create an array to store the generated questions
    // const generatedQuestions = [];


     // Generate at least one question from each selected topic
    // selectedTopics.slice(0, remainingCount).forEach((selectedTopic) => {
    //   console.log(selectedTopics);
    //   const topicQuestions = questions.filter(
    //     (question) => question.topicId === selectedTopic.id
    //   );

    //   if (topicQuestions.length > 0) {
    //     const shuffledQuestions = shuffleArray(topicQuestions);
    //     generatedQuestions.push(shuffledQuestions[0]);
    //   }
    // });

    // // Generate additional questions randomly from remaining topics
    // const additionalCount = Math.max(0, questionCount - generatedQuestions.length);
    // const additionalTopics = selectedTopics.slice(remainingCount);

    // for (let i = 0; i < additionalCount; i++) {
    //   const randomTopic = additionalTopics[Math.floor(Math.random() * additionalTopics.length)];
    //   const topicQuestions = questions.filter(
    //     (question) => question.topicId === randomTopic.id
    //   );

    //   if (topicQuestions.length > 0) {
    //     const shuffledQuestions = shuffleArray(topicQuestions);
    //     generatedQuestions.push(shuffledQuestions[0]);
    //   }
    // }


    // Loop through the selected topics
    // selectedTopics.forEach((selectedTopic) => {
    //   // Get the questions for the current topic
    //   const topicQuestions = questions.filter(
    //     (question) => question.topicId === selectedTopic.id
    //   );

    //   // Shuffle the questions randomly
    //   const shuffledQuestions = shuffleArray(topicQuestions);

    //   // Take the required number of questions from the shuffled array
    //   // const selectedQuestions = shuffledQuestions.slice(0, remainingCount);

    //   // We check if the shuffledQuestions array for a topic has at least one question using shuffledQuestions.length > 0.
    //   if (shuffledQuestions.length > 0) {
    //     // If there are questions available for the topic, select the first question
    //     generatedQuestions.push(shuffledQuestions[0]);
    //     remainingCount--;
    //   }

    //   const selectedQuestions = shuffledQuestions.slice(1, remainingCount + 1);


    //   // Add the selected questions to the generated questions array
    //   generatedQuestions.push(...selectedQuestions);
    //   remainingCount -= selectedQuestions.length;

    //   if (remainingCount <= 0) {
    //     return; // Exit the loop if we have generated enough questions
    //   }
    // });

    // Update the state with the generated questions
    // setGeneratedQuestions(generatedQuestions);


//}



// old TopicList component, when there was no bootstrap
// <div>
//             <h2>Topics</h2>
            // <ul>
            //     {topics.map((topic) => (
            //         <li key={topic.id}>
            //             <Link to={`/questions/${topic.id}`} >
            //                 {topic.name}
            //             </Link>
            //         </li>
            //     ))}
            // </ul>
//             <button onClick={addTopic}>Add Topic</button>
//             <Link to="/random"> Generate Random Questions</Link>
//         </div>