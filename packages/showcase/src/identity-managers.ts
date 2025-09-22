interface IdentityManager {
  fetch(): string;
  set(id: string): void;
  reset(): void;
}

function numeric(length = 0) {
  return class implements IdentityManager {
    ids = new Set<number>();
    nextId = 1;

    fetch() {
      return (this.nextId++).toString().padStart(length, '0');
    }

    set(id: string) {
      id = String(id);

      if (!/^\d+$/.test(id)) {
        throw new Error(`ID ${id} is not a valid numeric ID.`);
      }

      const numericId = parseInt(id, 10);

      if (this.ids.has(numericId)) {
        throw new Error(`ID ${id} has already been used.`);
      }

      if (numericId >= this.nextId) {
        this.nextId = numericId + 1;
      }

      this.ids.add(numericId);
    }

    reset() {
      this.nextId = 1;
      this.ids.clear();
    }
  };
}

const guid = () => {
  return class implements IdentityManager {
    declare ids: Set<string>;

    constructor() {
      this.ids = new Set();
    }

    fetch() {
      let uuid = crypto.randomUUID().toUpperCase();
      while (this.ids.has(uuid)) {
        uuid = crypto.randomUUID().toUpperCase();
      }

      this.ids.add(uuid);

      return uuid;
    }

    set(id: string) {
      if (this.ids.has(id)) {
        throw new Error(`ID ${id} has already been used.`);
      }

      this.ids.add(id);
    }

    reset() {
      this.ids.clear();
    }
  };
};

export { guid, numeric };
export default { guid, numeric };
