import logo from '@/assets/logo.png'; 

export function AuthLogo() {
  return (
    <div className="flex justify-center mb-4">
      <img 
        src={logo} 
        alt="Waka Logo" 
        className="h-16 w-auto animate-fade-in"
      />
    </div>
  );
}