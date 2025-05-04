Feature: Specify Number of Events

  Scenario: Display the default number (32) of events unless otherwise specified
    Given the main page is loaded
    When the events list is loaded
    Then the default number of events is applied
    # And that number of events is displayed

  Scenario: User can set the number of events to be displayed
    Given the main page is loaded
    And the events list is loaded
    When the user sets the number of events to display using the input field
    Then that number of events is displayed