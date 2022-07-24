## install npm

```
npm i --save-dev prisma typescript ts-node @types/node nodemon dotenv ejs
```

## Install Prisma client
```
npm install express @prisma/client
```

## Init Prisma

```
npx prisma init --datasource-provider mysql
```

## Migration

```
npx prisma migrate dev --name <migration name>
```

## Generate Prisma client whenever there is a new migration
```
npx prisma generate
```