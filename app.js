/*
Event input example:
[ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ];
*/

class Calendar {
  constructor(events) {
    this.data = {
      // 9 represents 9:00 am and could be dynamic
      dayStart: 60 * 9,
      // 12 represents hours of day to be present in calendar
      dayEnd: 60 * (9 + 12),
      // Events is the array of objects with start and end times
      events: events,
      // Grab reference to container for appending items later
      calendarContainer: document.getElementById('calendar-container'),
      // This array will be used to track number of items in time slot
      // We can set conditional formatting by checking this array
      // We will have an array of pointers to dom elements inside these indexes
      // If one index has two values in it, we will update that entry's id styling
      arrayRepresentingTimeSlots: [],
    };
    this.createCalendarDiv();
    this.buildInitialCalendarEvents();
  }
  createDivWithClass(classNames) {
    var element = document.createElement('div');
    element.className = classNames;
    return element;
  }
  createCalendarDiv() {
    // Build calendar blocks in ten minute increments
    var dayLength = this.data.dayEnd - this.data.dayStart;
    var timeContainerEle = this.createDivWithClass('time-sections-container');
    this.data.calendarContainer.appendChild(timeContainerEle);
    // Iterate over how many blocks we need
    for (var i = 0; i < dayLength; i += 10) {
      var element = this.createDivWithClass('calendar-time-block');
      timeContainerEle.appendChild(element);
    }

  }
  buildInitialCalendarEvents() {
    for (var i = 0; i < this.data.events.length; i += 1) {
      this.createEventBlock(this.data.events[i], i);
    }
  }
  createEventBlock(event, idx) {
    // Math to find which calendar-time-blocks are concerned
    // 0 child is 9:00 and 1 child is 9:10
    // event.start of 30 makes it 9:30
    // divide start by 10, start at that child
    // divide end by 10 and go up to and include that child
    var entryContainerElement = this.createDivWithClass('calendar-event-container event-number-' + idx);
    for (var i = event.start / 10; i <= event.end / 10; i += 1) {
      // We are going to put something in each portion
      // We will use pseudo selectors to style appropriately
      var eventElement = this.createDivWithClass('calendar-event-entry');
      entryContainerElement.appendChild(eventElement);
    }
    // Set CSS based on values of based in event
    entryContainerElement.style.height = 25 * (((event.end + 10) - event.start) / 10 ) + 'px';
    entryContainerElement.style.top = 25 * (event.start / 10) + 'px';
    this.data.calendarContainer.appendChild(entryContainerElement);
    // Check if this
  }
}

var layOutDay = function(events) {
  // First we will clear any existing elements in calendar container
  // Then create a new calendar with inputs
  console.log('by golly we loaded!');
  var calendar = new Calendar([ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ]);
};