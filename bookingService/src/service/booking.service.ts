import prismaClient from "../prisma/client";
import { CreateBookingDTO } from "../dto/booking.dto";
import {
  confirmBooking,
  createBooking,
  createIdempotencyKey,
  finalizeIdempotencyKey,
  getIdempotencyKeyWithLock,
} from "../repositories/booking.repositories";
import { BadRequestError, InternalServerError, NotFoundError } from "../utils/errors/app.error";
import { generateIdempotencyKey } from "../utils/generateIdempotencyKey";
import { redlock } from "../config/redis.config";
import { serverConfig } from "../config";

export async function createBookingService(createBookingDTO: CreateBookingDTO) {

  const ttl = serverConfig.LOCK_TTL;
  const bookingResource = `hotel:${createBookingDTO.hotelId}`;
  let lock;
  try {
    lock = await redlock.acquire([bookingResource],ttl);
    console.log(lock)
const booking = await createBooking({
    userId: createBookingDTO.userId,
    hotelId: createBookingDTO.hotelId,
    totalGuests: createBookingDTO.totalGuests,
    bookingAmount: createBookingDTO.bookingAmount,
  });

  const idempotencyKey = generateIdempotencyKey();

  await createIdempotencyKey(idempotencyKey, booking.id);
  return {
    bookingId: booking.id,
    idempotencyKey: idempotencyKey,
  };
  } catch (error) {
    throw new InternalServerError('Failed ti acquire lock for booking resource');
  }

  // return await redlock.using([bookingResource],ttl,async ()=>{


  // })


  
}

export async function confirmBookingService(idempotencyKey: string) {
  return await prismaClient.$transaction(async (tx) => {
    const idempotencyKeyData = await getIdempotencyKeyWithLock(idempotencyKey,tx);
    if (!idempotencyKeyData || !idempotencyKeyData.bookingId) {
      throw new NotFoundError("idempotency key not found");
    }
    if (idempotencyKeyData.finalized) {
      throw new BadRequestError("idempotency key already finalized");
    }

    // here payment step should go

    const booking = await confirmBooking(tx,idempotencyKeyData.bookingId);
    await finalizeIdempotencyKey(tx,idempotencyKey);
    return booking;
  });
}
