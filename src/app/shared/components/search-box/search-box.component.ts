import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer: Subject<string> = new Subject<string>();
  private deBouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public intialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.deBouncerSuscription = this.debouncer
      .pipe(debounceTime(300))
      .subscribe((value) => this.onDebounce.emit(value));
  }

  ngOnDestroy(): void {
    this.deBouncerSuscription?.unsubscribe();
  }

  emitValue(value: string): void {
    this.onValue.emit(value);
  }

  onKeyPress(searhTerm: string) {
    this.debouncer.next(searhTerm);
  }
}
