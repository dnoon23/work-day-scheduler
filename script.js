// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var today = dayjs();
const stuff = document.querySelector('#stuff');
let hourClass = dayjs().hour();


$('#currentDay').text(today.format('dddd, MMMM D'));
localStorage.setItem('todo', 'eat');

const calendarData = [
  { hour: 9, item: localStorage.getItem('todo') },
  { hour: 10, item: 'asd' },
  { hour: 11, item: 'as' },
  { hour: 12, item: 'asd' },
  { hour: 13, item: 'as' },
  { hour: 14, item: 'asd' },
  { hour: 15, item: 'asd' },
  { hour: 20, item: 'asd' },
  { hour: 23, item: 'asd' },
]


calendarData.map(function (data) {
  if (data.hour === hourClass) {$('#stuff').append(
    `<div id="hour" class="row time-block present"><div class="col-2 col-md-1 hour text-center py-3">${dayjs().hour(data.hour).format('h A')}</div><textarea class="col-8 col-md-10 description" rows="3">${data.item}</textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button> </div>`
  )};
  if (data.hour < hourClass) {$('#stuff').append(
    `<div id="hour" class="row time-block past"><div class="col-2 col-md-1 hour text-center py-3">${dayjs().hour(data.hour).format('h A')}</div><textarea class="col-8 col-md-10 description" rows="3">${data.item}</textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button> </div>`
  )};
  if (data.hour > hourClass) {$('#stuff').append(
  `<div id="hour" class="row time-block future"><div class="col-2 col-md-1 hour text-center py-3">${dayjs().hour(data.hour).format('h A')}</div><textarea class="col-8 col-md-10 description" rows="3">${data.item}</textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button> </div>`
  )};
  });


const button = document.querySelectorAll('button');
for (i of button) {
  i.addEventListener('click', function () {
    localStorage.setItem('stuff', JSON.stringify(calendarData.item))
  })
}

function getStoredData(){
  const storedData = localStorage.get('');
  calander = JSON.parse(storedData);
}

function saveCalendar(){
  localStorage.setItem('', JSON.stringify(calander));
}

function addToCalender(newObj){
  calander.push(newObj);
}

function updateCalender(updatedObj){
  calender = calender.map(function(dayObj){
  if (dayObj.hour !== updatedObj.hour){
    return dayObj;
  }
  return updatedObj;
})
}


console.log(calendarData[8].hour)
console.log(hourClass)
console.log(typeof calendarData[8].hour)
console.log(typeof hourClass)
// console.log(JSON.stringify(calendarData));


// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?

