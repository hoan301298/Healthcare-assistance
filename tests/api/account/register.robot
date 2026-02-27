*** Settings ***
Documentation    Test suite for register functionality
Library          libs.auth_client.AuthClient
Variables        variables.env
Variables        variables.test_data
Resource         ../../resources/common.robot

Suite Setup      Setup Test Environment
Suite Teardown   Teardown Test Environment

*** Variables ***
${INVALID_EMAIL}        wrong&example.com
${INVALID_NAME}         ''
${INVALID_PASSWORD}     ''

*** Test Cases ***

TC001 - Register Valid Users
    FOR    ${user}    IN    @{VALID_USERS}
        ${email}=    Get From Dictionary    ${user}    email
        ${password}=    Get From Dictionary    ${user}    password
        ${name}=    Get From Dictionary    ${user}    name
        ${resp}=    Register    ${email}    ${password}    ${name}
        Log    Registered user: ${resp["email"], resp["id"]}
        Delete User    ${resp["id"]}
    END