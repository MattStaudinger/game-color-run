// Constructor

class Chronometer {
  constructor() {
    this.currentTime = 0;
    this.intervalId = 0;
    this.currentTimeMs = 0;
    this.intervalIdMs = 0;
    this.seconds = 0;
    this.minutes = 0;
    this.countdown = 0;
  }

  startClick() {

    this.intervalIdMs = setInterval(() => {
      if (Number.isInteger((this.currentTimeMs / 100))) {
        this.currentTime++
      }
      this.currentTimeMs++;
      timer.innerText = this.setTime() + ":" + this.setTimeMs();
    }, 10);  
  }


  setCountdown(seconds) {
    this.countdown = seconds
    setInterval(() => {
      this.countdown--;
      timerText.innerText = "Time until next level:" +  this.twoDigitsNumber(this.countdown)
    }, 1000);  
  }

  setMinutes() {
    return parseInt(this.currentTime / 60);
  }

  setSeconds() {
    return this.currentTime % 60;
  }
  twoDigitsNumber(value) {
    if (value < 10) {
      return "0" + value;
    } else return value.toString();
  }

  setTime() {
    this.minutes = this.twoDigitsNumber(this.setMinutes());
    this.seconds = this.twoDigitsNumber(this.setSeconds());
    return this.minutes + ":" + this.seconds;
  }
  stopClick() {
    clearInterval(this.intervalId);
    clearInterval(this.intervalIdMs);
  }
  resetClick() {
    this.currentTime = 0;
    this.currentTimeMs = 0;
  }

  checkTimeMs(value) {
    if (this.currentTimeMs === 100) this.currentTimeMs = 0;

    if (value < 10) {
      return "0" + value;
    } else return value.toString();
  }

  setTimeMs() {
    return this.checkTimeMs(this.currentTimeMs);
  }
}

