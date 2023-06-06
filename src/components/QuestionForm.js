import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


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
        <Card>
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

            <Card.Header>
                <Card.Title>{question ? 'Edit Question' : 'Add Question'}</Card.Title>
                </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Question: </Form.Label>
                        <Form.Control as="textarea" rows={3} value={questionText} onChange={handleQuestionTextChange} />
                    </Form.Group>

                    <button className="btn btn-primary" type="submit">
                        {question ? 'Save' : 'Add'}
                    </button>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default QuestionForm;
