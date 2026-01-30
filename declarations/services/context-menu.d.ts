import Service from '@ember/service';
import { TrackedMap } from 'tracked-built-ins';
import type { DropdownSignature } from '../components/dropdown';
export type Dropdown = DropdownSignature['Blocks']['menu'][0];
export interface Menu {
    id: string;
    top: HTMLDivElement;
    bottom: HTMLDivElement;
    dropdown: Dropdown;
}
export default class ContextMenu extends Service {
    menus: TrackedMap<string, Menu>;
    menu(id: string): Menu | undefined;
    register(id: string, { top, bottom, dropdown }: {
        top: HTMLDivElement;
        bottom: HTMLDivElement;
        dropdown: Dropdown;
    }): Promise<void>;
    unregister(id: string): Promise<void>;
}
declare module '@ember/service' {
    interface Registry {
        'context-menu': ContextMenu;
    }
}
