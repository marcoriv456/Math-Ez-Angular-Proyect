import {runEditableElementSuite} from "../../../tests/run-editable-element-tests-suite.helper";
import {expContainerSelector} from "../../../tests/test-selectors.util";

describe('Exponent component: ', () => {
  runEditableElementSuite("Exponent component:","{ctrl}e",expContainerSelector)
});
