import {IMove, IParticlesOptions, RecursivePartial} from "@tsparticles/engine";

const generalParticleMoveConfig: RecursivePartial<IMove> = {
  enable: true,
  random: false,
  direction: "right",
  warp: true
}

export const topLayerConfig: RecursivePartial<IParticlesOptions> = {
  fpsLimit: 120,
  particles: {
    reduceDuplicates: true,
    number: {value: 10, density: {width: 1920, height: 1080}},
    size: {value: {min: 70, max: 90}},
    move: {
      speed: 5, straight: false, outModes: {
        default: 'out',
        top: 'bounce',
        bottom: 'bounce',
      },
      ...generalParticleMoveConfig
    },
    opacity: {value: 0.5},
    collisions: {
      enable: true, mode: 'bounce',
      bounce: {horizontal: {value: 1}, vertical: {value: 1}}
    },
    shape: {
      type: "image",
      options: {
        image: [
          {src: '/assets/home/background/top-layer/1.svg', width: 50, height: 50},
          {src: '/assets/home/background/top-layer/2.svg', width: 50, height: 50},
          {src: '/assets/home/background/top-layer/3.svg', width: 50, height: 50},
          {src: '/assets/home/background/top-layer/4.svg', width: 50, height: 50},
          {src: '/assets/home/background/top-layer/5.svg', width: 50, height: 50},
          {src: '/assets/home/background/top-layer/6.svg', width: 50, height: 50},
          {src: '/assets/home/background/top-layer/7.svg', width: 50, height: 50},
          {src: '/assets/home/background/top-layer/8.svg', width: 50, height: 50},
          {src: '/assets/home/background/top-layer/9.svg', width: 50, height: 50},
          {src: '/assets/home/background/top-layer/0.svg', width: 50, height: 50},
        ]
      },
    },
  }
}


export const bottomLayerConfig: RecursivePartial<IParticlesOptions> = {
  fpsLimit: 120,
  particles: {
    reduceDuplicates: true,
    number: {value: 15, density: {width: 1920, height: 1080}},
    size: {value: {min: 90, max: 100}},
    move: {speed: 1, straight: true, ...generalParticleMoveConfig},
    opacity: {value: 0.3,},
    collisions: {enable: true, mode: 'destroy'},
    shape: {
      type: "image",
      options: {
        image: [
          {src: '/assets/home/background/bottom-layer/1.svg', width: 50, height: 50},
          {src: '/assets/home/background/bottom-layer/2.svg', width: 50, height: 50},
          {src: '/assets/home/background/bottom-layer/3.svg', width: 50, height: 50},
          {src: '/assets/home/background/bottom-layer/4.svg', width: 50, height: 50},
          {src: '/assets/home/background/bottom-layer/5.svg', width: 50, height: 50},
          {src: '/assets/home/background/bottom-layer/6.svg', width: 50, height: 50},
          {src: '/assets/home/background/bottom-layer/7.svg', width: 50, height: 50},
          {src: '/assets/home/background/bottom-layer/8.svg', width: 50, height: 50},
        ]
      },
    },
  }
}
