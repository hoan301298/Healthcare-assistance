import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface NotFoundProps {
  href: string;
  label: string;
}

const NotFound: React.FC<NotFoundProps> = ({ href, label }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <Button onClick={() => navigate(href)} className=" text-white hover:text-blue-700">
          {label}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
