/**
 * Class desscribing structure of the timer
 * Verrryy complex class :)
 */
export class Timer{
  public Minutes: number;
  public Seconds: number;

  constructor(minutes: number = 0, seconds: number = 0){
    this.Minutes = minutes;
    this.Seconds = seconds;
  }
}
