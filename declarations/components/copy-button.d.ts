import Component from '@glimmer/component';
import '../assets/copy-button.css';
export interface CopyButtonSignature {
    Element: HTMLButtonElement;
    Args: {
        text: string;
    };
}
export default class CopyButton extends Component<CopyButtonSignature> {
    get icon(): "bi-clipboard-check" | "bi-clipboard";
    copyToClipboard: import("ember-concurrency").TaskForAsyncTaskFunction<unknown, () => Promise<void>>;
}
