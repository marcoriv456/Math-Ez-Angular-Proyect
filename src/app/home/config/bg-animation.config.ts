import {IParticlesProps} from "@tsparticles/angular";

export const bgAnimationConfig:IParticlesProps={
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable:true,
        mode:'bubble'
      },
      onHover: {
        enable:true,
        mode:'trail'
      },
    },
    modes: {
      push: {
        quantity: 4,
        speed:2
      },
      repulse: {
        distance: 100,
        duration: 1
      }
    },
  },
  particles: {

    move: {
      direction:'right',
      enable: true,
      random: false,
      speed: 2,
      straight: false,
      // decay:5,
      outModes: {
        default:'out',
      }
    },
    number: {
      value: 25
    },
    opacity: {
      value: 0.6,
    },
    shape: {
      type: "image",
      options:{
        image: [
          {
            src: '/assets/home/background/5.svg',
            width: 50,
            height: 50,
          },
          {
            src: '/assets/home/background/6.svg',
            width: 50,
            height: 50,
          },
          {
            src: '/assets/home/background/angle-brackets-vector.svg',
            width: 249,
            height: 40,
          },
          {
            src: '/assets/home/background/cos(x).svg',
            width: 136,
            height: 50,
          },
          {
            src: '/assets/home/background/diferential.svg',
            width: 50,
            height: 104,
          },
          {
            src: '/assets/home/background/fraction.svg',
            width: 92,
            height: 86,
          },
          {
            src: '/assets/home/background/integral.svg',
            width: 72,
            height: 127,
          },
          {
            src: '/assets/home/background/lim.svg',
            width: 94,
            height: 98,
          },
          {
            src: '/assets/home/background/ln(e).svg',
            width: 102,
            height: 50,
          },
          {
            src: '/assets/home/background/log.svg',
            width: 169,
            height: 60,
          },
          {
            src: '/assets/home/background/matrix.svg',
            width: 165,
            height: 165,
          },
          {
            src: '/assets/home/background/middle.svg',
            width: 50,
            height: 50,
          },
          {
            src: '/assets/home/background/P(A).svg',
            width: 104,
            height: 50,
          },
          {
            src: '/assets/home/background/root.svg',
            width: 87,
            height: 81,
          },
          {
            src: '/assets/home/background/sen(y).svg',
            width: 133,
            height: 50,
          },
          {
            src: '/assets/home/background/small-vector.svg',
            width: 147,
            height: 93,
          },
          {
            src: '/assets/home/background/tan.svg',
            width: 147,
            height: 59,
          },
          {
            src: '/assets/home/background/x.svg',
            width: 50,
            height: 50,
          },
          {
            src: '/assets/home/background/y.svg',
            width: 50,
            height: 50,
          },
        ]
      }
    },
    size: {
      value: { min: 20, max:40 },
    },
    reduceDuplicates:true,
    collisions:{
      enable:true,
      mode:'bounce'
    }
  },
};

