class Backpack {
    constructor(small, medium, big) {
      this.storage = {
        small,
        medium,
        big
      };
      this.items = [];
      this.identifier = 1;
    }
  
    getSizeOfItem(itemId) {
      if (itemId <= this.identifier - this.storage.big) {
        return "big";
      } else if (itemId <= this.identifier - this.storage.medium) {
        return "medium";
      } else {
        return "small";
      }
    }
  }
  
  class PackingService {
    constructor(backpack) {
      this.backpack = backpack;
    }
  
    pack(size) {
      if (this.backpack.storage[size] > 0) {
        this.backpack.storage[size]--;
        this.backpack.items.push(this.backpack.identifier);
        return this.backpack.identifier++;
      } else {
        return -1;
      }
    }
  
    unpack(size) {
      for (let i = this.backpack.items.length - 1; i >= 0; i--) {
        if (this.backpack.items[i] !== null && size === this.backpack.getSizeOfItem(this.backpack.items[i])) {
          const item = this.backpack.items[i];
          this.backpack.items[i] = null;
          return item;
        }
      }
      return -2; // Item of the specified size not found
    }
  
    processActions(actions) {
      const result = [];
  
      for (const action of actions) {
        const [actionType, size] = action;
  
        if (actionType === "pack") {
          const itemId = this.pack(size);
          result.push(itemId);
        } else if (actionType === "unpack") {
          const itemId = this.unpack(size);
          result.push(itemId);
        }
      }
  
      return result;
    }
  }
  
  const backpack = new Backpack(8, 4, 2);
  const packingService = new PackingService(backpack);
  const actions = [["pack", "small"], ["pack", "big"], ["pack", "big"], ["pack", "big"], ["unpack", "big"], ["pack", "medium"]];
  const result = packingService.processActions(actions);
  
  console.log(result); // [1, 2, 3, -1, 3, 4]
  