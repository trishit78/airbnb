import { Prisma,IdempotencyKey } from "@prisma/client";

import prismaClient from "../prisma/client";
import { validate as isValidUUID } from "uuid";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";

export async function createBooking (bookingInput:Prisma.BookingCreateInput){
    const booking = await prismaClient.booking.create({
        data:bookingInput
    });
    return booking;

}

export async function createIdempotencyKey(key:string,bookingId:number) {
    const idempotencyKey = await prismaClient.idempotencyKey.create({
        data:{
            idemKey: key,
            booking:{
                connect:{
                    id:bookingId
                }
            }
        }
    });
    return idempotencyKey;
}

export async function getIdempotencyKeyWithLock(key:string,tx:Prisma.TransactionClient) {
    
    if(!isValidUUID(key)){
        throw new BadRequestError('invalid idemotency key');
    }
    const idempotencyKey:Array<IdempotencyKey> = await tx.$queryRaw`
        select * from idempotencyKey where idemkey = ${key} for update
    `
    if(!idempotencyKey || idempotencyKey.length ==0 ){
        throw new NotFoundError("idempotency key not found")
    }
    return idempotencyKey[0];
}

export async function getBookingId(bookingId:number) {
    const booking = await prismaClient.idempotencyKey.findUnique({
        where:{
            id:bookingId
        }
    })
    return booking;
}

export async function confirmBooking(tx:Prisma.TransactionClient,bookingId:number) {
    const booking = await tx.booking.update({
        where:{
            id:bookingId
        },
        data:{
            status:"CONFIRMED"
        }
    })
    return booking;
}

export async function cancelBooking(bookingId:number) {
    const booking = await prismaClient.booking.update({
        where:{
            id:bookingId
        },
        data:{
            status:"CANCELLED"
        }
    })
    return booking;
}
export async function finalizeIdempotencyKey(tx:Prisma.TransactionClient,key:string){
    const idempotencyKey  =  await tx.idempotencyKey.update({
        where:{
            idemKey:key
        },
        data:{
            finalized:true
        }
    })
    return idempotencyKey;
}


