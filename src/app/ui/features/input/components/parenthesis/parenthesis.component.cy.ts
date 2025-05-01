import {runEditableElementSuite} from "../../tests/run-editable-element-tests-suite.helper";
import {parenthesisContainerSelector} from "../../tests/test-selectors.util";

describe('Parenthesis component: ', () => {
  runEditableElementSuite(`Parenthesis`, `()`, parenthesisContainerSelector)
});
