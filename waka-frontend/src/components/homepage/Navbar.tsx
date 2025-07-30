import { useAuth } from '../../contexts/AuthContext';
import logo from '@/assets/logo.png';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  search: string;
  setSearch: (val: string) => void;
  type: string;
  setType: (val: string) => void;
  placeTypes: Array<{ label: string; value: string }>;
}

const Navbar = ({ search, setSearch, type, setType, placeTypes }: NavbarProps) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col sm:flex-row items-center justify-between p-2 sm:p-4 bg-white shadow-md gap-2 sm:gap-0">
      <div
        className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto"
        onClick={() => navigate('/')}
      >
        <img src={logo} alt="Waka Logo" className="h-10 w-10 sm:h-15 sm:w-15 animate-bounce mb-2 sm:mb-0" />
        <input
          className="border px-2 py-2 rounded w-full sm:w-auto"
          placeholder="Search places"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={type} onChange={e => setType(e.target.value)} className="border px-2 py-2 rounded w-full sm:w-auto">
          {placeTypes.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-2 sm:gap-4 mt-2 sm:mt-0">
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