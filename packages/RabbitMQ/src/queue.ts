import { v4 as uuid } from "uuid";
export class QueuingSystem {
  public static Queue = new Map<string, typeof Promise.resolve>();

  static createQueingId() {
    let id: string | null = null;
    do {
      const _id = uuid();
      if (this.Queue.has(_id)) {
        continue;
      }
      id = _id;
    } while (!id);

    return id;
  }
}
