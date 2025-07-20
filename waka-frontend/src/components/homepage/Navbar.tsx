import { useAuth } from '../../contexts/AuthContext';
import logo from '@/assets/logo.png'; 
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <div
        className="text-orange-500 font-bold text-xl cursor-pointer"
        onClick={() => navigate('/')}
      >
         <img src={logo} alt="Waka Logo" className="h-15 w-15 animate-bounce mb-4" />
      </div>
            <div className="flex gap-4">
        {isAuthenticated ? (
          <button
            className="text-sm font-medium text-red-500"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              className="text-sm font-medium"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              className="text-sm font-medium"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
