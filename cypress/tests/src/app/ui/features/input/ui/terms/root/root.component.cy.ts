import {runEditableElementSuite} from '../../../utils/run-editable-element-tests-suite.helper';
import {rootRadicandSelector, rootIndexSelector} from '../../../utils/test-selectors.util';

describe('Root component: ', () => {
  runEditableElementSuite(`Root radicand`, `{ctrl}r`, rootRadicandSelector)
  runEditableElementSuite(`Root index`, `{alt}r`, rootIndexSelector)
});
