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
         <img src={logo} alt="Waka Logo" className="h-20 w-20 animate-bounce mb-4" />
      </div>
      <div className="flex gap-2 items-center">
        <input
          className="border px-3 py-2 rounded-full"
          placeholder="Search places"
        />
        <select className="border px-3 py-2 rounded-full">
          <option value="Kaduna">Kaduna</option>
          <option value="Abuja">Abuja</option>
        </select>
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
