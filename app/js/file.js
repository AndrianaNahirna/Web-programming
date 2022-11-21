const currentDate = document.querySelector(".current-date"),
daysTag = document.querySelector(".days");

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
"August", "September", "October", "November", "December"];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
  lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  let liTag = "";

  for(let i = firstDayofMonth; i < 7; i++) {
    liTag += `<li> </li>`;
  }

  for(let i = 1; i<= lastDateofMonth; i++) {
    if(i === 1 || i === 6){
      liTag += `<li class="active">${i}</li>`;
    }
    else if(i === 14){
      liTag += `<li class="active2">${i}</li>`;
    }
    else if(i === 13 || i===27){
      liTag += `<li class="active3">${i}</li>`;
    }
    else if(i === 29){
      liTag += `<li class="active1">${i}</li>`;
    }
    else{
      liTag += `<li class="">${i}</li>`;
    }
    
  }

  currentDate.innerText = `${months[currMonth]}`;
  daysTag.innerHTML = liTag;
}
renderCalendar();



$('#menu').click(function(){
  $(this).toggleClass("click");
  $('.sidebar').toggleClass("show");
  $('.settings').toggleClass("show");
  $('.content').toggleClass("active");
});

$('.sidebar ul li').click(function(){
  $(this).addClass("active").siblings().removeClass("active");
});




var view1 = $('div.view1');
var view2 = $('div.view2');
var view3 = $('div.view3');

  $.ajax({ 
    type: 'GET', 
    url: '/data.json',
    success: function(data){
      $.each(data, function(key, val){
        if(key==="view-1") {
          view1.append(val);
        }
        if(key==="view-2") {
          view2.append(val);
        }
        if(key==="view-3") {
          view3.append(val);
        }        
      });
    }
  })
