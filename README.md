# Enyo Solutions Code Test by Alex Paris
This is the code test of Enyo Solutions made by Alex Paris.

**Node** v20.10.0
**Npm** v8.18.0
Path `http://localhost:3333/`

## Instructions
1. Install (or use an existing one) MySQL and insert it url to the .env var_ 'DATABASE_URL' (you don't need to worry about the database) \
OR you can use the command `docker-compose up -d database`
2. Execute the command `npm install`
3. Execute the command `npm run migrate` and wait for the migration process to complete
4. Run the following command `npm run dev`. \


### Use of Jest
1. I'd let on .env file a commented 'DATABASE_URL' for Jest purposes. Set the right URL for it, a new db name and uncomment it
2. Execute the command `npm run migrate` to create database structure
3. Execute the command `npm run test` \
_**(Important)** Since the controller doesn't have to validate anything, all tests (in this case, of corse) are made on Repository. Prisma by itself create or update the data, avoiding duplications. The best way, however, is more complex and we would need to break Controller processes to Services. (like i did in a project template I made:_ https://github.com/Alex-Paris/template_server _)._

## Commands
`npm run dev`: to execute the API \
`npm run migrate`: create/update database to the latest version \
`npm run studio`: to open prisma studio. (Don't forget to change 'DATABASE_URL' to the right path)

## Packages
**Typing**: _Typescript, ESlint and @paristech/eslint-config._ \
**Database**: _Prisma and MySQL._ \
**Test**: _Jest._ \
**Others**: _Docker and Docker-Compose._

### Coding Test (sent by Nima)
>Create a nodejs express application that will import articles from a news website and store them in a mysql database. And then the articles should be available in another endpoint.
>- Provide an endpoint called /api/import
>- When this endpoint is called via the POST method, the node application will connect to https://www.lemonde.fr/rss/une.xml
>-- Download the file,
>-- Save all articles in a database. The raw content will be stored in the import table, and each item will be stored in the item table (one item per row in the bdd).
>Provide an endpoint that displays the articles in the databases. /api/articles. a json return will suffice.

>The database structure will be as follows:
>table importations : Table containing the history of all import requests.
>id INT automatic incrementation
>date_importation DATETIME
>rawContent TEXT => imported data (JSON)
>Table Items (list of all items) :
>id int automatic incrementation
>externalId : VARCHAR(500)
>importDate DATETIME
>title : TEXT
>description : TEXT
>date_de_publicationDATETIME
>description TEXT
>link TEXT
>MainPicture TEXT

>Please note that articles must not be imported twice. If the article already exists, don't create a new one, but update the existing one. You should be able to use the Guid as an externalid to identify duplicates..

>Warning:
>functional nodejs code
>SQL script for database and table creation.
>Explanation of how to check that everything works
