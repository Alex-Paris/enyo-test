# Enyo Solutions Code Test by Alex Paris
This is the code test of Enyo Solutions made by Alex Paris.

## Instructions
Path: `http://localhost:3333/`

### Using Docker Compose (Faster way)
Just run the following command `docker-compose up`. \
_It will create app, new mysql container and create database with the expected schema. They will connect to each other using the host 'database:3306' (that is already configured)_ \
_**(Important)** You can execute prisma studio ('npm run studio') to use it as db admin, but keep in mind that you should adapt .env var_ 'DATABASE_URL' _to the host of mysql in your computer, since 'database:3306' is accessible only between the containers. One way is to execute the API, change database variable, open studio and then put the 'database:3306' back._

### Manually (the sad way D=)
1. Install (or use an existing one) MySQL and insert it url to the .env var_ 'DATABASE_URL' (you don't need to worry about the database)
2. Execute the command `npm install`
3. Execute the command `npm run migrate` and wait for the migration process to complete
4. Execute the command `npm run dev` \
_**(Important)** Since it is local, you don't need to worry about the var_ 'DATABASE_URL' _to execute prisma studio. But remember, you don't need to use it if you don't want to._

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
