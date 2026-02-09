*** Settings ***
Documentation     Test suite for login functionality
Library           libs.auth_client.AuthClient
Library           api.account.function.test_accounts.TestAccounts
Variables         ./data/login_data.py
Resource          ../../resources/common.robot

Suite Setup       Register Accounts    (${VALID_USERS})
Suite Teardown    Delete Accounts

*** Test Cases ***
TC001 - Login With Valid Credentials
    [Documentation]    Verify successful login with valid credentials
    [Tags]    smoke    login    positive    critical
    
    ${resp}=    Login    ${VALID_EMAIL_0}    ${VALID_PASSWORD_0}
    
    Should Be True    ${resp["success"]}
    Should Not Be Empty    ${resp["token"]}

    Log    Successfully logged in with success: ${resp["success"]}

TC002 - Login With Invalid Email
    [Documentation]    Verify login fails with incorrect email
    [Tags]    login    negative
    
    ${resp}=    Login Invalid    ${INVALID_EMAIL_0}    ${VALID_PASSWORD_0}
    
    Should Not Be True    ${resp["success"]}

    Log    Login correctly rejected for invalid email

TC003 - Login With Invalid Password
    [Documentation]    Verify login fails with incorrect password
    [Tags]    login    negative
    
    ${resp}=    Login Invalid    ${VALID_EMAIL_1}    ${INVALID_PASSWORD_1}
    
    Should Not Be True    ${resp["success"]}

    Log    Login correctly rejected for invalid password

TC004 - Login With Empty Email
    [Documentation]    Verify login fails with empty email
    [Tags]    login    negative    validation
    
    Run Keyword And Expect Error    *
    ...    Login Invalid    ${EMPTY}    ${VALID_PASSWORD_0}

TC005 - Login With Empty Password
    [Documentation]    Verify login fails with empty password
    [Tags]    login    negative    validation
    
    Run Keyword And Expect Error    *
    ...    Login Invalid    ${VALID_EMAIL_1}    ${EMPTY}
