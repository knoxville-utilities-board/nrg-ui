export default interface ValidationComponentSignature {
  Args: {
    value?: string | number;
    defaultValue?: string | number;
    model?: object;
    valuePath?: string;
    useNestedValuePath?: boolean;
    useDefaultValue?: boolean;
    // eslint-disable-next-line no-unused-vars
    onChange?: (value: any) => unknown;
  };
}
