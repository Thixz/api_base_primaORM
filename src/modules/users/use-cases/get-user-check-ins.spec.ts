import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "../../checkIns/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserCheckInsUseCase } from "./get-user-check-ins";

// Testes unitários nunca vai tocar em banco de dados. Eles são testes isolados. Aqui no caso dos use-cases

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserCheckInsUseCase;

describe("Get User metrics Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserCheckInsUseCase(checkInsRepository); // Como sempre estaremos testando os use cases aqui demos um nome padrão para a variável de instância. SUT - SYSTEM UNDER TEST
  });

  it("should be able to get check-ins count by user", async () => {
    const user_id = "user-01";
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id,
    });

    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id,
    });

    const { checkInsCount } = await sut.execute({
      user_id,
    });

    expect(checkInsCount).toEqual(2);
  });
});
