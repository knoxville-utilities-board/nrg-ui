/**
 * Copied from <https://github.com/adopted-ember-addons/ember-validators/blob/1282748147a691f3fcffacb0c478a676cc9e309a/addon/format.js#L29-L30>
 *
 * Capturing groups were added to the original regex to allow for more specific error messages and validations.
 *
 * Capturing groups:
 * - Group 1: The local part of the email address.
 * - Group 2: The domain part of the email address.
 */
export declare const regex: RegExp;
declare const _default: {
    regex: RegExp;
};
export default _default;
