const PRICE_TABLE = {
    "75028": 1499,
    "10001": 1699,
    "90210": 1799,
};

const DEFAULT_PRICE = 1499;

function findPriceByZip(zipCode) {
    return PRICE_TABLE[zipCode] ?? DEFAULT_PRICE;
}

export {
    findPriceByZip,
};