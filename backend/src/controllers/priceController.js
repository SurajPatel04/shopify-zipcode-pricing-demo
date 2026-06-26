import { getPrice } from "../services/priceService.js";

function checkPrice(req, res) {
    try {
        const { zipCode, productId } = req.body;

        const result = getPrice({
            zipCode,
            productId,
        });

        return res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

export {
    checkPrice,
};