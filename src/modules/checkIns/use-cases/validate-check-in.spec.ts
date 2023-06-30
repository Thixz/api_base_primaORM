import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { compare, hash } from "bcryptjs";
import { DefaultError } from "../../../helpers/DefaultError";
import { InMemoryCheckInsRepository } from "../repositories/in-memory/in-memory-check-ins-repository";
import { CreateCheckInUseCase } from "./create-check-in";
import { InMemoryGymsRepository } from "../../gyms/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { ValidateCheckInUseCase } from "./validate-check-in";

// Testes unitários nunca vai tocar em banco de dados. Eles são testes isolados. Aqui no caso dos use-cases

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate Check In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository); // Como sempre estaremos testando os use cases aqui demos um nome padrão para a variável de instância. SUT - SYSTEM UNDER TEST

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate the check-in", async () => {
    const createdcheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn } = await sut.execute({
      checkIn_id: createdcheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.checkIns[0].validated_at).toEqual(
      expect.any(Date)
    );
  });

  it("should not be able to validate an inexistent check-in", async () => {
    expect(async () => {
      await sut.execute({
        checkIn_id: "error-id",
      });
    }).rejects.toBeInstanceOf(DefaultError);
  });

  it("should not be able to validate check-in after 20 minutes of its creation", async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    const createdcheckIn = await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const twentyOneMinutesInMs = 1000 * 60 * 21;

    vi.advanceTimersByTime(twentyOneMinutesInMs);

    expect(async () => {
      await sut.execute({
        checkIn_id: createdcheckIn.id,
      });
    }).rejects.toBeInstanceOf(DefaultError);
  });
});
