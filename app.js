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
      // Set our base width for events
      baseWidth: 592,
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
    var minutes;
    var meridiem;
    var time;
    var dayLength = this.data.dayEnd - this.data.dayStart;
    var timeContainerEle = this.createDivWithClass('time-sections-container');
    this.data.calendarContainer.appendChild(timeContainerEle);
    // Iterate over how many blocks we need
    for (var i = 0; i < dayLength; i += 10) {
      var element = this.createDivWithClass('calendar-time-block');
      minutes = 900 + i + '';
      meridiem = minutes >= 1200 ? 'pm' : 'am';
      time = minutes.split('');
      time.splice(-2, 0, ':');
      element.innerText = time.join('') + ' ' + meridiem;
      timeContainerEle.appendChild(element);
    }

  }
  buildInitialCalendarEvents() {
    for (var i = 0; i < this.data.events.length; i += 1) {
      this.createEventBlock(this.data.events[i], i);
    }
  }
  updateStylingOnCollide(classesMap) {
    console.log('updateStylingOnCollide called');
    // console.log('this.data.arrayRepresentingTimeSlots: ', this.data.arrayRepresentingTimeSlots);
    var key;
    var val;
    var nodes;
    var node;
    var indent = 10;
    for (var entry of classesMap) {
      key = entry[0];
      val = entry[1];
      // Grab all class elements
      nodes = document.getElementsByClassName(key);
      // console.log('key: ', key);
      // console.log('nodes to be moved: ', nodes);
      for (var i = 0; i < nodes.length; i += 1) {
        node = nodes[i];
        console.log('node: ', node);
        console.log('indent val: ', indent);
        console.log('node style left val: ', node.style.left);
        // console.log('this.data.baseWidth: ', this.data.baseWidth);
        // console.log('val: ', val);
        // console.log('(this.data.baseWidth / val): ', (this.data.baseWidth / val));
        var newWidth = Math.floor(this.data.baseWidth / val);
        if (node.style.width === '' || node.style.width.slice(0, -2) > newWidth) {
          node.style.width = newWidth - classesMap.size + 'px';
        }
        // Now we need to set indent correctly
        // indent += 1;
        // console.log("(newWidth * indent) + 10 + 'px': ", (newWidth * indent) + 10 + 'px');
        // We don't want to update an indent that already exists (unless removing elements)
        // If left isn't set we initialize to 10
        if (node.style.left === '' || node.style.left === '10px') {
          node.style.left = indent + 'px';
          indent += newWidth;
        } else if (node.style.left.slice(0, -2) > newWidth) {
          node.style.left = indent + 'px';
          indent += newWidth;
        }
        // We need to track which elements occur first
        // We are overwriting correct stylings from previous collision detection
        // Can we store values
        console.log('node style left val: ', node.style.left);

      }
    }
  }
  setNodeWidth() {

  }
  setNodeOffsetTop() {

  }
  setNodeOffsetLeft() {

  }
  createEventBlock(event, idx) {
    // Math to find which calendar-time-blocks are concerned
    // 0 child is 9:00 and 1 child is 9:10
    // event.start of 30 makes it 9:30
    // divide start by 10, start at that child
    // divide end by 10 and go up to and include that child
    var entryContainerElement = this.createDivWithClass('calendar-event-container event-number-' + idx);
    var existingEntryCollisionTracker = new Map();
    var bucket;
    var timeSlot;
    for (var i = event.start / 10; i <= event.end / 10; i += 1) {
      // Track where this element lies on the timetable using array quasi hash table style
      // If it's not an array yet, we need to initialize it
      if (this.data.arrayRepresentingTimeSlots[i] === undefined) {
        this.data.arrayRepresentingTimeSlots[i] = [];
      }
      // Grab current calendar time slot which will have array of events at that time
      bucket = this.data.arrayRepresentingTimeSlots[i];
      // Push reference to this event into array slot
      bucket.push('event-number-' + idx);
      // iterate over bucket and track events inside that slot
      for (var j = 0; j < bucket.length; j += 1) {
        timeSlot = existingEntryCollisionTracker.get(bucket[j]);
        if (timeSlot === undefined || timeSlot < bucket.length) {
          // If this not yet tracked or tracked value is smaller
          // initialize/update with current number of collisions
          existingEntryCollisionTracker.set(bucket[j], bucket.length);
        }
      }
    }
    // we need to append first to iterate styling properly
    this.data.calendarContainer.appendChild(entryContainerElement);
    // Iterate over collisions and update their css
    this.updateStylingOnCollide(existingEntryCollisionTracker);

    // Set CSS based on values of passed in event and existing entry collisions
    entryContainerElement.style.height = 10 * (((event.end + 10) - event.start) / 10 ) + 'px';
    entryContainerElement.style.top = 10 * (event.start / 10) + 'px';
  }
}

var layOutDay = function(events) {
  // First we will clear any existing elements in calendar container
  // Then create a new calendar with inputs
  var calendar = new Calendar(events);
};
// LAYOUT DAY IS BEING CALLED INSIDE index.html body onload attr

// layOutDay([ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ]);
