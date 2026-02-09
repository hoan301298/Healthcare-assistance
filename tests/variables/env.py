import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# API Configuration
BASE_URL = os.getenv("BASE_URL", "http://localhost:5000")
API_VERSION = os.getenv("API_VERSION", "v1")
REQUEST_TIMEOUT = int(os.getenv("REQUEST_TIMEOUT", "30"))
MONGO_URI = os.getenv("MONGO_URI", "mongodb://admin:admin123@localhost:27017")
DB_NAME = os.getenv("DB_NAME", "testdb")
COLLECTION = os.getenv("COLLECTION", "users")


# Test User Credentials
TEST_USER_EMAIL = os.getenv("TEST_USER_EMAIL", "katarina.makinen@example.com")
TEST_USER_PASSWORD = os.getenv("TEST_USER_PASSWORD", "example123")

# Admin User Credentials
ADMIN_USER_EMAIL = os.getenv("ADMIN_USER_EMAIL", "admin@example.com")
ADMIN_USER_PASSWORD = os.getenv("ADMIN_USER_PASSWORD", "Admin@1234")

# Test Configuration
ENABLE_SCREENSHOTS = os.getenv("ENABLE_SCREENSHOTS", "true").lower() == "true"
ENABLE_LOGGING = os.getenv("ENABLE_LOGGING", "true").lower() == "true"
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")