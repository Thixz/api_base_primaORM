import { expect, describe, it, beforeEach } from "vitest";
import { compare, hash } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { DefaultError } from "../../../helpers/DefaultError";
import { AuthenticateUserUseCase } from "./authenticate-user";

// Testes unitários nunca vai tocar em banco de dados. Eles são testes isolados. Aqui no caso dos use-cases

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUserUseCase;

describe("Authenticate User Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUserUseCase(usersRepository); // Como sempre estaremos testando os use cases aqui demos um nome padrão para a variável de instância. SUT - SYSTEM UNDER TEST
  });

  it("should be able to authenticate an user", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password_hash: await hash("jhonjhon123", 6),
    });

    const { user } = await sut.execute({
      email: "john.doe@gmail.com",
      password: "jhonjhon123",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong email", async () => {
    expect(async () => {
      await sut.execute({
        email: "john.doe@gmail.com",
        password: "jhonjhon123",
      });
    }).rejects.toBeInstanceOf(DefaultError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password_hash: await hash("jhonjhon123", 6),
    });

    expect(async () => {
      await sut.execute({
        email: "john.doe@gmail.com",
        password: "jhonjones",
      });
    }).rejects.toBeInstanceOf(DefaultError);
  });
});
