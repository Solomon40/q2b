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
