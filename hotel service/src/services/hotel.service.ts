import { createHotelDTO } from "../dto/hotel.dto";
import { createHotel, getAllHotels, getHotelById, softDeleteHotel, updateHotel } from "../repository/hotel.repository";

export async function createHotelService(hotelData:createHotelDTO){
    const hotel = await createHotel(hotelData);
    return hotel;
}

export async function getHotelByIdService(id:number) {
    const hotel = await getHotelById(id);
    return hotel;
}

export async function getAllHotelsService(){
    const hotel = await getAllHotels();
    return hotel;
}

export async function deleteHotelByIdService(id:number){
    const hotel = await softDeleteHotel(id);
    return hotel;
}

export async function updateHotelService(id:number, hotelData:createHotelDTO) {
    const hotel = await updateHotel(id,hotelData);
    return hotel;
}