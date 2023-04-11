Feature: Filter events by city

  Scenario: When user didn't search city shew upcoming events from all cities.
    Given that user didn't search for any city
    When the user opens the app
    Then the user should see the list of upcoming events

  Scenario: User should see list of suggestions after searching for city
    Given that the main page is open
    When the user starts typing in the city textbox
    Then the user should receive a list of cities (suggestions) which match what the user typed

  Scenario: User can select a city from the suggested list
    Given that user was typing 'Du' in the city textbox
    And the list of suggested cities is shewing
    When the user selects a city (eg 'Dubai - United Arab Emirates') from the list
    Then the city should be changed to that city (ie 'Dubai - United Arab Emirates')
    And the user should receive a list of upcoming events in that city
