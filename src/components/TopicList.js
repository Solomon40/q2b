import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



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

    const addTopic = async () => {
        const newTopic = prompt('Enter a new topic:');
        if (newTopic) {
            try {
                await axios.post('http://localhost:8000/topics', { name: newTopic });
                fetchTopics(); // Fetch updated topics after adding a new topic
            } catch (error) {
                console.error('Error adding topic:', error);
            }
        }
    };


    return (
        <div className="App" >
            <h2>Topics</h2>
            <ul>
                {topics.map((topic) => (
                    <li key={topic.id}>
                        <Link to={`/questions/${topic.id}`} >
                            {topic.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <button onClick={addTopic}>Add Topic</button>
            <Link to="/random"> Generate Random Questions</Link> 
        </div>
    );
}

export default TopicList;
