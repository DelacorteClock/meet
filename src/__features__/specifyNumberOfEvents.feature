Feature: Specify number of events

  Scenario: When user didn't choose a number 25 is the default number
    Given that the app got opened
    When the user did not type a number of events
    Then there would be 25 events on the page

  Scenario: User can change number of events
    Given that the app got opened
    When the user types a new event number
    Then the app would display that amount of events