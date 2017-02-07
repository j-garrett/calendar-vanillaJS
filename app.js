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
    var dayLength = this.data.dayEnd - this.data.dayStart;
    var timeContainerEle = this.createDivWithClass('time-sections-container');
    this.data.calendarContainer.appendChild(timeContainerEle);
    var humanTime = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];
    for (var i = 0, j = 0; i < dayLength; i += 30) {
      var element = this.createDivWithClass('calendar-time-block');
      if (i % 30 === 0) {
        element.innerHTML = '<div class="time-stamp">' + humanTime[j] + '</div>';
        j += 1;
      }
      timeContainerEle.appendChild(element);
    }

  }
  buildInitialCalendarEvents() {
    for (var i = 0; i < this.data.events.length; i += 1) {
      this.createEventBlock(this.data.events[i], i);
    }
  }
  updateStylingOnCollide(classesMap) {
    var key;
    var val;
    var nodes;
    var node;
    var indent = 10;
    var maxWidth = this.data.baseWidth;
    for (var entry of classesMap) {
      key = entry[0];
      val = entry[1];
      // Grab all class elements
      nodes = document.getElementsByClassName(key);
      for (var i = 0; i < nodes.length; i += 1) {
        // we want constrained width for certain scenarios so we do that here!
        if (nodes[i].style.width !== '') {
          maxWidth = Math.min(nodes[i].style.width.slice(0, -2), maxWidth);
        }
        node = nodes[i];
        var newWidth = Math.floor(this.data.baseWidth / val);
        if (node.style.width === '' || node.style.width.slice(0, -2) > newWidth) {
          node.style.width = Math.min(maxWidth, newWidth - classesMap.size) + 'px';
        }
        // Now we need to set indent correctly
        if (node.dataset.alreadyIndented !== 'alreadyIndented' || node.style.left === '10px') {
          node.dataset.alreadyIndented = 'alreadyIndented';
          node.style.left = indent + 'px';
          indent += newWidth;
        } else if (node.style.left.slice(0, -2) > newWidth) {
          node.style.left = indent + 'px';
          indent += newWidth;
          node.dataset.alreadyIndented = 'alreadyIndented';
        }
      }
    }
  }
  createEventBlock(event, idx) {
    var entryContainerElement = this.createDivWithClass('calendar-event-container event-number-' + idx);
    var existingEntryCollisionTracker = new Map();
    var bucket;
    var timeSlot;
    for (var i = event.start; i < event.end; i += 1) {
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
  document.getElementById('calendar-container').innerHTML = '';
  // Then create a new calendar with inputs
  var calendar = new Calendar(events);
};
// LAYOUT DAY IS BEING CALLED INSIDE index.html body onload attr
