
import { Link } from 'react-router-dom';

const Home = () => {
    return ( 
        <header className="masthead d-flex align-items-center">
        <div className="container px-4 px-lg-5 text-center">
            <h1 className="mb-1">Welcome to the Quiz Question Bank</h1>
            <h3 className="mb-5"><em>Do More</em></h3>
            <Link className="btn btn-primary btn-xl" style={{marginRight: "20px"}} to="/topics">See Topics</Link>
            <Link className="btn btn-success btn-xl" to="/random">Generate Questions</Link>
        </div>
    </header>
     );
}
 
export default Home;