*** Settings ***
Documentation     Common keywords and resources
Library           BuiltIn
Library           Collections

*** Keywords ***
Setup Test Environment
    [Documentation]    Initialize test environment
    Log    Setting up test environment
    Set Log Level    INFO

Teardown Test Environment
    [Documentation]    Cleanup after tests
    Log    Tearing down test environment

Verify Response Contains Key
    [Arguments]    ${response}    ${key}
    [Documentation]    Verify response dictionary contains expected key
    Dictionary Should Contain Key    ${response}    ${key}
    ...    msg=Response missing key: ${key}