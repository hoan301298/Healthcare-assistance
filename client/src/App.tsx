import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import PlacesDetail from "./pages/PlaceDetail";
import Booking from "./pages/Booking";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Appointment from "./pages/Appointment";
import useAuth from "./hooks/auth/useAuth";

const queryClient = new QueryClient();

const App = () => {
  const {
    user,
    isAuthenticated
  } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/place/:id" element={<PlacesDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/appointment-detail" element={<Appointment />} />
            <Route path="/chat" element={<Chat />} />
            {!user && !isAuthenticated && <Route path="/auth" element={<Auth />} /> }
            <Route path="*" element={<NotFound href="/" label="Back to Home page" />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
