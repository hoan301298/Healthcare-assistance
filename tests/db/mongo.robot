*** Settings ***
Library    RequestsLibrary
Library    db.mongo_keywords.MongoKeywords
Variables    ../variables/env.py

*** Test Cases ***
TC001 - Test MongoDB Connection
    Connect    ${MONGO_URI}    ${DB_NAME}

TC002 - Test MongoDB Clear Collection
    Clear Collection    ${COLLECTION}

TC003 - Test MongoDB Disconnect
    Disconnect