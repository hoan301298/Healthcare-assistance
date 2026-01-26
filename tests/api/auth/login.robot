*** Settings ***
Documentation     Test suite for login functionality
Library           libs.auth_client.AuthClient
Variables         variables.env
Resource          ../../resources/common.robot

Suite Setup       Setup Test Environment
Suite Teardown    Teardown Test Environment

*** Variables ***
${INVALID_EMAIL}         wrong@example.com
${INVALID_PASSWORD}      wrongpass

*** Test Cases ***
TC001 - Login With Valid Credentials
    [Documentation]    Verify successful login with valid credentials
    [Tags]    smoke    login    positive    critical
    
    ${resp}=    Login    ${TEST_USER_EMAIL}    ${TEST_USER_PASSWORD}
    
    Should Be True    ${resp["success"]}
    Should Not Be Empty    ${resp["token"]}

    Log    Successfully logged in with success: ${resp["success"]}

TC002 - Login With Invalid Email
    [Documentation]    Verify login fails with incorrect email
    [Tags]    login    negative
    
    ${resp}=    Login Invalid    ${INVALID_EMAIL}    ${TEST_USER_PASSWORD}
    
    Should Not Be True    ${resp["success"]}

    Log    Login correctly rejected for invalid email

TC003 - Login With Invalid Password
    [Documentation]    Verify login fails with incorrect password
    [Tags]    login    negative
    
    ${resp}=    Login Invalid    ${TEST_USER_EMAIL}    ${INVALID_PASSWORD}
    
    Should Not Be True    ${resp["success"]}

    Log    Login correctly rejected for invalid password

TC004 - Login With Empty Email
    [Documentation]    Verify login fails with empty email
    [Tags]    login    negative    validation
    
    Run Keyword And Expect Error    *
    ...    Login Invalid    ${EMPTY}    ${TEST_USER_PASSWORD}

TC005 - Login With Empty Password
    [Documentation]    Verify login fails with empty password
    [Tags]    login    negative    validation
    
    Run Keyword And Expect Error    *
    ...    Login Invalid    ${TEST_USER_EMAIL}    ${EMPTY}

*** Keywords ***
Setup Test Environment
    [Documentation]    Setup for login tests
    Log    Initializing login test suite
    Set Log Level    DEBUG

Teardown Test Environment
    [Documentation]    Cleanup after login tests
    Log    Login test suite completed