import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

import { internal } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/clerk",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const payloadString = await request.text();
    const headerPayload = request.headers;

    try {
      const result = await ctx.runAction(internal.clerk.fulfill, {
        payload: payloadString,
        headers: {
          "svix-id": headerPayload.get("svix-id")!,
          "svix-timestamp": headerPayload.get("svix-timestamp")!,
          "svix-signature": headerPayload.get("svix-signature")!,
        },
      });

      switch (result.type) {
        case "user.created":
          await ctx.runMutation(internal.users.createUser, {
            name: `${result.data.first_name ?? ""} ${
              result.data.last_name ?? ""
            }`,
            userName: `${result.data.username ?? ""}`,
            tokenIdentifier: result.data.id,
            image: result.data.image_url,
            email: result.data.email_addresses[0].email_address,
            role: "user",
          });
          break;

        case "user.updated":
          await ctx.runMutation(internal.users.updateUser, {
            name: `${result.data.first_name ?? ""} ${
              result.data.last_name ?? ""
            }`,
            userName: `${result.data.username ?? ""}`,
            tokenIdentifier: result.data.id,
            image: result.data.image_url,
            email: result.data.email_addresses[0].email_address,
            role: result.data.public_metadata.role as string,
          });
          break;
      }

      return new Response(null, {
        status: 200,
      });
    } catch (err) {
      return new Response("Webhook Error", {
        status: 400,
      });
    }
  }),
});

export default http;
