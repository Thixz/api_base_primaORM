import { expect, describe, it, beforeEach } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";
import { InMemoryGymsRepository } from "../repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

// Testes unitários nunca vai tocar em banco de dados. Eles são testes isolados. Aqui no caso dos use-cases

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Gyms by name Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository); // Como sempre estaremos testando os use cases aqui demos um nome padrão para a variável de instância. SUT - SYSTEM UNDER TEST
  });

  it("should be able to fetch nearby gyms", async () => {
    const nearGym = await gymsRepository.create({
      title: "Near Gym",
      latitude: -23.5460803,
      longitude: -46.541531,
    });

    await gymsRepository.create({
      title: "Far Gym",
      latitude: -23.9331804,
      longitude: -48.4249784,
    });

    const { gyms } = await sut.execute({
      userLatitude: -23.5507813,
      userLongitude: -46.550178,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ id: nearGym.id, title: "Near Gym" }),
    ]);
  });
});
