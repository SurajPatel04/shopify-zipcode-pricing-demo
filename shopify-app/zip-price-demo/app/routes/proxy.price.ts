import type { ActionFunctionArgs } from "@react-router/node";
import { authenticate } from "../shopify.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  // Authenticate the request comes from Shopify's App Proxy
  const { admin } = await authenticate.public.appProxy(request);

  if (!admin) {
    return Response.json({ success: false, message: "Unauthorized request" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const response = await fetch(`${process.env.BACKEND_API_URL}/api/price`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error proxying request to backend:", error);
    return Response.json(
      { success: false, message: "Failed to fetch price" },
      { status: 500 }
    );
  }
};
