import express from 'express';
import { serverConfig } from './config';
import v1Router from './routers/v1/index.router';
// import v2Router from './routers/v2/index.router';
import { appErrorHandler, genericErrorHandler } from './middlewares/error.middleware';
import logger from './config/logger.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import sequelize from './db/models/sequelize';
// import Hotel from './db/models/hotel';
const app = express();

app.use(express.json());

/**
 * Registering all the routers and their corresponding routes with out app server object.
 */

app.use(attachCorrelationIdMiddleware);
app.use('/', v1Router);



/**
 * Add the error handler middleware
 */

app.use(appErrorHandler);
app.use(genericErrorHandler);


app.listen(serverConfig.PORT, async() => {
    logger.info(`Server is running on http://localhost:${serverConfig.PORT}`);
    logger.info(`Press Ctrl+C to stop the server.`);
    await sequelize.authenticate(); // to test the connection of the db
    logger.info("database connection has been established");


{/** here testing the connection and giving the input and fetching the output */}

    // try {
    //     await sequelize.authenticate(); // to test the connection of the db
    //     logger.info("database connection has been established");
    //     const hotel = await  Hotel.create({
    //         name:'Hotel California',
    //         address:'123 marine drive',
    //         location:'LA,CA',
    //         rating:4.5,
    //         ratingCount:20                        
    //     })
    //     logger.info("hotel created successfully:", hotel.toJSON());

    //     const hotel = await Hotel.count();
    //     logger.info("the data fetched from the hotels table is", {hotel});

    // } catch (error) {
    //     logger.error("something went wrong in the db queries");
    // }

});
