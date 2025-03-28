import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './components/Home.jsx';
import Navigation from "./components/Navigation.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import Login from "./components/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Register from "./components/Register.jsx";
import Residences from "./components/Residences.jsx";
import ResidenceHome from "./components/ResidenceHome.jsx";
import MyResidence from "./components/MyResidence.jsx";
import Calendar from "./components/Calendar.jsx";
import ChoreHome from "./components/ChoreHome.jsx";


function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                        <Route 
                            path="/residences/residence/:id/calendar"
                            element={
                                <PrivateRoute>
                                    <Calendar />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/residences/residence/:id/chore/:choreId/:index/:year/:month/:day"
                            element={<ChoreHome />}
                        />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </LocalizationProvider>
    );
}

export default App;


