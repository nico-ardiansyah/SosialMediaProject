import './index.css';
import { Route, Routes, Navigate } from "react-router";


// provider
import { NavigationProvider } from './component/Navbar/Hooks/NavigationHooks'
import { NavigationUserProfileProvider } from './component/Profile/Hooks/NavigationUserProfileHooks'
import { AuthProvider } from './component/AuthPage/Hooks/AuthHooks'

// Pages
import MainPage from './pages/MainPage'
import Navigation from './component/Navbar/Navigation'
import HeroElement from './pages/HeroElement';
import UserProfile from './component/Profile/UserProfile/UserProfile'
import DetailPostModal from './component/DetailPost/DetailPostModal'

// services



function App() {

  return (
    <>
        <NavigationProvider >
        <NavigationUserProfileProvider >
            <Routes >
              <Route path='/' element={<Navigate to="/auth" replace/>} />
              <Route path='/app?' element={ <HeroElement />} />
            </Routes>
          </NavigationUserProfileProvider>
        </NavigationProvider>
        
      <AuthProvider >
          <Routes >
            <Route path='/auth' element={<MainPage />} />
          </Routes>
      </AuthProvider>
    </>
  )
}

export default App
