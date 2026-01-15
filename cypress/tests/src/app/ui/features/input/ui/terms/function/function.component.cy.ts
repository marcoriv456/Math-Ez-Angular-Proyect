import { runEditableElementSuite } from '../../../utils/run-editable-element-tests-suite.helper';
import {
  functionArgumentSelector,
  functionBaseSelector,
} from '../../../utils/test-selectors.util';
describe('Function component: ', () => {
  runEditableElementSuite(`Function argument`, `sen`, functionArgumentSelector);
  runEditableElementSuite(`Function base`, `log`, functionBaseSelector);
});
