import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import History from './pages/History';
import Home from './pages/Home';
import Profile from './pages/Profile';
import RecycleRequest from './pages/RecycleRequest';
import TrackingProgress from './pages/TrackingProgress';
import ForgotPassword from './pages/auth/ForgotPassword';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

function App() {
    return (
        <Routes>
            {/* Auth routes - standalone without nested structure */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />

            {/* Main app routes with Layout */}
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="recycle" element={<RecycleRequest />} />
                <Route path="history" element={<History />} />
                <Route path="profile" element={<Profile />} />
                <Route path="tracking-progress" element={<TrackingProgress />} />
            </Route>
        </Routes>
    );
}

export default App; 