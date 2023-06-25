import { expect, describe, it } from "vitest";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";
import { CreateUserUseCase } from "./create-user";
import { compare } from "bcryptjs";

// Testes unitários nunca vai tocar em banco de dados. Eles são testes isolados. Aqui no caso dos use-cases

describe("Create User Use Case", () => {
  it("should hash user password upon registration", async () => {
    const prismaUsersRepository = new PrismaUsersRepository();
    const createUserUseCase = new CreateUserUseCase(prismaUsersRepository);

    const { createdUser } = await createUserUseCase.execute({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "jhonjhon123",
    });

    const isPasswordCorrectlyHashed = await compare(
      "jhonjhon123",
      createdUser.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
