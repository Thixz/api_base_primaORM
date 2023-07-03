import { expect, describe, it, beforeEach } from "vitest";
import { DefaultError } from "../../../helpers/DefaultError";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { FetchUserCheckInsUseCase } from "./fetch-user-check-ins-history";

// Testes unitários nunca vai tocar em banco de dados. Eles são testes isolados. Aqui no caso dos use-cases

let checkInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInsUseCase;

describe("Fetch user check ins history Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInsUseCase(checkInsRepository); // Como sempre estaremos testando os use cases aqui demos um nome padrão para a variável de instância. SUT - SYSTEM UNDER TEST
  });

  it("should be able to fetch check-in history", async () => {
    const user_id = "user-01";
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id,
    });

    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id,
    });

    const { checkIns } = await sut.execute({
      user_id,
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });

  it("should be able to fetch paginated check-in history", async () => {
    const user_id = "user-01";

    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id,
      });
    }

    const { checkIns } = await sut.execute({
      user_id,
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
