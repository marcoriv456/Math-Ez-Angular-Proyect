import {TermValidationWarningComponent} from "./term-validation-warning.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {ComponentFixture} from "@angular/core/testing";
import {
  TermValidationWarningRenderData
} from "../../../core/validation/models/term-validation-warning-render-data.model";
import {InputEventBusService} from "../../../core/services/input-event-bus/input-event-bus.service";
import {WarningShowRequestEvent} from "../../../core/models/events/warnings/warning-show-request.event";

describe('Term validation warning: ', () => {
  let eventBus: InputEventBusService;
  let fixture:ComponentFixture<TermValidationWarningComponent>
  beforeEach(()=>{
    cy.mount(TermValidationWarningComponent,{
      declarations: [
        TermValidationWarningComponent
      ],
      imports: [
        CommonModule,
        BrowserAnimationsModule
      ],
      providers: [
        InputEventBusService,
      ],
    })
      .then(c=>{
        fixture=c.fixture
        eventBus=c.fixture.debugElement.injector.get(InputEventBusService)
      })
  })


  it('Displays correctly the positioning style', () => {
    let warningData:TermValidationWarningRenderData={
      messages:[
        {message:"test message", type:"fully-invalid"}
      ],
      position:{x:100,y:50}
    }

    eventBus.emit(new WarningShowRequestEvent(warningData))
    fixture.detectChanges()

    cy.get(".warning-container")
      .then(element=>element.get()[0].style.left)
      .should("equal","100px")

    cy.get(".warning-container")
      .then(element=>element.get()[0].style.top)
      .should("equal","50px")
  });

  it('Places the warning correctly ', () => {
    let warningData:TermValidationWarningRenderData={
      messages:[
        {message:"test message", type:"fully-invalid"}
      ],
      position:{x:100,y:50}
    }

    eventBus.emit(new WarningShowRequestEvent(warningData))
    fixture.detectChanges()

    cy.wait(500)

    cy.get(".warning-container").then(element=> {
      const left=element.position().left
      const top=element.position().top
      const width=element.width()||0
      const height=element.height()||0

      const expectedLeft=100-width/2
      const expectedTop=50-height-12

      cy.wrap(left).should("be.closeTo",expectedLeft,5)
      cy.wrap(top).should("be.closeTo",expectedTop,5)
    })
  });

  it('Displays the sent message', () => {
    let warningData:TermValidationWarningRenderData={
      messages:[
        {message:"test message", type:"fully-invalid"}
      ],
      position:{x:100,y:100}
    }

    eventBus.emit(new WarningShowRequestEvent(warningData))
    fixture.detectChanges()

    cy.get(".warning-container span")
      .should("contain.text","test message")

  });

  it('Displays the message with a fully-invalid class', () => {
    let warningData:TermValidationWarningRenderData={
      messages:[
        {message:"test message", type:"fully-invalid"}
      ],
      position:{x:100,y:100}
    }

    eventBus.emit(new WarningShowRequestEvent(warningData))
    fixture.detectChanges()

    cy.get(".warning-container span")
      .should("have.class","fully-invalid")
  });

  it('Displays the message with a partially-invalid class', () => {
    let warningData:TermValidationWarningRenderData={
      messages:[
        {message:"test message", type:"partially-invalid"}
      ],
      position:{x:100,y:100}
    }

    eventBus.emit(new WarningShowRequestEvent(warningData))
    fixture.detectChanges()

    cy.get(".warning-container span")
      .should("have.class","partially-invalid")
  });

  it('Displays multiple messages', () => {
    let warningData:TermValidationWarningRenderData= {
      messages: [
        {message: "test message1", type: "partially-invalid"},
        {message: "test message2", type: "fully-invalid"}
      ],
      position: {x: 100, y: 100}
    }

    eventBus.emit(new WarningShowRequestEvent(warningData));
    fixture.detectChanges()

    cy.get(".warning-container>span:first-child")
      .should("contain.text", "test message1")
      .and("have.class","partially-invalid")
    cy.get(".warning-container>span:nth-child(2)")
      .should("contain.text", "test message2")
      .and("have.class","fully-invalid")
  });


});
