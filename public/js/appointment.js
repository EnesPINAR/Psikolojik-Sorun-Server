// let str = $('#str').val()
// let date1 = str.split("-")
// let time2 = date1[0].split(":")
// let hours_end = Number(time2[0])
// let time = date1[1].split(":")
// time = Number(time[0])
// for(; hours_end < time ;){
//     let select = document.getElementById("select")
//     let option = "<option value=' "+ hours_end+":00'>"+ hours_end+ ":00"+"</option>"
//     select.innerHTML += option
//     hours_end++
// }

function Check_Date(date){
    $.ajax({
        url:'check_date/',
        method: 'POST',
        data:{
            date: date.value,
            psychologist_id: $('#psychologist_id').val()
        },
        success: function (data){
            if(data == [] || data.length < 1){

                alert("Maalesef bugün herhangi müsait bir zaman bulunmamaktadır.")
            }
            if($('select').has("option")){
                $('option').remove()
                data.forEach(time => {
                    $('select').append("<option value='"+ time +":00'>"+ time+":00</option>")
                })
            }else{
                data.forEach(time => {
                    $('select').append("<option value='"+ time +":00'>"+ time+":00</option>")
                });
            }
        }
    })
}
// $( document ).ready(function (){

//     let time = $(".appointment_time")
//     let date = $(".appointment_date")
//     date.forEach(date => {
//         console.log(date.attributes[1])
//     });
//     let today = new Date().toISOString();
//     let day = today.split("T")
//     if(day[0] == date){
//         if(time == day[0]){

//         }else{
            
//         }
//     }else{

//     }

// });
