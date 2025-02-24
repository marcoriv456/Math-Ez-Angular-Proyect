import {runEditableElementSuite} from "../../tests/run-editable-element-tests-suite.helper";
import {rootIndexSelector, rootRadicandSelector} from "../../tests/test-selectors.util";


describe('Root component: ', () => {
  runEditableElementSuite(`Root radicand`, `{ctrl}r`, rootRadicandSelector)
  runEditableElementSuite(`Root index`, `{alt}r`, rootIndexSelector)
});
