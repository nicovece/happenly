Feature: Show/hide an event details

  Scenario: Event element details box is collapsed by default
    Given the app is launched
    When the main page is loaded
    Then the event details box is hidden

  Scenario: User can expand and show the event element details box
    Given the main page is loaded
    And events list is loaded
    And the event details box is hidden
    When the user clicks on an event show details button
    Then the event details box is shown

  Scenario: User can collapse an event to hide details
    Given the main page is loaded
    And events list is loaded
    And the event details box is shown
    When the user clicks on an event hide details button
    Then the event details box is hidden
