
import ProfileInfoCard from '@/components/cards/ProfileinfoCard';
import Modal from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { UserContext } from '@/context/usercontext';
import Login from '@/pages/auth/login';
import SignUp from '@/pages/auth/signup';
import { Heart, Menu, User } from 'lucide-react';
import { useContext, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   const navigate = useNavigate();
   const [openAuthModal,setOpenAuthModal]=useState(false);
   const [currentPage,setCurrentPage]= useState("login");
   const {user} = useContext(UserContext);
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleCTA = ()=>{
    if(!user){
        setOpenAuthModal(true);
    }else{
        navigate("/dashboard");
    }
  }
  
  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur border-b" style={{ borderColor: '#A8D0E6' }}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8" style={{ color: '#7B9ACC' }} />
            <span className="text-2xl" style={{ color: '#4A4A4A' }}>ManoMitra</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            
        {user ? <ProfileInfoCard/> :<Button 
                variant="outline" 
                size="sm"
                onClick={()=> setOpenAuthModal(true)}
                className="border cursor-pointer"
                style={{ borderColor: '#A8D0E6', color: '#4A4A4A' }}
            >
                <User className="w-4 h-4 mr-2" />
                Login
            </Button>}
            <Button 
              size="sm"
              onClick={() => scrollToSection('resources')}
              className="text-white cursor-pointer bg-[#7B9ACC] hover:bg-[#a5c2f0]"
              
            >
              Get Help
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 border-t mt-4" style={{ borderColor: '#A8D0E6' }}>
            <div className="flex flex-col gap-2">
              <button 
                onClick={()=>navigate('/login')}
                className="text-left py-2 transition-colors"
                style={{ color: '#4A4A4A' }}
              >
                Login
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
    <Modal
     isOpen={openAuthModal}
        onClose={()=>{
            setOpenAuthModal(false);
            setCurrentPage("login")
        }}
        hideHeader
    >
       <div>
        {currentPage === "login"&&(
            <Login setCurrentPage={setCurrentPage}/>
        )}
        {currentPage ==="signup"&&(
            <SignUp setCurrentPage={setCurrentPage}/>
        )}
       </div>
    </Modal>
    </>
  );
}