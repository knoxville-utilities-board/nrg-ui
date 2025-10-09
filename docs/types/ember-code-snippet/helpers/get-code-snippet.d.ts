import type { HelperLike } from '@glint/template';

export default HelperLike<{
  Args: {
    Positional: [string];
  };
  Return: {
    source: string;
    language: string;
  };
}>;
