# Happenly

**Discover, Track & Visualize Events That Matter**

Happenly is your smart event companion. Filter events by city, control how much detail you see, and set your perfect number of listings. Even offline, Happenly keeps you connected to what’s happening. Add it to your home screen for one-tap access, and explore interactive charts to make informed choices. Wherever life takes you — Happenly makes it easy to keep up.

---

## 🚀 Features

### Feature: Filter Events By City

In order to find events in my preferred location
As an event attendee
I want to filter the event list by city

#### Scenario: Filter by a city with no events

    - **Given** I am on the Events List screen
    - **And** the app has loaded upcoming events from multiple cities
    - **When** I select "Atlantis" from the city filter control
    - **Then** I see a message "No events found in Atlantis"
    - **And** the event list is empty

#### Scenario: Clear the city filter

    - **Given** I have filtered events to "Rome"
    - **When** I click the "Clear filter" button
    - **Then** the full list of events is shown
    - **And** no city filter is applied

#### Scenario: Select multiple cities

    - **Given** the city filter supports multi‑select
    - **When** I select "Rome" and "Milan" from the filter control
    - **Then** the list shows only events in either "Rome" or "Milan"

#### Scenario: Default state shows all events

    - **Given** I open the Events List screen for the first time
    - **Then** all loaded events from every city are visible

### Feature: Show/Hide Event Details

In order to control how much information I see at a glance
As an event attendee
I want to show or hide details for each event

#### Scenario: Persist expanded state across navigation

    - **Given** I have expanded details for the "JavaScript Conference"
    - **When** I navigate to the Home screen
    - **And** I return to the Events List screen
    - **Then** the "JavaScript Conference" is still expanded

#### Scenario: Expand all and collapse all

    - **Given** I am on the Events List screen
    - **When** I click "Expand all"
    - **Then** every event in the list expands
    - **When** I click "Collapse all"
    - **Then** every event in the list collapses

#### Scenario: Toggle details via keyboard for accessibility

    - **Given** I focus on the "Show Details" button for an event
    - **When** I press the Space key
    - **Then** the event expands
    - **And** a screen reader announcement "Details expanded" is made

### Feature: Specify Number of Events

In order to focus on the most relevant events
As an event attendee
I want to set how many upcoming events are displayed

#### Scenario: Invalid number input shows error

    - **Given** I am on the Events List screen
    - **When** I enter "0" into the "Number of events" field
    - **Then** I see a validation error "Please enter at least 1"

#### Scenario: Request more events than available

    - **Given** there are 5 upcoming events loaded
    - **When** I set the number of events to "10"
    - **Then** I see only 5 events
    - **And** a note "Showing all 5 available events"

#### Scenario: Default number of events on first load

    - **Given** I open the Events List screen for the first time
    - **Then** the default number of events (e.g., 20) is applied
    - **And** exactly that many events are shown (or fewer if less are available)

### Feature: Use the App When Offline

In order to plan even without connectivity
As an event attendee
I want to access my previously loaded events offline

#### Scenario: First‑time offline access without cache

    - **Given** I have never opened the app before
    - **And** my device is offline
    - **When** I open the app
    - **Then** I see an error "Please connect to the internet to load events"

#### Scenario: View cached events after going offline

    - **Given** I loaded events while online
    - **And** then went offline
    - **When** I re‑open the app
    - **Then** I see the same list of events that were previously loaded
    - **And** no network error is shown

#### Scenario: Handle missing assets offline

    - **Given** I loaded events including images while online
    - **And** then went offline
    - **When** I view the Events List
    - **Then** I see placeholders for any images that failed to load

### Feature: Add an App Shortcut to the Home Screen

In order to launch the app quickly
As an event attendee
I want to add a shortcut to the app on my device's home screen

#### Scenario: User cancels add‑to‑home action

    - **Given** I am viewing the app's main page
    - **When** I open the app menu
    - **And** I tap "Add to Home Screen"
    - **And** I cancel the prompt
    - **Then** no shortcut is added

#### Scenario: Attempt to add when already added

    - **Given** the app shortcut is already on my home screen
    - **When** I open the app menu
    - **Then** the "Add to Home Screen" option is disabled
    - **Or** it shows "Already added"

### Feature: Display Charts Visualizing Event Details

In order to understand trends and make informed choices
As an event attendee
I want to view interactive charts of key event metrics

#### Scenario: No data available for charts

    - **Given** the app has loaded event metrics data
    - **And** the selected date range has no data
    - **When** I navigate to the "Analytics" tab
    - **Then** I see a message "No data to display" in place of each chart

#### Scenario: Apply filters to charts

    - **Given** the charts are displayed
    - **When** I select a date range "Last 7 days"
    - **And** I select category "Workshops"
    - **Then** the attendance and distribution charts update to reflect those filters

#### Scenario: Export chart data

    - **Given** I am viewing a chart in the "Analytics" tab
    - **When** I click "Export chart"
    - **Then** I am prompted to download the chart as an image or CSV file

---

## 📦 Installation

```bash
git clone https://github.com/your-username/happenly.git
cd happenly
npm install
npm start
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.
