import { IOptions, RecursivePartial } from '@tsparticles/engine';

export const bgConfig: RecursivePartial<IOptions> = {
  fpsLimit: 60,
  emitters: [
    {
      reduceDuplicates: true,
      pauseOnBlur: true,
      position: { x: 50, y: 50 },
      rate: {
        quantity: 1,
        delay: 1,
      },
      life: {
        count: 0,
        duration: 0,
        delay: 0,
        wait: false,
      },
      particles: {
        number: { value: 0 },
        size: {
          value: { min: 50, max: 300 },
          animation: {
            enable: true,
            startValue: 'min',
            endValue: 'max',
            speed: 40,
            sync: false,
          },
        },
        move: {
          speed: 2,
          enable: true,
          direction: 'none',
          outModes: {
            default: 'destroy',
          },
        },
        opacity: {
          value: { min: 0, max: 0.8 },
          animation: {
            enable: true,
            speed: 0.5,
            startValue: 'min',
            destroy: 'min',
            sync: false,
          },
        },
        collisions: {
          enable: true,
          mode: 'bounce',
          bounce: {
            horizontal: { value: 1 },
            vertical: { value: 1 },
          },
        },
        shape: {
          type: 'image',
          options: {
            image: [
              {
                src: '/assets/home/background/bottom-layer/1.svg',
                width: 50,
                height: 50,
              },
              {
                src: '/assets/home/background/bottom-layer/2.svg',
                width: 50,
                height: 50,
              },
              {
                src: '/assets/home/background/bottom-layer/3.svg',
                width: 50,
                height: 50,
              },
              {
                src: '/assets/home/background/bottom-layer/4.svg',
                width: 50,
                height: 50,
              },
              {
                src: '/assets/home/background/bottom-layer/5.svg',
                width: 50,
                height: 50,
              },
              {
                src: '/assets/home/background/bottom-layer/6.svg',
                width: 50,
                height: 50,
              },
              {
                src: '/assets/home/background/bottom-layer/7.svg',
                width: 50,
                height: 50,
              },
              {
                src: '/assets/home/background/bottom-layer/8.svg',
                width: 50,
                height: 50,
              },
              {
                src: '/assets/home/background/bottom-layer/9.svg',
                width: 50,
                height: 50,
              },
              {
                src: '/assets/home/background/bottom-layer/10.svg',
                width: 50,
                height: 50,
              },
              {
                src: '/assets/home/background/bottom-layer/11.svg',
                width: 50,
                height: 50,
              },
            ],
          },
        },
      },
    },
  ],
};
