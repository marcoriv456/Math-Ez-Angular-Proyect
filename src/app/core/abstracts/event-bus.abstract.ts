import {filter, Subject} from "rxjs";

export abstract class EventBus<E>{
  private eventSubject = new Subject<E>()

  public on<T extends E>(eventType:{new (args:any[]):T}){
    return this.eventSubject.pipe(
      filter((event):event is T => event instanceof eventType)
    );
  }

  public emit(event:E){
    this.eventSubject.next(event)
  }
}
