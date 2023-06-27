import { expect, describe, it, beforeEach } from "vitest";
import { CreateUserUseCase } from "./create-user";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { DefaultError } from "../../../helpers/DefaultError";

// Testes unitários nunca vai tocar em banco de dados. Eles são testes isolados. Aqui no caso dos use-cases
let usersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe("Create User Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(usersRepository); // Como sempre estaremos testando os use cases aqui demos um nome padrão para a variável de instância. SUT - SYSTEM UNDER TEST
  });

  it("should be able to create an user", async () => {
    const { createdUser } = await sut.execute({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "jhonjhon123",
    });

    expect(createdUser.id).toEqual(expect.any(String));
  });

  it("should hash user password upon registration", async () => {
    const { createdUser } = await sut.execute({
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

  it("should not be able to register with same email twice", async () => {
    const email = "john.doe@gmail.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "jhonjhon123",
    });

    expect(async () => {
      await sut.execute({
        name: "John Doe",
        email,
        password: "jhonjhon123",
      });
    }).rejects.toBeInstanceOf(DefaultError);
  });
});
