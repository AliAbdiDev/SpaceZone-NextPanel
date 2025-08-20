/**
 * Calculates the discount percentage based on the original and final prices.
 *
 * @param {number} originalPrice The original price of the item.
 * @param {number} finalPrice The final price of the item after discount.
 * @returns {number|null} The discount percentage, or null if no discount is applied.
 */
export const calculateDiscount = (originalPrice, finalPrice) => {
  if (!originalPrice || !finalPrice || originalPrice <= finalPrice) return null;
  const discount = ((originalPrice - finalPrice) / originalPrice) * 100;
  return Math.round(discount);
};
