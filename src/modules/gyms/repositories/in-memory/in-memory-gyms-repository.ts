import { Gym, Prisma, User } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime";
import { randomUUID } from "node:crypto";
import { IGymsRepository } from "../Igyms-repository";

export class InMemoryGymsRepository implements IGymsRepository {
  public items: Gym[] = [];

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}
