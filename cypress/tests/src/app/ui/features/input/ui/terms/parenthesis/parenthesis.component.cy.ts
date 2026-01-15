import { runEditableElementSuite } from '../../../utils/run-editable-element-tests-suite.helper';
import { parenthesisContainerSelector } from '../../../utils/test-selectors.util';

describe('Parenthesis component: ', () => {
  runEditableElementSuite(`Parenthesis`, `()`, parenthesisContainerSelector);
});
