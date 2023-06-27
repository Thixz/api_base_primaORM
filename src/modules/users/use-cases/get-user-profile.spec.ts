import { expect, describe, it, beforeEach } from "vitest";
import { compare, hash } from "bcryptjs";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { DefaultError } from "../../../helpers/DefaultError";
import { GetUserProfileUseCase } from "./get-user-profile";

// Testes unitários nunca vai tocar em banco de dados. Eles são testes isolados. Aqui no caso dos use-cases

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository); // Como sempre estaremos testando os use cases aqui demos um nome padrão para a variável de instância. SUT - SYSTEM UNDER TEST
  });

  it("should be able to get user profle", async () => {
    const createdUser = await usersRepository.create({
      name: "John Doe",
      email: "john.doe@gmail.com",
      password_hash: await hash("jhonjhon123", 6),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.id).toEqual(createdUser.id);
    expect(user.name).toEqual(createdUser.name);
  });

  it("should not be able to get user profle with wrong id", async () => {
    expect(async () => {
      const { user } = await sut.execute({
        userId: "non existing id",
      });
    }).rejects.toBeInstanceOf(DefaultError);
  });
});
