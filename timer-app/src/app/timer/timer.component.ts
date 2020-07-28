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
      await this.sleep(1000);
      //after 1s change the value of seconds first and than of minutes
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
    //wait for 1s to pass, but do it async. to prefect blocking of the UI
    return new Promise((resolve) => {setTimeout(resolve, ms);});
  }

  onTimerStop()
  {
    //TO-DO: think of solution with Promise rejection function
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

//TO-DO: move to another file
export class Timer{
  public Minutes: number;
  public Seconds: number;

  constructor(minutes: number = 0, seconds: number = 0){
    this.Minutes = minutes;
    this.Seconds = seconds;
  }
}
