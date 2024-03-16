import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

@Injectable({
  providedIn: 'root'
})
export class IdleServiceService {

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'You are idle!';
  visible: boolean = false;

  constructor(private router: Router, private idle: Idle, private keepalive: Keepalive) { }

  startIdleTimer(): void {
    this.idle.setIdle(600);
    this.idle.setTimeout(600);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {
      this.reset();
    });

    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      localStorage?.clear();
      this.visible = false;
      this.router.navigate(['/userLogin/login']);
    });

    this.idle.onIdleStart.subscribe(() => {
      this.visible = true;
    });

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!'
    });

    this.keepalive.interval(15);

    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();

  }

  reset() {
    this.idle.watch();
    this.timedOut = false;
  }

}
