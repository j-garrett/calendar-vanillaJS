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
      createDivWithClass: function(className) {
        var element = document.createElement('div');
        element.className = className;
        return element;
      },
      // Grab reference to container for appending items later
      calendarContainer: document.getElementById('calendar-container'),
    };
    this.createCalendarDiv();
    this.createEventBlock();
  }
  createCalendarDiv() {
    // Build calendar blocks in ten minute increments
    var dayLength = this.data.dayEnd - this.data.dayStart;
    console.log('hrm hrm: ', this.data.dayStart + (60 * 12));
    console.log('createCalendarDiv called with dayLength: ', dayLength);
    // Iterate over how many blocks we need
    for (var i = 0; i < dayLength; i += 10) {
      var element = this.data.createDivWithClass('calendar-time-block');
      console.log('we adding this element: ', element);
      this.data.calendarContainer.appendChild(element);
    }
  }
  createEventBlock() {
    // Event blocks will
  }
}

var layOutDay = function(events) {
  // First we will clear any existing elements in calendar container
  // Then create a new calendar with inputs
  console.log('by golly we loaded!');
  var calendar = new Calendar([ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ]);
};