import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X } from 'lucide-react';
import useAuth from '@/hooks/auth/useAuth';
import UserMenu from './UserMenu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    user
  } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-hero rounded-lg transition-transform group-hover:scale-105">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">HealthCare+</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/search" className="text-foreground hover:text-primary transition-colors">
              Find places
            </Link>
            <Link to="/appointment" className="text-foreground hover:text-primary transition-colors">
              Track appointment
            </Link>
            <Link to="/chat" className="text-foreground hover:text-primary transition-colors">
              Chat Support
            </Link>
            {user ?
              (
                <UserMenu user={user} />
              ) : (
                <Link to="/auth">
                  <Button variant="default" className="bg-primary hover:bg-primary-dark">
                    Login
                  </Button>
                </Link>
              )
            }
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <Link
              to="/"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/search"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Find places
            </Link>
            <Link
              to="/chat"
              className="block py-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Chat Support
            </Link>
            {!user &&
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button variant="default" className="w-full bg-primary hover:bg-primary-dark">
                  Login
                </Button>
              </Link>
            }
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
