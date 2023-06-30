import { prisma } from "../../../../lib/prisma";
import { CheckIn, Prisma } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime";
import { ICheckInsRepository } from "../Icheck-ins-repository";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements ICheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({
      data,
    });

    return checkIn;
  }

  async findById(checkIn_id: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: checkIn_id,
      },
    });

    return checkIn;
  }

  async findManyByUserId(user_id: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIns;
  }

  async countByUserId(user_id: string) {
    const count = await prisma.checkIn.count({
      where: {
        user_id,
      },
    });

    return count;
  }

  async findByUserIdOnDate(user_id: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date").toDate();
    const endOfTheDay = dayjs(date).endOf("date").toDate();

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id,
        created_at: {
          gte: startOfTheDay,
          lte: endOfTheDay,
        },
      },
    });

    return checkIn;
  }

  async save(checkIn: CheckIn) {
    const updatedCheckIn = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    });

    return updatedCheckIn;
  }
}
