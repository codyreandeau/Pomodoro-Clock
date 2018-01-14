var pomodoro = function(){
  var x = this;
  this.running = false;
  this.toggle = function(){
    if(this.running){
      this.stop();
      this.running = false;
      $("#start").text("Go!");
    }
    else{
      this.start();
      this.running = true;
      $("#start").text("Pause");
    }
  };
  this.seconds = 25 * 60;
  this.start = function(){
    clearInterval(x.intervId);
    this.intervId = setInterval(this.tick, 1000);
  };
  this.stop = function(){
    clearInterval(x.intervId);
  };
  this.increase = function(){
    this.seconds += 60;
    this.update();
  };
  this.decrease = function(){
    this.seconds -= 60;
    this.update();
  };
  this.reset = function(){
    $("#start").text('Go!');
    this.seconds = 25 * 60;
    this.running = false;
    this.update();
    this.stop();
  };
  this.tick = function(){
   if(x.seconds < 1 ){
     clearInterval(x.intervId);
     this.stop();
   }
   x.seconds--;
   x.update();
  };
  this.update = function(){
    var time;
    var alarm = new Audio('http://d-gun.com/files/sounds/WARNING2.WAV');
    var seconds = x.seconds % 60;
    var minutes = Math.floor(x.seconds / 60);
    time = minutes+':'+seconds;
    if(seconds < 10){
      time = minutes+':0'+seconds;
    }
    if(minutes < 10){
      time = '0'+time;
    }
    if(time === '00:00'){
      this.stop();
      time = 'Times Up!';
      alarm.play();
    }
    $("#time").text(time)
  };
};
var pomodoro = new pomodoro();
$("#start").click(function(){
  pomodoro.toggle();
});
$("#increase").click(function(){
  pomodoro.increase();
});
$("#decrease").click(function(){
  pomodoro.decrease();
});
$("#reset").click(function(){
  pomodoro.reset();
});