import { expect, describe, it, beforeEach } from "vitest";
import { compare } from "bcryptjs";
import { DefaultError } from "../../../helpers/DefaultError";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { CreateGymUseCase } from "./create-gym";

// Testes unitários nunca vai tocar em banco de dados. Eles são testes isolados. Aqui no caso dos use-cases
let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create User Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository); // Como sempre estaremos testando os use cases aqui demos um nome padrão para a variável de instância. SUT - SYSTEM UNDER TEST
  });

  it("should be able to create a gym", async () => {
    const { gym } = await sut.execute({
      title: "JS Gym",
      latitude: -23.5507307,
      longitude: -46.5501599,
      description: null,
      phone: null,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
