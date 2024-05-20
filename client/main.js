//app data
const rawData = [
  {
    day: 1,
    booked: true,
  },
  {
    day: 2,
    booked: false,
  },
  {
    day: 3,
    booked: false,
  },
  {
    day: 4,
    booked: false,
  },
  {
    day: 5,
    booked: true,
  },
  {
    day: 6,
    booked: false,
  },
  {
    day: 7,
    booked: true,
  },
  {
    day: 8,
    booked: false,
  },
  {
    day: 9,
    booked: false,
  },
  {
    day: 10,
    booked: false,
  },

  {
    day: 11,
    booked: false,
  },
  {
    day: 12,
    booked: false,
  },
  {
    day: 13,
    booked: true,
  },
  {
    day: 14,
    booked: true,
  },
  {
    day: 15,
    booked: true,
  },
  {
    day: 16,
    booked: true,
  },
  {
    day: 17,
    booked: true,
  },
  {
    day: 18,
    booked: true,
  },
  {
    day: 19,
    booked: false,
  },
  {
    day: 20,
    booked: false,
  },
  {
    day: 21,
    booked: false,
  },
  {
    day: 22,
    booked: false,
  },
  {
    day: 23,
    booked: false,
  },
  {
    day: 24,
    booked: false,
  },
  {
    day: 25,
    booked: true,
  },
  {
    day: 26,
    booked: true,
  },
  {
    day: 27,
    booked: true,
  },
  {
    day: 28,
    booked: true,
  },
  {
    day: 29,
    booked: true,
  },
  {
    day: 30,
    booked: true,
  },
  {
    day: 31,
    booked: true,
  },
];

//immutable data

let appData = [...rawData];

//populate calendar grid from data array
appData.forEach((data) => populate(data));
addEventListeners();

function populate(data) {
  const rootCalendarElement = document.querySelector(".calendar_dates");
  const element = document.createElement("p");
  if (checkDay(data.day)) {
    element.setAttribute("id", "today");
  }
  if (data.booked) {
    element.setAttribute("class", "day booked");
  } else {
    element.setAttribute("class", "day not-booked");
  }
  element.innerText = data.day;
  rootCalendarElement.append(element);
}

//add event listener on each date
function addEventListeners() {
  let days = document.querySelectorAll(".day");
  days.forEach((item) => {
    item.addEventListener("click", () => bookDate(item));
  });
}

function checkDay(day) {
  const today = new Date().getDate();
  return day === today;
}

function bookDate(day) {
  const today = new Date().getDate();
  const bookingDate = parseInt(day.innerText);
  //check if date can be booked
  if (bookingDate < today) {
    return;
  }
  if (bookingDate >= today && !isBooked(bookingDate)) {
    //reserve the date and notify user
    reserveDate(bookingDate);
    notifyUser("booked date");
    return;
  } else {
    //notify user to pick another date
    notifyUser("failed to book");
  }
  // if yes book day and notify user else notify user it cannot
}

function notifyUser(message) {
  alert(message);
}
function reserveDate(dateItem) {
  //mark day as booked in the data bank
  appData[dateItem - 1].booked = true;
  updateData();
  return dateItem;
}

function isBooked(dateItem) {
  return appData[dateItem - 1].booked;
}

function updateData() {
  // clear the dom and recreate with new data
  const rootCalendarElement = document.querySelector(".calendar_dates");
  while (rootCalendarElement.firstChild) {
    rootCalendarElement.removeChild(rootCalendarElement.firstChild);
    console.log(rootCalendarElement.firstChild);
  }

  appData.forEach((data) => populate(data));
}
