*** Settings ***
Library    RequestsLibrary
Library    db.mongo_keywords.MongoKeywords

*** Variables ***
${API_URL}       http://localhost:5000
${MONGO_URI}     mongodb://admin:admin123@localhost:27017
${DB_NAME}       testdb
${COLLECTION}    users

*** Test Cases ***
Test API Endpoint With Local Mongo
    # Connect to test Mongo
    Connect    ${MONGO_URI}    ${DB_NAME}

    # Clear collection before test
    Clear Collection    ${COLLECTION}

    # Insert test data
    ${user}=    Create Dictionary    email=example@example.com    name=example    age=25
    Insert Document    ${COLLECTION}    ${user}

    # Call API endpoint that reads MongoDB
    Create Session    api_session    ${API_URL}
    ${resp}=    Get Request    api_session    /users?name=example
    Should Be Equal As Strings    ${resp.status_code}    200
    Log    ${resp.json()}

    # Disconnect from Mongo
    Disconnect