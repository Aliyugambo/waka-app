import logo from '@/assets/logo.png'; 

const LoadingScreen = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white">
    <img src={logo} alt="Waka Logo" className="h-20 w-20 animate-bounce mb-4" />
    <div className="text-xl font-bold text-orange-500">Loading...</div>
  </div>
);
export default LoadingScreen;