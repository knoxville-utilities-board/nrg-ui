import snippets from '@nrg-ui/code-snippets/virtual';
export function getSnippet(name) {
    const snippet = snippets[name];
    if (!snippet) {
        throw new Error(`No code snippet found with the name "${name}".`);
    }
    return snippet;
}
export default { getSnippet };
