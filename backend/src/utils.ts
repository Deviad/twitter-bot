import {trim} from 'lodash';

const isString = (value: any): value is string => {
    return typeof value === 'string';
};
export const hasText = (value: any): value is string => {
    return isString(value) && trim(value) !== '';
};
