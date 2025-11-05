import { createHotelDTO } from "../dto/hotel.dto";
import { HotelRepository } from "../repository/hotel.repository";


const hotelRepository  = new HotelRepository()


export async function createHotelService(hotelData:createHotelDTO){
    const hotel = await hotelRepository.create(hotelData);
    return hotel;
}

export async function getHotelByIdService(id:number) {
    const hotel = await hotelRepository.findById(id);
    return hotel;
}

export async function getAllHotelsService(){
    const hotel = await hotelRepository.findAll();
    return hotel;
}

export async function deleteHotelByIdService(id:number){
    const hotel = await hotelRepository.softDelete(id);
    return hotel;
}

export async function updateHotelService(id:number, hotelData:createHotelDTO) {
    const hotel = await hotelRepository.update(id,hotelData);
    return hotel;
}