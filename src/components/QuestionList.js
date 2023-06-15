import React, { useState, useEffect } from 'react';
import QuestionForm from './QuestionForm';
// import QuestionItem from './QuestionItem';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

function QuestionList() {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [editingQuestionId, setEditingQuestionId] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
    let currentQuestion = 0;

    // for when there wasn't a database:
    // const addQuestion = (question) => {
    //     setQuestions([...questions, question]);
    // };

    // const updateQuestion = (index, updatedQuestion) => {
    //     const updatedQuestions = [...questions];
    //     updatedQuestions[index] = updatedQuestion;
    //     setQuestions(updatedQuestions);
    // };

    // const deleteQuestion = (index) => {
    //     const updatedQuestions = [...questions];
    //     updatedQuestions.splice(index, 1);
    //     setQuestions(updatedQuestions);
    // };

    // OLD SCHOOL get Topics first:
    // OLD SCHOOL get topics first:
    useEffect(() => {
        fetchTopicById();
    }, [id]);

    const fetchTopicById = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/topics/${id}`);
            if (response.data) {
                setSelectedTopic(response.data);
            } else {
                setSelectedTopic(null);
            }
        } catch (error) {
            console.error('Error fetching topic:', error);

        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [id]);

    const fetchQuestions = async () => {
        setLoading(true);

        try {
            const topicResponse = await axios.get(`http://localhost:8000/topics/${id}`);
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

    const handleQuestionSubmit = async () => {
        setEditingQuestionId(null);
        await fetchQuestions();
    };

    const handleEditQuestion = (questionId) => {
        setEditingQuestionId(questionId);
    };

    const handleDeleteQuestion = async (questionId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this question?');
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8000/questions/${questionId}`);
                await fetchQuestions();
            } catch (error) {
                console.error('Error deleting question:', error);
            }
        }
    };

    const handleAddQuestion = () => {
        setShowAddQuestionForm(true);
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='callout-questions'>
            {/* For when there was no database
            
            <h2>Questions for {selectedTopic}</h2>
            <ul>
                {questions.map((question, index) => (
                    //   <li key={index}>
                    //     {question}{' '}
                    //     <button onClick={() => deleteQuestion(index)}>Delete</button>
                    //   </li>
                    <QuestionItem
                        key={index}
                        question={question}
                        index={index}
                        updateQuestion={updateQuestion}
                        deleteQuestion={deleteQuestion}
                    />
                ))}
            </ul>
            <QuestionForm addQuestion={addQuestion} /> */}

            <h2>Questions for {selectedTopic ? selectedTopic.name : 'Unknown Topic'}</h2>
            {/* For when there was no Edit and Delete buttons
            
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>{question.text}</li>
                ))}
            </ul>
            <QuestionForm selectedTopic={selectedTopic} /> */}

            {questions.map((question) => (
                <Card className='mb-3' key={question.id}>
                    {editingQuestionId === question.id ? (
                        <QuestionForm
                            selectedTopic={selectedTopic}
                            question={question}
                            onQuestionSubmit={handleQuestionSubmit}
                        />
                    ) : (
                        <>
                            <Card.Header>{currentQuestion += 1} of {questions.length}</Card.Header>
                            <Card.Body className=''>
                                <Card.Text style={{ whiteSpace: 'pre-wrap' }}>{question.text}</Card.Text>
                                <button className='btn btn-primary me-2' onClick={() => handleEditQuestion(question.id)}>Edit</button>
                                <button className='btn btn-danger' onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
                            </Card.Body>
                        </>
                    )}
                </Card>
            ))}
            {showAddQuestionForm ? (
                <QuestionForm
                    selectedTopic={selectedTopic}
                    onQuestionSubmit={handleQuestionSubmit}
                />
            ) : (
                <button className='btn btn-success' onClick={handleAddQuestion}>Add Question</button>
            )}
        </div>
    );
}


export default QuestionList;

