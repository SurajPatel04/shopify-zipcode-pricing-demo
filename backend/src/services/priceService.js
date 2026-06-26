import { findPriceByZip } from "../models/priceModel.js";

function getPrice({ zipCode, productId }) {
    if (!zipCode) {
        throw new Error("zipCode is required");
    }

    if (!/^\d{5}$/.test(zipCode)) {
        throw new Error("Invalid ZIP code");
    }

    const price = findPriceByZip(zipCode);

    return {
        productId: productId ?? null,
        zipCode,
        price,
    };
}

export { getPrice };