$(function(){
    // variables
    
      var mode=0;  // app mode
      var timeCounter=0;  // time counter
      var lapCounter=0;   // lap counter
      var action;  // variable for setInterval
      var lapNumber=0;  // number of laps
    
      // minutes,seconds,centiseconds  for time lap
      var timeMinutes,timeSeconds,timeCentiseconds,lapMinutes,lapSeconds,lapCentiseconds;
      hideShowButtons("#startButton","#lapButton");
    // on App load show start and lap buttons
    // click on the start button
    $("#startButton").click(function(){
    
    mode=1;
    //  show stop and lap button
    hideShowButtons("#stopButton","#lapButton")
    // start counter
    startAction();
    })
    // click on the stopButton
    $("#stopButton").click(function(){
          // show resume and reset button
          hideShowButtons("#resumeButton","#resetButton");
        //   stop counter
        clearInterval(action);
    })
    // click on resume button
    $("#resumeButton").click(function(){
    hideShowButtons("#stopButton","#lapButton");
    // start counter
    startAction();
    })
    $("#resetButton").click(function(){
    location.reload();
    })
    $("#lapButton").click(function(){
    // if mode is on
    if(mode==1){
    //stop action
    clearInterval(action);
    // reset lap and print lap details
    lapCounter=0;
    addLap();
    //start action 
    startAction();
    }
    
    })
            //start action
    //click on reset button
    //  reload the page
    // click on lapbutton
    
    function hideShowButtons(x,y) {
    $(".control").hide();
    $(x).show();
    $(y).show();
    }
    function startAction(){
     action=setInterval(function(){
        timeCounter++;
        if(timeCounter==100*60*100){
            timeCounter=0;
        }
        lapCounter++;
        if(lapCounter==100*60*100){
            timeCounter=0;
        }
        updateTime();
     },10);
    
    }
    // update time: convert countr to min,sec,centis
    function updateTime(){
        // 1min=60*100centiseconds
        timeMinutes=Math.floor(timeCounter/6000);
        // 1sec=100centiseconds
        timeSeconds=Math.floor((timeCounter%6000)/100);
        timeCentiseconds=(timeCounter%6000)%100;
        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(format(timeCentiseconds));
        // laps
        lapMinutes=Math.floor(lapCounter/6000);
        lapSeconds=Math.floor((lapCounter%6000)/100);
        lapCentiseconds=(lapCounter%6000)%100;
        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(format(lapCentiseconds));
    
    }
    //format numbers
    function format(number){
        if(number<10){
            return '0'+number;
        }
        else{
            return number;
        }
    }
    function addLap(){
        lapNumber++;
        var myLapDetails='<div class="lap">'+
        '<div class="laptimetitle">'+
            'Lap'+ lapNumber +
        '</div>'+
        '<div class="laptime">'+
            '<span>'+ format(lapMinutes) +'</span>'+
            ':<span>'+ format(lapSeconds) +'</span>'+
            ':<span>'+ format(lapCentiseconds) +'</span>'+
        '</div>'+
    '</div>';
        $(myLapDetails).prependTo("#laps");
    }
    })