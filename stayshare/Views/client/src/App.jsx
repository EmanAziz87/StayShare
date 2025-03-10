import {Routes, Route, Router, BrowserRouter} from 'react-router-dom';
import Home from './components/Home.jsx';
import Navigation from "./components/Navigation.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import Login from "./components/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Register from "./components/Register.jsx";


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;


