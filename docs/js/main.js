var navMain = document.querySelector('.nav');
var navToggle = document.querySelector('.nav__toggle');

navMain.classList.remove('nav--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('nav--closed')) {
    navMain.classList.remove('nav--closed');
    navMain.classList.add('nav--opened');
  } else {
    navMain.classList.add('nav--closed');
    navMain.classList.remove('nav--opened');
  }
});

function validate() {
  var date = new Date();
  var currDate = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
  dateIn = document.getElementById("check-in").value;
  console.log(dateIn)
  var dateOut = document.getElementById("departure").value;
  // if (dateIn < currDate || dateOut < currDate) {
  //   console.log("Дата меньше текущей")
  // }
  // if(dateIn>dateOut){
  //   console.log("Дата заезда больше даты выезда")
  // }
}
