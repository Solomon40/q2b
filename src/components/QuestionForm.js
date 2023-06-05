import React, { useState } from 'react';
import axios from 'axios';

function QuestionForm({ selectedTopic, question, onQuestionSubmit }) {
    //   code when form was used for only Add Question:
    //  const [newQuestion, setNewQuestion] = useState('');

    // const [inputQuestion, setInputQuestion] = useState(question);
    const [questionText, setQuestionText] = useState(question ? question.text : '');


    //   code when form was used for only Add Question:
    //   const handleAddQuestion = () => {
    //     if (newQuestion.trim() !== '') {
    //       addQuestion(newQuestion);
    //       setNewQuestion('');
    //     }
    //   };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (inputQuestion.trim() !== '') {
    //         if (question) {
    //             updateQuestion(inputQuestion);
    //         }
    //         else {
    //             addQuestion(inputQuestion);
    //         }
    //         setInputQuestion('');
    //     }
    // }

    const handleQuestionTextChange = (event) => {
        setQuestionText(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!questionText.trim()) {
            return;
        }

        try {
            if (question) {
                const updatedQuestion = {
                    id: question.id,
                    text: questionText,
                    topicId: selectedTopic.id
                };
                await axios.put(`http://localhost:8000/questions/${question.id}`, updatedQuestion);
            } else {
                const newQuestion = {
                    text: questionText,
                    topicId: selectedTopic.id
                };
                await axios.post('http://localhost:8000/questions', newQuestion);
            }

            onQuestionSubmit();
            setQuestionText('');
        } catch (error) {
            console.error('Error saving question:', error);
        }
    };

    return (
        <div>
            {/* <h2>Add Question</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Enter Your Question'
                    value={inputQuestion}
                    onChange={(e) => setInputQuestion(e.target.value)}
                />
                <button type="submit">{question ? 'Update Question' : 'Add Question'}</button>
            </form> */}

            <h3>{question ? 'Edit Question' : 'Add Question'}</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Question:
                    <textarea value={questionText} onChange={handleQuestionTextChange}></textarea>
                </label>
                <button type="submit">{question ? 'Save' : 'Add'}</button>
            </form>
        </div>
    );
}

export default QuestionForm;
