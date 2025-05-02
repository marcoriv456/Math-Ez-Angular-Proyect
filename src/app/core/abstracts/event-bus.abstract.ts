import {filter, Subject} from "rxjs";

export abstract class EventBus<E>{
  private eventSubject = new Subject<E>()

  public on(eventType:{new (args:any[]):E}){
    return this.eventSubject.pipe(
      filter((event):event is E => event instanceof eventType)
    );
  }

  public emit(event:E){
    this.eventSubject.next(event)
  }
}
