import { Job, Worker } from "bullmq";
import { NotificationDTO } from "../dto/notification.dto";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import { getRedisConnObject } from "../config/redis.config";

export const setupMailerWorker = () =>{
 const emailProcessor = new Worker<NotificationDTO>(
        MAILER_QUEUE, // Name of the queue
        async (job: Job) => {

            if(job.name !== MAILER_PAYLOAD) {
                throw new Error("Invalid job name");
            }

            const payload = job.data;
            console.log(`Processing email for ${JSON.stringify(payload)}`)
          

        }, // Process function
        {
            connection: getRedisConnObject()
        }
    )

emailProcessor.on("failed",()=>{
    console.error("email processing failed")
})


emailProcessor.on("completed", ()=>{
    console.log("email processing completed")
})


}

  