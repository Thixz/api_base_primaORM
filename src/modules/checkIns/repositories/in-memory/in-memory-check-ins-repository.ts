import { CheckIn, Prisma } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime";
import { randomUUID } from "node:crypto";
import { ICheckInsRepository } from "../Icheck-ins-repository";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  public checkIns: CheckIn[] = [];

  async findByUserIdOnDate(user_id: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date"); // Pega o horário inicial da data
    const endOfTheDay = dayjs(date).endOf("date"); // Pega o horário final da data

    const checkInOnSameDate = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);

      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === user_id && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async countByUserId(user_id: string): Promise<number> {
    return this.checkIns.filter((checkIn) => checkIn.user_id === user_id)
      .length;
  }

  async findManyByUserId(user_id: string, page: number) {
    return this.checkIns
      .filter((checkIn) => checkIn.user_id === user_id)
      .slice((page - 1) * 20, page * 20);
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };

    this.checkIns.push(checkIn);

    return checkIn;
  }
}
