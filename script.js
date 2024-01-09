// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var today = dayjs();
const stuff = document.querySelector('#stuff');
let hourClass = dayjs().hour();


$('#currentDay').text(today.format('dddd, MMMM D'));
localStorage.setItem('todo', 'eat');

var storedData = localStorage.getItem('stuff');
var calendar = JSON.parse(storedData);





const calendarData = [
  { hour: 9, item: '' },
  { hour: 10, item: '' },
  { hour: 11, item: '' },
  { hour: 12, item: '' },
  { hour: 13, item: '' },
  { hour: 14, item: '' },
  { hour: 15, item: '' },
  { hour: 20, item: '' },
  { hour: 23, item: '' },
]

let calendarDataCopy = [
  { hour: 9, item: '' },
  { hour: 10, item: '' },
  { hour: 11, item: '' },
  { hour: 12, item: '' },
  { hour: 13, item: '' },
  { hour: 14, item: '' },
  { hour: 15, item: '' },
  { hour: 22, item: '' },
  { hour: 23, item: '' },
]

if (calendar != null) {
  calendarDataCopy = calendar;
  calendar.map(function (data) {
    if (data.hour === hourClass) {
      $('#stuff').append(
        `<div id="hour" class="row time-block present"><div class="col-2 col-md-1 hour text-center py-3">${dayjs().hour(data.hour).format('h A')}</div><textarea class="col-8 col-md-10 description hour-${data.hour}" rows="3">${data.item}</textarea>
      <button class="btn saveBtn col-2 col-md-1 hour-${data.hour}" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button> </div>`
      )
    };
    if (data.hour < hourClass) {
      $('#stuff').append(
        `<div id="hour" class="row time-block past"><div class="col-2 col-md-1 hour text-center py-3">${dayjs().hour(data.hour).format('h A')}</div><textarea class="col-8 col-md-10 description hour-${data.hour}" rows="3">${data.item}</textarea>
      <button class="btn saveBtn col-2 col-md-1 hour-${data.hour}" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button> </div>`
      )
    };
    if (data.hour > hourClass) {
      $('#stuff').append(
        `<div id="hour" class="row time-block future"><div class="col-2 col-md-1 hour text-center py-3">${dayjs().hour(data.hour).format('h A')}</div><textarea class="col-8 col-md-10 description hour-${data.hour}" rows="3">${data.item}</textarea>
      <button class="btn saveBtn col-2 col-md-1 hour-${data.hour}" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button> </div>`
      )
    };
  });
}
else {
  calendarData.map(function (data) {
    if (data.hour === hourClass) {
      $('#stuff').append(
        `<div id="hour" class="row time-block present"><div class="col-2 col-md-1 hour text-center py-3">${dayjs().hour(data.hour).format('h A')}</div><textarea class="col-8 col-md-10 description hour-${data.hour}" rows="3">${data.item}</textarea>
    <button class="btn saveBtn col-2 col-md-1 hour-${data.hour}" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button> </div>`
      )
    };
    if (data.hour < hourClass) {
      $('#stuff').append(
        `<div id="hour" class="row time-block past"><div class="col-2 col-md-1 hour text-center py-3">${dayjs().hour(data.hour).format('h A')}</div><textarea class="col-8 col-md-10 description hour-${data.hour}" rows="3">${data.item}</textarea>
    <button class="btn saveBtn col-2 col-md-1 hour-${data.hour}" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button> </div>`
      )
    };
    if (data.hour > hourClass) {
      $('#stuff').append(
        `<div id="hour" class="row time-block future"><div class="col-2 col-md-1 hour text-center py-3">${dayjs().hour(data.hour).format('h A')}</div><textarea class="col-8 col-md-10 description hour-${data.hour}" rows="3">${data.item}</textarea>
    <button class="btn saveBtn col-2 col-md-1 hour-${data.hour}" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button> </div>`
      )
    };
  });
}


// function updateCalender(updatedObj){
//   calendar = calendarData.map(function(item){
//   if (item.hour !== updatedObj.hour){
//     return dayObj;
//   }
//   return updatedObj;
// })
// }

// updateCalenar();

const button = document.querySelectorAll('button');
for (i of button) {
  i.addEventListener('click', function (e) {
    let text = '';
    const blip = e.currentTarget.getAttribute('class').split(/\s+/);
    blip.forEach(function (itemTemp, index) {
      if (itemTemp.indexOf('hour-') === 0) {
        let hourTemp = itemTemp.split('-');
        document.querySelectorAll('textarea').forEach(function (element, index) {
          const zip = element.getAttribute('class').split(/\s+/);
          zip.forEach(function (item, index) {
            if (item.includes('hour-')) {
              if (item.split('-')[1] === hourTemp[1]) {
                text = element.value;
              }
            }
          })
        });
        calendarDataCopy.forEach(function (item, index) {
          Object.keys(item).forEach(function (key) {
            if (item[key] === Number(hourTemp[1])) {
              item.item = text;
              calendarDataCopy.push(item.item);
              localStorage.setItem('stuff', JSON.stringify(calendarDataCopy));
            }
          })
        })
      }
    })
  })
}



// function saveCalendar(){
//   localStorage.setItem('', JSON.stringify(calenderData));
// }

// function addToCalender(newObj){
//   calander.push(newObj);
// }

// function updateCalender(updatedObj){
//   calender = calender.map(function(dayObj){
//   if (dayObj.hour !== updatedObj.hour){
//     return dayObj;
//   }
//   return updatedObj;
// })
// }


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
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?

