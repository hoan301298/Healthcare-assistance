# Valid test users
VALID_USERS = [
    {
        "email": "user1@example.com",
        "password": "Password123!",
    },
    {
        "email": "user2@example.com",
        "password": "Password123!",
    }
]

# Invalid credentials for testing
INVALID_CREDENTIALS = [
    {"email": "invalid@example.com", "password": "wrongpass"},
    {"email": "notanemail", "password": "somepass"},
    {"email": "", "password": "somepass"},
    {"email": "test@example.com", "password": ""},
    {"email": "", "password": ""},
]

# SQL Injection attempts
SQL_INJECTION_PAYLOADS = [
    "admin' OR '1'='1",
    "' OR '1'='1' --",
    "' OR '1'='1' /*",
    "admin'--",
    "' UNION SELECT NULL--"
]

# XSS Payloads
XSS_PAYLOADS = [
    "<script>alert('XSS')</script>",
    "<img src=x onerror=alert('XSS')>",
    "javascript:alert('XSS')"
]