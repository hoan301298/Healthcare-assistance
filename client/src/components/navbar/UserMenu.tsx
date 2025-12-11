import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/auth/useAuth";
import { Link } from "react-router-dom";

const UserMenu = ({ user }) => {
  const { logout } = useAuth();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.avatarUrl || ""} />
          <AvatarFallback>
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          Logged in as <br />
          <span className="font-medium">{user.name}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <Link to="/profile">
          <DropdownMenuItem className="cursor-pointer">
            Profile
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem className="cursor-pointer">
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
          className="cursor-pointer text-red-600" 
          onClick={logout}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;