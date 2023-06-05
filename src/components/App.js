import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TopicList from './TopicList';
import QuestionList from './QuestionList';
import RandomQuestionGenerator from './RandomQuestionGenerator';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  
  return (
    <div>
     
      <Router>
      <div>
        <Switch>
          {/* <Route exact path="/" render={() => <TopicList setSelectedTopic={setSelectedTopic} />} /> */}
          <Route exact path="/"><TopicList /></Route>
          <Route path="/questions/:id"> <QuestionList /> </Route>
          <Route path="/random" component={RandomQuestionGenerator} />
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;