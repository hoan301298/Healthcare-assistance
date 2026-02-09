INVALID_USERS = [
    {"email": "katarina.makinen@example.com", "password": "example123"},
    {"email": "alice.smith@example.com", "password": "Alice@2023"},
]

VALID_USERS = [
    {"email": "valid_1@valid.com", "password": "example", "name": "Valid User 1"},
    {"email": "valid_2@valid.com", "password": "example", "name": "Valid User 2"},
]

VALID_EMAIL_0 = VALID_USERS[0]["email"]
VALID_PASSWORD_0 = VALID_USERS[0]["password"]

VALID_EMAIL_1 = VALID_USERS[1]["email"]
VALID_PASSWORD_1 = VALID_USERS[1]["password"]

INVALID_EMAIL_0 = INVALID_USERS[0]["email"]
INVALID_PASSWORD_0 = INVALID_USERS[0]["password"]

INVALID_EMAIL_1 = INVALID_USERS[1]["email"]
INVALID_PASSWORD_1 = INVALID_USERS[1]["password"]

EMPTY = ""