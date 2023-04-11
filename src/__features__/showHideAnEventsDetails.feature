Feature: Show/hide an event's details

  Scenario: The default is that the event element is collapsed
    Given that the app got opened
    When an event did not get clicked by the user
    Then the event will be collapsed
  Scenario: User can expand event to see details
    Given that the app got opened
    When an event gets expanded by the user
    Then the user would see event details
  Scenario: User can collapse event to hide details
    Given that the user expanded an event
    When the user collapses the event
    Then the event details would get hidden