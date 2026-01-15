import { TermLocation } from './term-location.model';
import { ContainerLocation } from './container-location.model';

export interface InputElementLocation {
  character: TermLocation;
  container: ContainerLocation;
}
