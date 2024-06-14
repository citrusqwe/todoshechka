export const validators = {
  required(value: string | number | null | undefined, message: string = 'This field cannot be empty'): string | null {
    if (typeof value !== 'number' && !value) return message;
    return null;
  },
};
