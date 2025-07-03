import express from 'express';
import { serverConfig } from './config';
import v1Router from './routers/v1/index.router';
import v2Router from './routers/v2/index.router';
import { appErrorHandler, genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import { setupMailerWorker } from './processors/email.processor';
import { renderMailTemplate } from './templates/templates.handler';
const app = express();

app.use(express.json());

/**
 * Registering all the routers and their corresponding routes with out app server object.
 */

app.use(attachCorrelationIdMiddleware);
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router); 


/**
 * Add the error handler middleware
 */

app.use(appErrorHandler);
app.use(genericErrorHandler);


app.listen(serverConfig.PORT, async () => {
    logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
    logger.info(`Press Ctrl+C to stop the server.`);
    setupMailerWorker();
    logger.info("mailer worker setup completed")

    // const sampleNotification:NotificationDTO = {
    //     to:"Sample",
    //     subject:"Sample email",
    //     tempplateId:"sample-template",
    //     params:{
    //         name:"John Doe",
    //         orderId:"1234"
    //     }
    // }

    // addEmailToQueue(sampleNotification)

    const response = await renderMailTemplate('welcome',{
        name:'John Doe',
        appName:"Booking.com"
    })

    console.log(`Rendered email template: ${response}`)


});
