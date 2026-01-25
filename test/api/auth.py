import requests

class Auth:
    def __init__(self):
        self.token = None

    def login_and_get_token(self, base_url, username, password):
        url = f"{base_url}/auth/login"

        payload = {
            "username": username,
            "password": password
        }

        response = requests.post(url, json=payload)
        response.raise_for_status()

        self.token = response.json().get("access_token")
        return self.token

    def get_auth_headers(self):
        if not self.token:
            raise Exception("Token not found. Please login first.")

        return {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json"
        }
