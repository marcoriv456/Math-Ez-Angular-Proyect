import { LogarithmValidator } from './logarithm/logarithm.validator';
import { DefaultValidator } from '../default/default.validator';

export const getFunctionValidator = (functionName: string) => {
  switch (functionName) {
    case 'log':
      return LogarithmValidator;
  }
  return DefaultValidator;
};
