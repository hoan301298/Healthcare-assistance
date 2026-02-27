*** Settings ***
Library    RequestsLibrary
Library    db.mongo_keywords.MongoKeywords
Variables    ../variables/env.py

*** Test Cases ***
TC001 - Test MongoDB Connection
    Connect

TC003 - Test MongoDB Disconnect
    Disconnect