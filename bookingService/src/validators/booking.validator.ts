import {z} from 'zod';

export const createBookingSchema = z.object({
    userId:z.number({message:"User ID must be present"}),
    hotelId:z.number({message:"Hotel ID must be present"}),
    totalGuests:z.number({message:"Total guests must be present"}).min(1,{message:"total guests have to be minimum 1"}),
    bookingAmount:z.number({message:"Booking amount must be present"}).min(1,{message:"BookingAmount have to be mim 1"})
})

