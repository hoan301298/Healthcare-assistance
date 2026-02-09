from .base_client import BaseClient
from typing import Dict, List, Optional

class UserClient(BaseClient):
    ROBOT_LIBRARY_SCOPE = "GLOBAL"
    
    def create_user(self, email: str, password: str, name: str, 
                    role: str = "user") -> Dict:
        """
        Create a new user
        
        Args:
            email: User email
            password: User password
            name: User full name
            role: User role (default: user)
            
        Returns:
            Created user data
        """
        resp = self.post(
            "/v1/users",
            json={
                "email": email,
                "password": password,
                "name": name,
                "role": role
            }
        )
        
        assert resp.status_code == 201, (
            f"User creation failed with status {resp.status_code}\n"
            f"Response: {resp.text}"
        )
        
        return resp.json()
    
    def get_user(self, user_id: str) -> Dict:
        """
        Get user by ID
        
        Args:
            user_id: User ID
            
        Returns:
            User data
        """
        resp = self.get(f"/v1/users/{user_id}")
        
        assert resp.status_code == 200, (
            f"Get user failed with status {resp.status_code}\n"
            f"Response: {resp.text}"
        )
        
        return resp.json()
    
    def get_current_user(self) -> Dict:
        """
        Get currently authenticated user
        
        Returns:
            Current user data
        """
        resp = self.get("/v1/users/me")
        
        assert resp.status_code == 200, f"Get current user failed: {resp.text}"
        
        return resp.json()
    
    def update_user(self, user_id: str, **updates) -> Dict:
        """
        Update user information
        
        Args:
            user_id: User ID
            **updates: Fields to update (name, email, role, etc.)
            
        Returns:
            Updated user data
        """
        resp = self.put(f"/v1/users/{user_id}", json=updates)
        
        assert resp.status_code == 200, (
            f"User update failed with status {resp.status_code}\n"
            f"Response: {resp.text}"
        )
        
        return resp.json()
    
    def patch_user(self, user_id: str, **updates) -> Dict:
        """
        Partially update user information
        
        Args:
            user_id: User ID
            **updates: Fields to update
            
        Returns:
            Updated user data
        """
        resp = self.patch(f"/v1/users/{user_id}", json=updates)
        
        assert resp.status_code == 200, f"User patch failed: {resp.text}"
        
        return resp.json()
    
    def delete_user(self, user_id: str) -> Dict:
        """
        Delete user
        
        Args:
            user_id: User ID
        """
        resp = self.delete(f"/v1/users/{user_id}")
        
        assert resp.status_code in [200, 204], (
            f"User deletion failed with status {resp.status_code}\n"
            f"Response: {resp.text}"
        )
        
        return resp.json() if resp.status_code == 200 else {}
    
    def list_users(self, page: int = 1, limit: int = 10, 
                   role: Optional[str] = None) -> Dict:
        """
        List users with pagination
        
        Args:
            page: Page number
            limit: Items per page
            role: Filter by role
            
        Returns:
            List of users and pagination info
        """
        params = {"page": page, "limit": limit}
        if role:
            params["role"] = role
        
        resp = self.get("/v1/users", params=params)
        
        assert resp.status_code == 200, f"List users failed: {resp.text}"
        
        return resp.json()
    
    def search_users(self, query: str) -> List[Dict]:
        """
        Search users by query
        
        Args:
            query: Search query (name or email)
            
        Returns:
            List of matching users
        """
        resp = self.get("/v1/users/search", params={"q": query})
        
        assert resp.status_code == 200, f"User search failed: {resp.text}"
        
        return resp.json()