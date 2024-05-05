# Instafarm
An ecommerce for farmers + integrated payment gateway

## Getting Started

1. Clone the Repository

   ```
      git clone <github-url>
   ```
3. Set up the Client (Next.js)
   
   ```
      cd client
      npm i
   ```
5. Set up the Server (Node.js + Express)
   
   ```
      cd server
      npm i
   ```
 - Populate DB with product data

    ```
        node populateDB.js
    ```

7. Setting Up environment variable
 
 - For client, .env.local
   ```
    NEXT_PUBLIC_BACKEND_URL= <backend-url>
   ```
   
 - For server, .env

   ```
    MONGODB_URL= <database-url>
    TOKEN_SECRET= <jwt-secret>
    ALLOWED_ORIGINS= <frontend-url>
    CASHFREE_APP_ID= <cashfree-pg-id>
    CASHFREE_SECRET_KEY= <cashfree-pg-secret-key>
   ``` 
   
9. Running the Client and Server

- Start the Next.js development server:
  
   ```
     npm run dev
   ```
- Start the Node.js server:

    ```
     npm run dev
   ```


## Project Structure

- `client/`: Contains the Next.js client application.
- `server/`: Contains the Node.js + Express server application.



# OUTPUT

### HOMEPAGE

LIGHTMODE
![image](https://github.com/void-hr/sense_assign/assets/89070559/2cc7ebd1-a8af-4353-b900-3a6e4634abc4)

DARK MODE
![image](https://github.com/void-hr/sense_assign/assets/89070559/10b7bdf4-372b-40d0-bfa4-6190beb28053)

### REGISTER PAGE

![image](https://github.com/void-hr/sense_assign/assets/89070559/43fc7067-a452-4205-bfac-212107e4ac70)


### LOGIN PAGE

![image](https://github.com/void-hr/sense_assign/assets/89070559/8c4fb375-06fb-481c-8f49-cfcfc3273ca1)


### ADD CREDITS

![image](https://github.com/void-hr/sense_assign/assets/89070559/d6291a7e-9fa8-449c-99f2-d1ac4c0ba530)










