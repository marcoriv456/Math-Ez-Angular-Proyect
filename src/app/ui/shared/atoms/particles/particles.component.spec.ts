import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ParticlesComponent} from './particles.component';
import {SharedModule} from "../../shared.module";
import {tsParticles} from "@tsparticles/engine";

describe('ParticlesComponent', () => {
  let component: ParticlesComponent;
  let fixture: ComponentFixture<ParticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ParticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load particles with provided options and id', async () => {
    jest.spyOn(tsParticles, 'load').mockReturnValue(Promise.resolve({} as any));

    component.particlesId = 'test-id';
    component.options = {particles: {number: {value: 100}}};

    await component.ngAfterViewInit();

    expect(tsParticles.load).toHaveBeenCalledWith({
      id: 'test-id',
      options: {particles: {number: {value: 100}}}
    });
  });

  it('should log error when particles loading fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    jest.spyOn(tsParticles, 'load').mockReturnValue(Promise.reject('Load error'));

    component.particlesId = 'test-id';
    component.options = {particles: {number: {value: 100}}};

    await component.ngAfterViewInit();

    expect(consoleSpy).toHaveBeenCalledWith('Error while loading particles: ', 'Load error');
  });
});
