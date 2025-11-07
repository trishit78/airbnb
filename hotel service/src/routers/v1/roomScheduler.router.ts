import { Router } from "express";
import {
    startSchedulerHandler,
    stopSchedulerHandler,
    getSchedulerStatusHandler,
    manualExtendAvailabilityHandler
} from "../../controllers/roomScheduler.controller";

const roomSchedulerRouter = Router();


roomSchedulerRouter.post("/start", startSchedulerHandler);

roomSchedulerRouter.post("/stop", stopSchedulerHandler);

roomSchedulerRouter.get("/status", getSchedulerStatusHandler);
roomSchedulerRouter.post("/extend", manualExtendAvailabilityHandler);

export default roomSchedulerRouter; 