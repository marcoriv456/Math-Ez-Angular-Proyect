import {runEditableElementSuite} from "../../../tests/run-editable-element-tests-suite.helper";
import {functionArgumentSelector, functionBaseSelector} from "../../../tests/test-selectors.util";

describe('Function component: ', () => {
  runEditableElementSuite(`Function argument`, `sen`, functionArgumentSelector)
  runEditableElementSuite(`Function base`, `log`, functionBaseSelector)
});
