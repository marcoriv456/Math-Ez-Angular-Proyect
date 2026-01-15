import { runEditableElementSuite } from '../../../utils/run-editable-element-tests-suite.helper';
import {
  fracDenominatorSelector,
  fracNumeratorSelector,
} from '../../../utils/test-selectors.util';

describe('Fraction component: ', () => {
  runEditableElementSuite(`Fraction numerator`, `/`, fracNumeratorSelector);
  runEditableElementSuite(`Fraction denominator`, `/`, fracDenominatorSelector);
});
