import { Job, Worker } from "bullmq";
import { NotificationDTO } from "../dto/notification.dto";
import { MAILER_QUEUE } from "../queues/mailer.queue";
import { MAILER_PAYLOAD } from "../producers/email.producer";
import { getRedisConnObject } from "../config/redis.config";
import { renderMailTemplate } from "../templates/templates.handler";
//import { sendEmail } from "../service/mailer.service";
import logger from "../config/logger.config";



export const setupMailerWorker = () =>{
 const emailProcessor = new Worker<NotificationDTO>(
        MAILER_QUEUE, // Name of the queue
        async (job: Job) => {

            if(job.name !== MAILER_PAYLOAD) {
                throw new Error("Invalid job name");
            }

            const payload = job.data;
           console.log(payload.tempplateId)
            console.log(`Processing email for ${JSON.stringify(payload)}`)

             await renderMailTemplate(payload.tempplateId,payload.params);

            // await sendEmail(payload.to,payload.subject,emailContent);
            
             logger.info(`Email sent to ${payload.to} with subject  ${payload.subject}`);

        }, // Process function
        {
            connection: getRedisConnObject()
        }
    )

emailProcessor.on("failed", (job, err) => {
  logger.error(`Job ${job?.id} failed with error: ${err?.message}`, {
    stack: err?.stack,
    jobData: job?.data,
  });
});



emailProcessor.on("completed", ()=>{
    console.log("email processing completed")
})


}

  