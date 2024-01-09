//Creates variables for the date and hour and sets up how the date is displayed on the page
var today = dayjs();
let hourClass = dayjs().hour();
$('#currentDay').text(today.format('dddd, MMMM D'));

//Sets up a variable for the local storage and puts the data into another variable
var storedData = localStorage.getItem('calendarInfo');
var calendar = JSON.parse(storedData);

//Sets up an array for the hours with an area for the text info to be saved
const calendarData = [
  { hour: 9, item: '' },
  { hour: 10, item: '' },
  { hour: 11, item: '' },
  { hour: 12, item: '' },
  { hour: 13, item: '' },
  { hour: 14, item: '' },
  { hour: 15, item: '' },
  { hour: 16, item: '' },
  { hour: 17, item: '' },
]

//A copy of the above array created to be used to save changes made in the text areas and save them to local storage
let calendarDataCopy = [
  { hour: 9, item: '' },
  { hour: 10, item: '' },
  { hour: 11, item: '' },
  { hour: 12, item: '' },
  { hour: 13, item: '' },
  { hour: 14, item: '' },
  { hour: 15, item: '' },
  { hour: 16, item: '' },
  { hour: 17, item: '' },
]

//Checks if anything is saved to local storage and if there is it makes the page and populates the text fields with what was saved
if (calendar != null) {
  //Makes the copy and local storage the same so changes made don't overwrite data in local storage
  calendarDataCopy = calendar;
  calendar.map(function (data) {
    if (data.hour === hourClass) {
      $('#planner').append(
        `<div id="hour" class="row time-block present"><div class="col-2 col-md-1 hour text-center py-3">${dayjs().hour(data.hour).format('h A')}</div><textarea class="col-8 col-md-10 description hour-${data.hour}" rows="3">${data.item}</textarea>
      <button class="btn saveBtn col-2 col-md-1 hour-${data.hour}" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button> </div>`
      )
    };
    if (data.hour < hourClass) {
      $('#planner').append(
        `<div id="hour" class="row time-block past"><div class="col-2 col-md-1 hour text-center py-3">${dayjs().hour(data.hour).format('h A')}</div><textarea class="col-8 col-md-10 description hour-${data.hour}" rows="3">${data.item}</textarea>
      <button class="btn saveBtn col-2 col-md-1 hour-${data.hour}" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button> </div>`
      )
    };
    if (data.hour > hourClass) {
      $('#planner').append(
        `<div id="hour" class="row time-block future"><div class="col-2 col-md-1 hour text-center py-3">${dayjs().hour(data.hour).format('h A')}</div><textarea class="col-8 col-md-10 description hour-${data.hour}" rows="3">${data.item}</textarea>
      <button class="btn saveBtn col-2 col-md-1 hour-${data.hour}" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button> </div>`
      )
    };
  });
}
//If there is nothing in local storage the page is populated with empty text areas
else {
  calendarData.map(function (data) {
    if (data.hour === hourClass) {
      $('#planner').append(
        `<div id="hour" class="row time-block present"><div class="col-2 col-md-1 hour text-center py-3">${dayjs().hour(data.hour).format('h A')}</div><textarea class="col-8 col-md-10 description hour-${data.hour}" rows="3">${data.item}</textarea>
    <button class="btn saveBtn col-2 col-md-1 hour-${data.hour}" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button> </div>`
      )
    };
    if (data.hour < hourClass) {
      $('#planner').append(
        `<div id="hour" class="row time-block past"><div class="col-2 col-md-1 hour text-center py-3">${dayjs().hour(data.hour).format('h A')}</div><textarea class="col-8 col-md-10 description hour-${data.hour}" rows="3">${data.item}</textarea>
    <button class="btn saveBtn col-2 col-md-1 hour-${data.hour}" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button> </div>`
      )
    };
    if (data.hour > hourClass) {
      $('#planner').append(
        `<div id="hour" class="row time-block future"><div class="col-2 col-md-1 hour text-center py-3">${dayjs().hour(data.hour).format('h A')}</div><textarea class="col-8 col-md-10 description hour-${data.hour}" rows="3">${data.item}</textarea>
    <button class="btn saveBtn col-2 col-md-1 hour-${data.hour}" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button> </div>`
      )
    };
  });
}

//Listener for a button click and determins which row had the button pushed and gets what was in the text area
const button = document.querySelectorAll('button');
for (i of button) {
  i.addEventListener('click', function (e) {
    let text = '';
    const blip = e.currentTarget.getAttribute('class').split(/\s+/);
    blip.forEach(function (itemTemp) {
      if (itemTemp.indexOf('hour-') === 0) {
        let hourTemp = itemTemp.split('-');
        document.querySelectorAll('textarea').forEach(function (element) {
          const zip = element.getAttribute('class').split(/\s+/);
          zip.forEach(function (item) {
            if (item.includes('hour-')) {
              if (item.split('-')[1] === hourTemp[1]) {
                text = element.value;
              };
            };
          });
        });
        //Takes what was put in the text field when the save button was pushed and puts it into the copy array and saves it to local storage
        calendarDataCopy.forEach(function (item) {
          Object.keys(item).forEach(function (key) {
            if (item[key] === Number(hourTemp[1])) {
              item.item = text;
              calendarDataCopy.push(item.item);
              localStorage.setItem('calendarInfo', JSON.stringify(calendarDataCopy));
            };
          });
        });
      };
    });
  });
};


