import {runEditableElementSuite} from "../../tests/run-editable-element-tests-suite.helper";


describe('Fraction component: ', () => {
  runEditableElementSuite(`Fraction numerator`, `/`, `frac frac-child[type="numerator"]`)
  runEditableElementSuite(`Fraction denominator`, `/`, `frac frac-child[type="denominator"]`)

});
