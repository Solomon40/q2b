import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


function TopicList() {

    // const [newTopic, setNewTopic] = useState('');



    // const handleAddTopic = () => {
    //     if (newTopic.trim() !== '') {
    //         addTopic(newTopic);
    //         setNewTopic('');
    //     }
    // };

    const [topics, setTopics] = useState([]);

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

    // before using URL Params:
    // const handleTopicClick = (topic) => {
    //     setSelectedTopic(topic.name);
    // };
    // onClick={() => handleTopicClick(topic)}

    const [show, setShow] = useState(false);
    const [topicText, setTopicText] = useState('');

    const handleClose = () => setShow(false);
    const handleTopicTextChange = (event) => setTopicText(event.target.value);

    const addTopic = async () => {
        setShow(true);
       
    };

    const handleSubmit = async () => {
        const newTopic = topicText;
        if (newTopic) {
            try {
                await axios.post('http://localhost:8000/topics', { name: newTopic });
                fetchTopics(); // Fetch updated topics after adding a new topic
            } catch (error) {
                console.error('Error adding topic:', error);
            }
        }
    }


    return (
        <section class="callout">
            <div class="container px-4 px-lg-5 text-center">
                <h2 class="mx-auto mb-5">
                    Available Topics
                </h2>
                <div className='mb-5'>
                    {topics.map((topic) => (
                        <Card key={topic.id}>
                            <Card.Body><Link class="btn" to={`/questions/${topic.id}`} >
                                {topic.name}
                            </Link></Card.Body>
                        </Card>

                    ))}
                </div>

                <button class="btn btn-xl btn-light me-4" onClick={addTopic}>Add Topic</button>
                <Link to="/random" class="btn btn-xl btn-dark" >Generate Questions</Link>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Topic</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-5" controlId="exampleForm.ControlInput1">
                                <Form.Label>Enter a new topic:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="e.g Mathematics"
                                    value={topicText} onChange={handleTopicTextChange}
                                    autoFocus
                                />
                            </Form.Group>
                         
                        <button className="btn btn-secondary me-3" onClick={handleClose}>
                            Close
                        </button>
                        <button className="btn btn-primary" type="submit">
                            Save Changes
                        </button>
                        </Form>
                    </Modal.Body>
                    
                </Modal>
            </div>
        </section>
    );
}

export default TopicList;


