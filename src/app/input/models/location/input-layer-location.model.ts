import {TermLocation} from "../term-location.model";
import {ContainerLocation} from "../container-location.model";

export interface LayeredTermLocation {
  character:TermLocation
  container:ContainerLocation
}
