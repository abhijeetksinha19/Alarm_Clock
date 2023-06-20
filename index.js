const display = document.getElementById('clock');


                                                 // SETTING AUDIO FOR ALARM

const audio = new Audio('New DJ remix ringtone ( alarm Ringtone)..... (256 kbps).mp3');
audio.loop = true;


let alarmTime = null;
let alarmTimeout = null;


const myList = document.querySelector('#myList');
const addAlarm = document.querySelector('.setAlarm')

                                            // ARRAY TO STORE ALL ALARM

const alarmList = [];  
// let count =1;


                                // FOR PLAYING THE AUDIO AT CORRECT TIME

function ringing(now){
    audio.play();
    alert(`Hey! it is ${now}`)
}

                                                    //FOR DIGITAL CLOCK

// updates time every second 
function updateTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const now = `${hour}:${minutes}:${seconds}`;

    display.innerText=`${hour}:${minutes}:${seconds}`;
    
//     check if the alarmList includes the current time , "now"
//     if yes, ringing() is called
    if(alarmList.includes(now) ){
        ringing(now);
    } 
}


                                                // SETTING THE CORRECCT FORMAT OF TIME

// converts "1:2:3" to "01:02:03"
function formatTime(time) {
    if ( time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}


                                                // FUNCTION TO STOP CURRENT ACTIVE ALARM

function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alert('Alarm cleared');
    }
}      


                                            // REMOVING AN ALARM WHEN "Delete Alarm" IS CLICKED

myList.addEventListener('click', e=> {
    console.log("removing element")
    if(e.target.classList.contains("deleteAlarm")){
        e.target.parentElement.remove();
    }    
})


                                        // REMOVE AN ALARM FROM THE ARRAY WHEN "DELETE ALARM" IS CLICKED

remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;                                                                // CLEAR CONTENTS
    alarmList.push.apply(alarmList, newList);
    
    console.log("newList", newList);
    console.log("alarmList", alarmList);
}


                                        // ADDING NEW ALARM AS A NEW LIST ITEM TO AN UNORDERED LIST

function showNewAlarm(newAlarm){
    const html =`
    <li class = "time-list">        
        <span class="time">${newAlarm}</span>
        <button class="deleteAlarm time-control" id="delete-button" onclick = "remove(this.value)" value=${newAlarm}>Delete Alarm</button>       
    </li>`
    myList.innerHTML += html
};


                                        // EVENT TO SET A NEW ALARM WHENEVER THE FORM IS SUBMITTED

addAlarm.addEventListener('submit', e=> {
    e.preventDefault();
    // const newAlarm = addAlarm.alarmTime.value;
    let new_h=formatTime(addAlarm.a_hour.value);
    if(new_h === '0'){
        new_h = '00'
    }
    let new_m=formatTime(addAlarm.a_min.value);
    if(new_m === '0'){
        new_m = '00'
    }
    let new_s=formatTime(addAlarm.a_sec.value);
    if(new_s === '0'){
        new_s = '00'
    }
    
    const newAlarm = `${new_h}:${new_m}:${new_s}`

                                                        // ADDING newAlarm TO alarmList

    if(isNaN(newAlarm)){
        if(!alarmList.includes(newAlarm)){
            alarmList.push(newAlarm);
            console.log(alarmList);
            console.log(alarmList.length);
            showNewAlarm(newAlarm);
            addAlarm.reset();
        } else{
            alert(`Alarm for ${newAlarm} already set.`);
        }
    } else{
        alert("Invalid Time Entered")
    }        
})

                                                    // CALLS updateTime() EVERY SECOND

setInterval(updateTime, 1000);

                                                    // USING QUERY-SELECTOR FOR ALL THREE HANDS OF CLOCK 

 const secondHand = document.querySelector('.second-hand');
 const minsHand = document.querySelector('.min-hand');
 const hourHand = document.querySelector('.hour-hand');
 
                                  // USING DATE FUNCTION TO GET CURRENT DATE, HOUR, MINUTE AND SECOND FOR ANGULAR CLOCK
 
 function setDate() {
 const now = new Date();
 
 const seconds = now.getSeconds();
 const secondsDegrees = ((seconds / 60) * 360) + 90;
 secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
 
 const mins = now.getMinutes();
 const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
 minsHand.style.transform = `rotate(${minsDegrees}deg)`;
 
 const hour = now.getHours();
 const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
 hourHand.style.transform = `rotate(${hourDegrees}deg)`;
 }
 setInterval(setDate, 1000);

setDate();