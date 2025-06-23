import { NextFunction, Request, Response } from "express";
import { createHotelService,  deleteHotelByIdService,  getAllHotelsService,  getHotelByIdService, updateHotelService } from "../services/hotel.service";
import { StatusCodes } from "http-status-codes";

export async function createHotelHandler(req:Request, res:Response, next:NextFunction) {
    // call the service layer
    const hotelResponse = await createHotelService(req.body);

    // send the response
    res.status(StatusCodes.CREATED).json({
        message:"Hotel created successfully",
        data:hotelResponse,
        success:true,
    })
}

export async function getHotelByIdHandler(req:Request,res:Response,next:NextFunction) {
    // call the service layer
    const hotelResponse = await getHotelByIdService(Number(req.params.id));

    // send the response
    res.status(StatusCodes.OK).json({
        message:"Hotel found successfully",
        data:hotelResponse,
        success:true
    })
}

export async function getAllHotelsHandler(req:Request,res:Response,next:NextFunction) {
    //call the service layer
    const hotelsResponse = await getAllHotelsService();

    res.status(200).json({
        message:"all hotels found successfully",
        data:hotelsResponse,
        success:true
    })
}

export async function deleteHotelHandler(req:Request,res:Response,next:NextFunction) {
    const hotel = await deleteHotelByIdService(Number(req.params.id));
    res.status(200).json({
        message:"delete a hotel by id",
        data:hotel,
        success:true
    });
}

export async function updateHotelHandler(req:Request,res:Response,next:NextFunction) {
    
    const hotelData = req.body;

    const hotel= await updateHotelService(Number(req.params.id),hotelData);
    res.status(200).json({
        message:"updated hotel on a id",
        data:hotel,
        success:true
    })
}