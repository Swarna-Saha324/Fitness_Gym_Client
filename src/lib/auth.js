import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(process.env.AUTH_DATABASE );

export const auth = betterAuth({
  
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),

 


    emailAndPassword: { 
    enabled: true, 
  }, 

  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID ,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET 
        }, 
    },

   user: {
    // Optional: if you don't provide a schema, the default schema will be used.
    additionalFields: {
      role: {
        type: String,
        default: "member",
      },

      isBlocked: {
        type: Boolean,
        default: false,
      }
    }
  }

});