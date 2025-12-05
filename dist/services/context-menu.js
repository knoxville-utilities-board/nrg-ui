import { assert } from '@ember/debug';
import Service from '@ember/service';
import { TrackedMap } from 'tracked-built-ins';

class ContextMenu extends Service {
  menus = new TrackedMap();
  menu(id) {
    return this.menus.get(id);
  }
  async register(id, {
    top,
    bottom,
    dropdown
  }) {
    // This must be disconnected from reactivity to avoid triggering
    // errors from reading and updating the same property in the same cycle.
    await Promise.resolve();
    assert('Context menu must have an id.', id);
    assert(`Context menu with id "${id}" already exists. Use a different id or unregister the existing menu.`, !this.menus.has(id));
    assert(`Context menu with id "${id}" must have a top and bottom element.`, top && bottom);
    assert(`Context menu with id "${id}" must have a dropdown.`, dropdown);
    this.menus.set(id, {
      id,
      top,
      bottom,
      dropdown
    });
  }
  async unregister(id) {
    // This must be disconnected from reactivity to avoid triggering
    // errors from reading and updating the same property in the same cycle.
    await Promise.resolve();
    this.menus.delete(id);
  }
}

export { ContextMenu as default };
//# sourceMappingURL=context-menu.js.map
