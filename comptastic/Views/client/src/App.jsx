import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import CompBuild from "./pages/CompBuild.jsx";
import Navigation from "./components/Navigation.jsx";
import Community from "./pages/Community.jsx";
import About from "./pages/About.jsx";
import CompPartPage from "./pages/CompPartPage.jsx";
const App = () => {
    return (
        <div>
            <Navigation/>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='build' element={<CompBuild/>}/>
                <Route path='/build/:component' element={<CompPartPage/>}/>
                <Route path='community' element={<Community/>}/>
                <Route path='about' element={<About/>}/>
                
            </Routes>
        </div>
    );
};

export default App;
