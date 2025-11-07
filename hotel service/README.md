# This project is designed to help users manage their tasks efficiently.

1.  to install sequelize orm
    npm i sequelize
2. need a driver package to run orm
    npm i mysql2

3. need to run sequelize in command line interface
    npm i -D sequelize-cli


3.b need to create .sequelizerc file with paths of the folders
    const path = require('path');

module.exports = {
    seedersPath:path.resolve('./src/db/seeders'),
    modelsPath:path.resolve('./src/db/models'),
    migrationsPath:path.resolve('./src/db/migrations'),
    config:path.resolve('./src/config/config.js')
}


4. need to setup sequelize
    npx sequelize-cli init

5. create the migrations table
    npx sequelize-cli db:migrate --name create-hotel-table

6. run the migrations file
     npx sequelize-cli db:migrate


7. revert back to the previous migration
    npx sequelize-cli db:migrate:undo





api flow

1. router -> hotel.router.ts
2. validation -> hotel.validator.ts
3. controller -> handler -> hotel.controller.ts
4. service -> hotel.service.ts
5. repository -> hotel.repository.ts
6. models -> hotel.ts



async flow
setup redis
controller-> producer -> job -> worker/consumer -> service

1. create redis config file
2. create a queue , connect it with redis
3. create a producer, get the payload and add it to the queue
4. create a processor, get the payload and pass it to the service 