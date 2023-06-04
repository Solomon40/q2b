import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TopicList from './TopicList';
import QuestionList from './QuestionList';
import RandomQuestionGenerator from './RandomQuestionGenerator';
import '../App.css';

function App() {
    const [selectedTopic, setSelectedTopic] = useState(null);
  
  return (
    <div>
     
      <Router>
      <div>
        <Switch>
          <Route exact path="/" render={() => <TopicList setSelectedTopic={setSelectedTopic} />} />
          <Route path="/questions/:id"> <QuestionList selectedTopic={selectedTopic}/> </Route>
          <Route path="/random" component={RandomQuestionGenerator} />
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;