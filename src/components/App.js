import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TopicList from './TopicList';
import QuestionList from './QuestionList';
import RandomQuestionGenerator from './RandomQuestionGenerator';
import GeneratedQuestions from './GeneratedQuestions';
import Home from './Home';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  
  return (
    <div>
     
      <Router>
      <div>
        <Switch>
          <Route exact path="/"><Home /></Route>
          {/* <Route exact path="/" render={() => <TopicList setSelectedTopic={setSelectedTopic} />} /> */}
          <Route exact path="/topics"><TopicList /></Route>
          <Route path="/questions/:id"> <QuestionList /> </Route>
          <Route path="/random" component={RandomQuestionGenerator} />
          <Route path="/results" component={GeneratedQuestions} />
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;