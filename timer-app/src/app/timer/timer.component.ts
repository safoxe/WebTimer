import { Component, OnInit } from '@angular/core';
import { Timer } from 'src/app/models/timer-model'

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  public timer: Timer;

  private timerStoped: boolean;
  private isTimerSet: boolean;
  private isRunning: boolean;

  //public getters for the UI
  public IsTimerSet(): boolean
  {
      return this.isTimerSet;
  }
  public IsRunning(): boolean{
    return this.isRunning;
  }

  constructor() { }

  ngOnInit(): void {
    this.timer = new Timer();
    this.isTimerSet = false;
    this.isRunning = false;
  }

  async onTimerStart() {
    this.timerStoped = false;
    this.isRunning = true;
    this.caculateTime();
  }

  async caculateTime()
  {
    while(this.timer.Minutes > 0 && !this.timerStoped)
    {
      let timeToWait = 1000;
      await this.sleep(timeToWait);
      //after 1s change the value of seconds first and than of minutes
      if(this.timer.Seconds > 0)
      {
        this.timer.Seconds -= 1;
      }
      else
      {
        this.timer.Minutes -= 1;
        this.timer.Seconds = 60;
      }
    }
  }

  sleep(milliseconds)
  {
    //wait for 1s to pass, but do it async. to prefect blocking of the UI
    return new Promise((resolve) => {setTimeout(resolve, milliseconds);});
  }

  onTimerStop()
  {
      this.timerStoped = true;
      this.isRunning = false;
  }

  onTimerReset()
  {
    //TO-DO: save initial values and back-up to them on this action
    this.timerStoped = false;
    this.isRunning = false;
  }

  //when time for the timer is submitted
  onTimeSetSubmit()
  {
    this.isTimerSet = true;
  }

  //when time for the timer is changing
  onTimerSet()
  {
    this.isTimerSet = false;
  }

}
