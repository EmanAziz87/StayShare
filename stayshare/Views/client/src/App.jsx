import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Navigation from "./components/Navigation.jsx";

const App = () => {
    return (
        <div>
            <Navigation/>
            <Routes>
                <Route path='/' element={<Home/>} />
            </Routes>
        </div>
    );
};

export default App;
