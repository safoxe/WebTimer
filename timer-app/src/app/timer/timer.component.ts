import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  public timer: Timer;
  private timerStoped: boolean;
  private isTimerSet: boolean;
  constructor() { }

  public IsTimerSet(): boolean
  {
      return this.isTimerSet;
  }

  ngOnInit(): void {
    this.timer = new Timer();
    this.isTimerSet = false;
  }

  async onTimerStart() {
    this.timerStoped = false;
    this.caculateTime();
  }

  async caculateTime()
  {
    while(this.timer.Minutes > 0 && !this.timerStoped)
    {
      await this.sleep(1000);

      if(this.timer.Seconds > 0)
      {
        this.timer.Seconds -= 1;
      }
      else
      {
        this.timer.Minutes -= 1;
      }
    }
  }

  sleep(ms)
  {
    return new Promise((resolve) => {setTimeout(resolve, ms);});
  }

  onTimerStop()
  {
      this.timerStoped = true;
  }

  onTimerReset()
  {
    this.timerStoped = false;
    console.log("Timer is reset");
  }

  onTimeSetSubmit()
  {
    this.isTimerSet = true;
  }

  onTimerSet()
  {
    this.isTimerSet = false;
  }

}

export class Timer{
  public Minutes: number;
  public Seconds: number;

  constructor(minutes: number = 0, seconds: number = 0){
    this.Minutes = minutes;
    this.Seconds = seconds;
  }
}
