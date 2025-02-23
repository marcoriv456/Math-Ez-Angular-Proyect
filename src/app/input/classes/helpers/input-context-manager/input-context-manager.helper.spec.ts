import {InputElementLocation} from "../../../models/input-element-location.model";
import {ContextAction} from "../../../models/actions/context-action.enum";
import {InputContextManager} from "./input-context-manager.helper";
import {expect} from 'chai'


describe('Input context manager: ', () => {

  describe('Character changes', () => {
    it('Indicates to move to the next character', () => {
      const location:InputElementLocation={character:{next:'char'},container:{}}
      const manager=new InputContextManager(location)

      const action=manager.next()

      expect(action).to.equal(ContextAction.MoveToNextChar)
    });

    it('Indicates to move to the previous character', () => {
      const location:InputElementLocation={character:{actual:'char'},container:{}}
      const manager=new InputContextManager(location)

      const action=manager.prev()

      expect(action).to.equal(ContextAction.MoveToPrevChar)
    });
  });

  describe('Container changes: ', () => {
    it('Indicates to move to the previous editable container if the is no previous character and there is a previous container available', () => {
      const location:InputElementLocation={character:{}, container:{prevExist:true}}
      const manager=new InputContextManager(location)

      const action=manager.prev()

      expect(action).to.equal(ContextAction.ContextPrevContainer)
    });

    it('Indicates to move to the next editable container if there is no next character and there is a next container available', () => {
      const location:InputElementLocation={character: {}, container: {nextExist: true}}
      const manager=new InputContextManager(location)

      const action:ContextAction=manager.next()

      expect(action).to.equal(ContextAction.ContextNextContainer)
    });
  });

  describe('Getting out of context: ', () => {
    it('Indicates to get out by the left if it moves backwards and there is no a previous character nor container', () => {
      const location:InputElementLocation={character:{},container:{}}
      const manager=new InputContextManager(location)

      const action:ContextAction=manager.prev()

      expect(action).to.equal(ContextAction.ContextOutByLeft)
    });

    it('Indicates to get out by the right if it moves forward and there is no a next character nor container', () => {
      const location:InputElementLocation={character:{},container:{}}
      const manager=new InputContextManager(location)

      const action:ContextAction=manager.next()

      expect(action).to.equal(ContextAction.ContextOutByRight)
    });
  })

  describe('Getting inside another contexts: ', () => {
    it('Indicates to get inside the element\'s context next to it', () => {
      const location:InputElementLocation={character:{next:'fraction'},container:{}}
      const manager=new InputContextManager(location)

      const action:ContextAction=manager.next()

      expect(action).to.equal(ContextAction.ContextNextTerm)
    });

    it('Indicates to get inside the actual element\'s context', () => {
      const location:InputElementLocation={character:{actual:'fraction'},container:{}}
      const manager=new InputContextManager(location)

      const action:ContextAction=manager.prev()

      expect(action).to.equal(ContextAction.ContextActualTerm)
    });
  });

  describe('Moving to the last in case of being in the main container', () => {
    it('Indicates to move to the last character if there is no next character and the actual container is the main one', () => {
      const location:InputElementLocation={character:{},container:{isThisMain:true}}
      const manager=new InputContextManager(location)

      const action=manager.next()

      expect(action).to.equal(ContextAction.MoveToLastChar)
    });

    it('Indicates to move to the first character if there is no actual character and the actual container is the main one', () => {
      const location:InputElementLocation={character:{},container:{isThisMain:true}}
      const manager=new InputContextManager(location)

      const action=manager.prev()

      expect(action).to.equal(ContextAction.MoveToFirstChar)
    });
  });

});
