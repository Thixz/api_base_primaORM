import { prisma } from "../../../../lib/prisma";
import { Prisma } from "@prisma/client";
import { IUsersRepository } from "../Iusers-repository";

export class PrismaUsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    // Quando criamos entidades no Prisma ele da algumas tipagens de exemplo para quando vamos criar, atualizar a entidade por exemplo.
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
