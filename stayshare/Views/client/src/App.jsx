import {Routes, Route, Router, BrowserRouter} from 'react-router-dom';
import Home from './components/Home.jsx';
import Navigation from "./components/Navigation.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import Login from "./components/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Register from "./components/Register.jsx";
import Residences from "./components/Residences.jsx";
import ResidenceHome from "./components/ResidenceHome.jsx";
import MyResidence from "./components/MyResidence.jsx";


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/residences"
                        element={
                            <PrivateRoute>
                                <Residences />
                            </PrivateRoute>
                        }
                    />
                    <Route path='/' element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route 
                        path="/residences/residence/:id" 
                        element={
                            <PrivateRoute>
                                <ResidenceHome />
                            </PrivateRoute>
                        }
                    />
                    <Route 
                        path="/myresidence" 
                        element={
                            <PrivateRoute>
                                <MyResidence />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;


