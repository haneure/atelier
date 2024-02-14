This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies with
```bash
npm install
# or
yarn install
```

## ngrok
To make development easier, I use ngrok to establish ingress for the application. This way, I don't have to buy a domain and publish it to a server for having an external party to access my application.
1. Make ngrok account https://ngrok.com/
2. Go to the dashboard and get your domain here https://dashboard.ngrok.com/cloud-edge/domains
3. Install ngrok on your system, follow the instructions shown at https://dashboard.ngrok.com/get-started/setup
4. Serve your application, and run ngrok with your domain name and port where the application is running (usually at port 3000)
```bash
npm run dev
ngrok http --domain=<domain_name> <PORT>
```
## Environment variables

We need to prepare some services to make things up and running. Create a new .env using the values inside .env.example
```
cp .env.example .env
```

### Clerk
For the Authentication, I use Clerk. We're going to need the Clerk API Key to make our Sign Up and Sign In page works. Clerk works out of the box and even provides the Sign In and Sign Out form for us. So we can just start making our application instantly without worrying about authentication, sessions, etc.

1. Register for an account at https://clerk.com/
2. Go to the dashboard, and create a new application. https://dashboard.clerk.com/apps/new
On the create new application page, Enter your application name, you can also choose different Sign in options, you may choose any options that you want.
3. In your application dashboard, go to Developers > API Keys and use copy the value to your .env. You should find these value there.
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```
4. Next is the webhooks, go to the Webhooks menu and Add an Endpoint, the endpoint url is the ngrok domain that we created earlier and don't forget to add `/api/webhooks/clerk` to the endpoint.
```
https://<ngrok_domain>/api/webhooks/clerk
```
On the Message Filtering menu you can choose user, since we only need webhooks when an user is created, to synchronize the data to our Database.
![Clerk](./public/readme/readme_clerk_webhook.png)

After that, go to the endpoint that you just created and you should find the `Signing Secret` there. Copy the value for our `CLERK_WEBHOOK_SECRET` value
```
CLERK_WEBHOOK_SECRET=
```
![Clerk](./public/readme/readme_clerk_webhook_02.png)


## Livekit
We also need the API Key for Livekit, Livekit is the services that leverage streaming capabilities for our application. It uses RTMP (Real-Time Messaging Protocol) / WHIP protocols for Ingesting streams.
1. Create an account on https://livekit.io and go to the settings. 

2. Choose `add a new key`, you can fill the description if you want. Now, you should get the values for the `API_KEY`, `API_SECRET` and `WEBSOCKET_URL`. For the URL and Websocket URL, the rest of the path is the same, you just need to change `wss://` for the websocket and to `https://` for the normal url. Just like this:
```
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
LIVEKIT_API_URL=http://<url>
NEXT_PUBLIC_LIVEKIT_WS_URLwss://<url>
```
![Livekit](./public/readme/readme_livekit.png)

2. Next we want to connect the webhooks. We also use the ngrok domain for this webhook. Fill the `URL` with the ngrok domain with `/api/webhooks/livekit` added, because this is where i set my application `path` to receive the webhooks. Choose the signing api key from the one that created earlier.
```
https://<ngrok_domain>/api/webhooks/livekit
```
![Livekit](./public/readme/readme_livekit_webhooks.png)

## MySQL
 I use Mysql for the database. There are many options for this, you can use an online MySQL server, or just use your local server. But if you don't have MySQL installed yet on your system, you may want consider using `docker`. Docker can run a container in our system, in this case a MySQL server. And our host machine can communicate and connect to the container easily.

1. This command will pull mysql image from docker hub and start the container on your system.
 ```
docker run -d --name mysql -e MYSQL_ROOT_PASSWORD=12345678 -p 3306:3306 mysql:latest
 ```
This way, you can have MySQL server up and running, and you can just connect to it easily.

2. Create the database by going into the docker container shell
```
docker exec -it mysql bash
```
3. Connect to mysql inside the container
```
mysql -u root -p
```
4. Create the database
```
CREATE DATABASE your_database;
```

Don't forget to change the value for your `DATABASE_URL` connection
```
DATABASE_URL="mysql://root:12345678@localhost:3306/<database_name>"
```

## Prisma
After the database have been connected succesfully, we now can push the Prisma schema to the database.
```bash
npx prisma db push
```
This command will sync your database with the Prisma schema. And if the synchronization is successful, you can run this command to check.
```bash
npx prisma studio
```
![Prisma](./public/readme/readme_prisma.png)


## Uploadthing
And for the last service, I'm using Uploadthing for the online file storage.
1. First, create an account at https://uploadthing.com
2. Go to the dashboard and look at API Keys.
3. Copy the value to your `.env` file
```
UPLOADTHING_SECRET=sk_live_••••••••••••••••••••••••••••••••••••••••••
UPLOADTHING_APP_ID=•••••••••••••••••
```

And now you're done! Great great job!

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Live Streaming
For live streaming, you may use OBS or any live streaming platform that you prefer. After the application is up and running, create a new account using any options you like. After signing up, the application will also create a `Stream` data connected to your account and your name should shows in the application homepage. To start streaming on your own application, you can follow these steps:
1. Go to the dashboard menu
![Livestream](./public/readme/readme_livestream.png)

2. Go to Keys and click the Generate connection. This will shows your `Server URL` and the `Stream Key`
![Livestream](./public/readme/readme_livestream_02.png)

3. Open your streaming application (In this tutorial I'm using OBS) and open the `settings > Stream`. Fill the values with the `Server URL` and `Stream Key` accordingly, as shown in this screenshot
![Livestream](./public/readme/readme_livestream_03.png)

4. Congratulations you now have your own streaming platform! Invite your friends to watch and chill together!
![Livestream](./public/readme/atelierstream_08.png)

### You can also explore some more features such as
1. Searching users!
2. Block features!
3. Following features!
4. Live chat! You can also disable chat and delay the chat
5. and more!