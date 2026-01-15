export const charSelector = 'char';

export const expSelector = 'exp';
export const expContainerSelector = 'exp>editable-term-container';

export const fracSelector = 'frac';
export const fracNumeratorSelector = `${fracSelector} editable-term-container:first-of-type`;
export const fracDenominatorSelector = `${fracSelector} editable-term-container:nth-of-type(2)`;

export const rootSelector = 'root';
export const rootIndexSelector = `${rootSelector} editable-term-container.index-container`;
export const rootRadicandSelector = `${rootSelector} editable-term-container.radicand-container`;

export const functionSelector = 'function';
export const functionBaseSelector = `${functionSelector} editable-term-container.base-container`;
export const functionArgumentSelector = `${functionSelector} editable-term-container.argument-container`;

export const parenthesisSelector = 'parenthesis';
export const parenthesisContainerSelector = `${parenthesisSelector}>editable-term-container`;
