from .base_client import BaseClient
from typing import Dict, Optional

class AuthClient(BaseClient):
    ROBOT_LIBRARY_SCOPE = "GLOBAL"

    def login(self, email: str, password: str) -> Dict:
        """
        Login with email and password using cookie-based authentication.
        
        Args:
            email: User email
            password: User password
            
        Returns:
            Response JSON as dist
        """
        resp = self.post(
            "/v1/auth/login",
            json={
                "email": email,
                "password": password
            }
        )

        assert resp.status_code == 200, (
            f"Login failed with status {resp.status_code}\n"
            f"Response: {resp.text}"
        )

        data = resp.json()
        assert "success" in data, f"'success' missing. Keys: {list(data.keys())}"
        assert data["success"] is True, f"Login success is False. Response: {data}"
        
        # Store token for subsequent requests
        cookies = resp.cookies.get_dict()
        assert "token" in cookies, (
            f"Auth cookie 'token' missing. Cookies: {resp.cookies}"
        )
        
        # Add token from cookie into returned data
        data["token"] = cookies["token"]
        
        return data
    
    def login_invalid(self, email: str, password: str) -> Dict:
        """
        Attempt login with invalid credentials
        
        Returns:
            Response data for validation
        """
        resp = self.post(
            "/v1/auth/login",
            json={
                "email": email,
                "password": password
            }
        )

        assert resp.status_code == 401, (
            f"Expected 401, got {resp.status_code}: {resp.text}"
        )
        
        return resp.json()
    
    def register(self, name: str, email: str, password: str) -> Dict:
        """
        Attempt register with valid properties

        Returns:
            Response data for validation
        """

        resp = self.post(
            "/v1/auth/register",
            json={
                "name": name,
                "email": email,
                "password": password
            }
        )

        data = resp.json()

        cookies = resp.cookies.get_dict()

        data["token"] = cookies["token"]

        return data

    def delete_user(self, id: str):
        """
        Delete a user from the database.
        """

        self.db.execute("DELETE FROM users WHERE id = %s", (id,))


    def logout(self, token: Optional[str] = None) -> Dict:
        """
        Logout user
        
        Args:
            token: Optional token, uses session token if not provided
        """
        headers = {}
        if token:
            headers["Authorization"] = f"Bearer {token}"
        
        resp = self.post("/v1/auth/logout", headers=headers)
        
        assert resp.status_code == 200, f"Logout failed: {resp.text}"
        
        self.clear_auth_token()
        return resp.json()
    
    def reset_password(self, token: str, new_password: str) -> Dict:
        """
        Reset password with token
        
        Args:
            token: Reset token from email
            new_password: New password
        """
        resp = self.post(
            "/v1/auth/password-reset/confirm",
            json={
                "token": token,
                "newPassword": new_password
            }
        )
        
        assert resp.status_code == 200, f"Password reset failed: {resp.text}"
        return resp.json()