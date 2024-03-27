# Description 

## Run on Dev

1. Clone the repository
2. Create a ``` .env.template ``` copy and remane it to ``` .env ```.Then remane the environment variables
3. Install dependencies ``` npm install ```
4. Build database ```docker compose up -d```
5. Run prisma migrations ```npx prisma migrate dev```
6. Execute seed ``` npm run seed ```
7. Run project ``` npm run dev ```


## Run on production

