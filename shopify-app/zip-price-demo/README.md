# ZIP Code Price Checker - Shopify App

This is a custom Shopify application that provides a dynamic storefront widget allowing customers to check product prices based on their ZIP code. It uses a secure Shopify App Proxy architecture to communicate with an external pricing API.

## 🏗 Architecture

To ensure security and prevent Cross-Origin Resource Sharing (CORS) issues, this app uses the **Shopify App Proxy** pattern:

1. **Storefront Widget (Theme App Extension):** A Liquid block (`zip_price_checker.liquid`) renders the input field on the product page. When a user submits a ZIP code, it makes a client-side JavaScript `fetch` request to a relative Shopify proxy URL (`/apps/zip-price/price`).
2. **Shopify App Proxy:** Shopify intercepts this request, cryptographically signs it, and securely forwards it to our app's backend proxy route (`app/routes/proxy.price.ts`).
3. **Backend Validation & Forwarding:** The React Router backend receives the request, uses `@shopify/shopify-app-remix` to validate the cryptographic signature (ensuring the request legitimately originated from a Shopify storefront), and then forwards the data to the external pricing API.
4. **External API:** The external Express backend (e.g., hosted on Vercel) processes the ZIP code, calculates the price, and returns the result back through the chain to the storefront.

## 🚀 Environment Configuration

To run this application locally or deploy it to production, you must configure the following environment variables in your `.env` file (and in your deployment platform like Vercel):

```env
# Required Shopify Variables
SHOPIFY_API_KEY="your_shopify_api_key"
SHOPIFY_API_SECRET="your_shopify_api_secret"
SHOPIFY_APP_URL="https://your-app-url.vercel.app"
SCOPES="write_products,write_metaobjects"

# Database (For Prisma Session Storage)
DATABASE_URL="your_database_connection_string"

# External Pricing Backend API
BACKEND_API_URL="https://shopify-zipcode-pricing-demo-wj6w.vercel.app"
```

## 🛠 Setup & Local Development

1. **Install Dependencies:**
   ```shell
   npm install
   ```

2. **Database Setup:**
   Run the Prisma setup script to initialize the SQLite/PostgreSQL database for session storage:
   ```shell
   npm run setup
   ```

3. **Start Development Server:**
   ```shell
   shopify app dev
   ```
   *Note: Shopify CLI will automatically sync your `shopify.app.toml` configuration (including the app proxy settings) with your Partner Dashboard.*

## 📦 Deployment (Vercel)

When deploying to Vercel:
1. Ensure all environment variables listed above are added to your Vercel Project Settings.
2. Update `shopify.app.toml` to replace all `https://example.com` placeholder URLs with your actual Vercel production URL.
3. Run `shopify app deploy` to push the updated TOML configuration and Theme App Extension to Shopify.
