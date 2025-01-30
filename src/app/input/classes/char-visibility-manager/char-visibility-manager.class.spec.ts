import {CharVisibilityManager} from "./char-visibility-manager.class";

describe('CharVisibilityManager: ', () => {
  let overlay: HTMLElement;
  let charVisibilityManager: CharVisibilityManager;

  beforeEach(() => {
    overlay = document.createElement('div');
    Object.assign(overlay.style, {
      width: '100px',
      height: '50px',
      overflow: 'auto',
    });
    overlay.scrollLeft = 0;
    Object.defineProperty(overlay, 'clientWidth', {value:100})

    charVisibilityManager = new CharVisibilityManager(overlay);
  });

  describe('Initialization: ', () => {
    it('should initialize overlayViewWidth with the overlay client width', () => {
      expect(charVisibilityManager['overlayViewWidth']).toBe(100);
    });

    it('should initialize scrollBarFrom and scrollBarTo based on scrollLeft and clientWidth', () => {
      expect(charVisibilityManager['scrollBarFrom']).toBe(0);
      expect(charVisibilityManager['scrollBarTo']).toBe(100);
    });

    it('should initialize offset as 3 by default', () => {
      expect(charVisibilityManager['offset']).toBe(3);
    });
  });

  describe('makeCharVisible: ', () => {
    it('should do nothing if the char is already visible within the viewport', () => {
      const positionX = 50;
      const initialScrollLeft = overlay.scrollLeft;

      charVisibilityManager.makeCharVisible(positionX);

      expect(overlay.scrollLeft).toBe(initialScrollLeft);
    });

    it('should scroll to the left if the char is to the left of the viewport', () => {
      Object.defineProperty(overlay,'scrollLeft',{value:50})
      charVisibilityManager=new CharVisibilityManager(overlay)
      const positionX = 20;

      spyOn(overlay, 'scrollTo');
      charVisibilityManager.makeCharVisible(positionX);

      //@ts-ignore
      expect(overlay.scrollTo).toHaveBeenCalledWith({left:20})
    });

    it('should scroll to the right if the char is to the right of the viewport', () => {
      const positionX = 150;
      spyOn(overlay, 'scrollTo');

      charVisibilityManager.makeCharVisible(positionX);

      //@ts-ignore
      expect(overlay.scrollTo).toHaveBeenCalledWith({left:50});
    });

    it('should scroll slightly to the right after a timeout if the char is on the right', (done) => {
      const positionX = 150;
      spyOn(overlay, 'scrollTo');
      spyOn(overlay, 'scrollBy');

      charVisibilityManager.makeCharVisible(positionX);

      //@ts-ignore
      expect(overlay.scrollTo).toHaveBeenCalledWith({left:50});

      setTimeout(() => {
      //@ts-ignore
        expect(overlay.scrollBy).toHaveBeenCalledWith({left:3} );
        done();
      }, 100);
    });

    it('should not scroll slightly to the right if the char is on the left', (done) => {
      const positionX = 10;
      Object.defineProperty(overlay,'scrollLeft',{value:50})
      charVisibilityManager=new CharVisibilityManager(overlay)
      spyOn(overlay, 'scrollTo');
      spyOn(overlay, 'scrollBy');

      charVisibilityManager.makeCharVisible(positionX);
      
      expect(overlay.scrollTo).toHaveBeenCalled();
      setTimeout(() => {
        expect(overlay.scrollBy).not.toHaveBeenCalled();
        done();
      }, 100);
    });
  });
});
