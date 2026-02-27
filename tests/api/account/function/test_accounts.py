from libs.auth_client import AuthClient

class TestAccounts:
    ROBOT_LIBRARY_SCOPE = "GLOBAL"

    def __init__(self):
        self.user_ids = []

    def register_accounts(self, VALID_USERS: list):
        """
        Create test user accounts for login tests
        """
        auth_client = AuthClient()
        for user in VALID_USERS:
            data = auth_client.register(
                name=user["name"],
                email=user["email"],
                password=user["password"]
            )
            self.user_ids.append(data["user"]["id"])
        print(f"Registered users: {self.user_ids}")

    def delete_accounts(self):
        """Delete all registered test users"""
        auth_client = AuthClient()
        for user_id in self.user_ids:
            try:
                auth_client.delete_user(user_id)
            except Exception as e:
                print(f"Error deleting user {user_id}: {e}")
        self.user_ids = []
