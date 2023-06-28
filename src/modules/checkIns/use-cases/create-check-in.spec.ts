import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { compare, hash } from "bcryptjs";
import { DefaultError } from "../../../helpers/DefaultError";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { CreateCheckInUseCase } from "./create-check-in";
import { InMemoryGymsRepository } from "../../gyms/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

// Testes unitários nunca vai tocar em banco de dados. Eles são testes isolados. Aqui no caso dos use-cases

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CreateCheckInUseCase;

describe("Create Check In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateCheckInUseCase(checkInsRepository, gymsRepository); // Como sempre estaremos testando os use cases aqui demos um nome padrão para a variável de instância. SUT - SYSTEM UNDER TEST

    gymsRepository.create({
      id: "gym-01",
      title: "Academia do JS",
      description: "Test",
      latitude: -23.5507307,
      longitude: -46.5501599,
      phone: "1234567",
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to create a check in", async () => {
    const { checkIn } = await sut.execute({
      gym_id: "gym-01",
      user_id: "user-01",
      userLatitude: -23.5507307,
      userLongitude: -46.5501599,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)); // Aqui estamos colocando uma data especifica no sistema para termos a certeza que nos dois execute no in memory repository que preenche o created_at com new Date() as duas datas estejam no mesmo dia

    await sut.execute({
      gym_id: "gym-01",
      user_id: "user-01",
      userLatitude: -23.5507307,
      userLongitude: -46.5501599,
    });

    expect(async () => {
      await sut.execute({
        gym_id: "gym-01",
        user_id: "user-01",
        userLatitude: -23.5507307,
        userLongitude: -46.5501599,
      });
    }).rejects.toBeInstanceOf(DefaultError);
  });

  it("should be able to check in twice, but in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0)); // Aqui estamos colocando uma data especifica no sistema para termos a certeza que nos dois execute no in memory repository que preenche o created_at com new Date() as duas datas estejam no mesmo dia

    await sut.execute({
      gym_id: "gym-01",
      user_id: "user-01",
      userLatitude: -23.5507307,
      userLongitude: -46.5501599,
    });

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gym_id: "gym-01",
      user_id: "user-01",
      userLatitude: -23.5507307,
      userLongitude: -46.5501599,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to checkin in on a distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "Academia do JS",
      description: "Test",
      latitude: new Decimal(-23.5507307),
      longitude: new Decimal(-46.5501599),
      phone: "1234567",
    });

    expect(async () => {
      await sut.execute({
        gym_id: "gym-02",
        user_id: "user-01",
        userLatitude: -23.5434846,
        userLongitude: -46.5472273,
      });
    }).rejects.toBeInstanceOf(DefaultError);
  });
});
