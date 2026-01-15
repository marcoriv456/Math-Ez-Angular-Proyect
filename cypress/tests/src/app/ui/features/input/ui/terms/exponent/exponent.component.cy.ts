import { runEditableElementSuite } from '../../../utils/run-editable-element-tests-suite.helper';
import { expContainerSelector } from '../../../utils/test-selectors.util';

describe('Exponent component: ', () => {
  runEditableElementSuite(
    'Exponent component:',
    '{ctrl}e',
    expContainerSelector,
  );
});
