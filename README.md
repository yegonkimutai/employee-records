This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, I initialized Next.js app:

```bash
npx create-next-app@latest employee-records
```

I then navigated to the directory and install the required dependencies which include mongoose, next-auth, tailwind and axios.

After that, I set up the tailwind sonfiguration and also establish the MongoDB which is found in the 'lib' folder

Setting up the backend configuration was the next step where I create the User and Employee models in the model folder.

I then went ahead and wrote the functionality for posting and getting of user as well as the CRUD operations that are done to the employees using Next.js as instructed. These functions are located in the src/app/api folder.

After finishing the backend operation, I proceeded to the front end where I creted the UI according to the figma design provided. These files are located under src/app/add, src/app/employee, src/app/login as well as the page.js file.
Above the UI file it starts with the "use client", which informs Next.js that the file should be rendered client side.

I also configured the database uri in the .env.local file under the name MONGODB_URI


Finally, I ran the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Note
The deployed version only shows the signup and login UI as it generates error when one is trying to log in (still working on how to fix it). However, the development version is ready and everything is working perfectly and in accordance to the instructions given.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
