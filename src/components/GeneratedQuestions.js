import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';

const GeneratedQuestions = () => {
    const location = useLocation();
    const [generatedQuestions, setGeneratedQuestions] = useState([]);
    let currentQuestion = 0;

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const questionsParam = searchParams.get('questions');
        const generatedQuestions = JSON.parse(questionsParam);
        setGeneratedQuestions(generatedQuestions);

    }, [location.search]);

    console.log(generatedQuestions);
    return (
        <div className='callout-questions'>
            <h2>Generated Questions:</h2>
            {generatedQuestions.map((question) => (
                <>
                    <Card className='mb-3' key={question.id}>
                        <Card.Header>{currentQuestion += 1} of {generatedQuestions.length}</Card.Header>
                        <Card.Body>
                            <Card.Text style={{ whiteSpace: 'pre-wrap' }}>{question.text}</Card.Text>
                        </Card.Body>
                    </Card>
                </>
            ))}
        </div>
    );
}

export default GeneratedQuestions;