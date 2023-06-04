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