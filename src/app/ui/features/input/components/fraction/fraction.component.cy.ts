import {runEditableElementSuite} from "../../tests/run-editable-element-tests-suite.helper";
import {fracDenominatorSelector, fracNumeratorSelector} from "../../tests/test-selectors.util";


describe('Fraction component: ', () => {
  runEditableElementSuite(`Fraction numerator`, `/`, fracNumeratorSelector)
  runEditableElementSuite(`Fraction denominator`, `/`, fracDenominatorSelector)
});
