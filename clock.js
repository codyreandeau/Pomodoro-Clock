var pomodoro = function(){
  var x = this;
  this.running = false;
  this.toggle = function(){
    if(this.running){
      this.stop();
      this.running = false;
      $("#start").text("Go");
    }
    else{
      this.start();
      this.running = true;
      $("#start").text("Pause");
    }
  };
  this.seconds = 25*60;
  this.start = function(){
    clearInterval(x.intervId);
    this.intervId = setInterval(this.tick,1000);
  };
  this.stop = function(){
    clearInterval(x.intervId);
  };
  this.increase = function(){
    this.seconds += 60;
    this.stop();
    this.update();
  };
  this.decrease = function(){
    this.seconds -= 60;
    this.stop();
    this.update();
  };
  this.tick = function(){
   if(x.seconds <=0 ){
     alert("Time's up! Take a Break!");
     clearInterval(x.intervId);
   }
   x.seconds--;
   x.update();
  };
  this.update = function(){
    var time;
    var seconds = x.seconds % 60;
    var minutes = Math.floor(x.seconds / 60);
    time = minutes+':'+seconds;
    if(seconds < 10){
      time = minutes+':0'+seconds;
    }
    if(minutes < 10){
      time = '0'+time;
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