import {IParticlesProps} from "@tsparticles/angular";
import {IMove, IParticlesOptions, RecursivePartial} from "@tsparticles/engine";


const generalLayerConfig:RecursivePartial<IParticlesProps>={
  fpsLimit:120,
}

const generalParticleConfig:RecursivePartial<IParticlesOptions>={
  reduceDuplicates:true,
  collisions:{
    enable:true,
    mode:'bounce',
    bounce:{
      horizontal:{
        value:21
      },
      vertical:{
        value:21
      }
    }

  }
}

const generalParticleMoveConfig:RecursivePartial<IMove>={
  enable:true,
  random:false,
  straight:true,
  direction:"right",
}

export const layer1Config:RecursivePartial<IParticlesOptions>={
  ...generalLayerConfig,

  particles:{
    ...generalParticleConfig,
    number:{value:10},
    size: {value: { min: 45, max:50 },},
    move: {speed: 3, ...generalParticleMoveConfig},
    opacity: {value: 0.7,},
    shape: {
      type: "image",
      options: {
        image: [
          {src: '/assets/home/background/5.svg', width: 50, height: 50},
          {src: '/assets/home/background/6.svg', width: 50, height: 50},
          {src: '/assets/home/background/x.svg', width: 50, height: 50},
          {src: '/assets/home/background/y.svg', width: 50, height: 50},
          {src: '/assets/home/background/middle.svg', width: 50, height: 50},
        ]
      },
    },
  }
}

export const layer2Config:RecursivePartial<IParticlesOptions>={
  ...generalLayerConfig,
  particles:{
    ...generalParticleConfig,
    number:{value:10},
    size: {value: { min: 35, max:40 }},
    move: {speed: 1, ...generalParticleMoveConfig},
    opacity: {value: 0.4},
    shape: {
      type: "image",
      options: {
        image: [
          {src: '/assets/home/background/sen(y).svg', width: 133, height: 50},
          {src: '/assets/home/background/cos(x).svg', width: 136, height: 50},
          {src: '/assets/home/background/ln(e).svg', width: 102, height: 50},
          {src: '/assets/home/background/log.svg', width: 169, height: 60},
          {src: '/assets/home/background/tan.svg', width: 147, height: 59},
          {src: '/assets/home/background/P(A).svg', width: 104, height: 50},
          {src: '/assets/home/background/root.svg', width: 87, height: 81},
        ]
      },
    },
  }
}

export const layer3Config:RecursivePartial<IParticlesOptions>={
  ...generalLayerConfig,
  particles:{
    ...generalParticleConfig,
    number:{value:5},
    size: {value: { min:25, max:30 }},
    move: {speed: 0.5, ...generalParticleMoveConfig},
    opacity: {value: 0.5,},
    shape: {
      type: "image",
      options: {
        image: [
          {src: '/assets/home/background/angle-brackets-vector.svg', width: 249, height: 40},
          {src: '/assets/home/background/fraction.svg', width: 92, height: 86},
          {src: '/assets/home/background/lim.svg', width: 94, height: 98},
          {src: '/assets/home/background/matrix.svg', width: 165, height: 165},
          {src: '/assets/home/background/small-vector.svg', width: 147, height: 93},
        ]
      },
    },
  }
}
