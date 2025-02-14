import {runEditableElementSuite} from "../../tests/run-editable-element-tests-suite.helper";


describe('Root component: ', () => {
  runEditableElementSuite(`Root radicand`, `{ctrl}r`, `root editable-term-container`)
  runEditableElementSuite(`Root index`, `{alt}r`, `root argument`)
});
