import { Directive, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { MessageService } from "./message.service";

let nextId = 1;

// Spy on any element to which it is applied.
// Usage: <div appSpy>...</div>
@Directive({ selector: '[appSpy]' })
export class SpyDirective implements OnInit, OnDestroy {
  private id = nextId++;
  constructor(private messageService: MessageService) {

  }

  // constructor(private logger: LoggerService) {}

  ngOnInit() {
    console.log(`Spy #${this.id} onInit`);
  }

  ngOnDestroy() {
    // this.logger.log(`Spy #${this.id} onDestroy`);
    console.log(`Spy #${this.id} onDestroy`);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('work ng on changes');
    for (const propName in changes) {
      const chng = changes[propName];
      const cur = JSON.stringify(chng.currentValue);
      const prev = JSON.stringify(chng.previousValue);
      this.messageService.add(
        `${propName}: currentValue = ${cur}, previousValue = ${prev}`
      );
    }
  }
}
