export class UnexpectedTermTypeError extends Error {
  constructor(expectedType: string, providedType: string) {
    super(
      `Unable to create a validator with the provided term. \nExpected type: ${expectedType} \nProvided: ${providedType}`,
    );
  }
}
