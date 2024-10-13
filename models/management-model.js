const pool = require("../database/index");

/* *****************************
 *   Register new account
 * *************************** */
async function registerAccount(classification_name) {
  try {
    const sql =
      "INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING *";
    return await pool.query(sql, [classification_name]);
  } catch (error) {
    return error.message;
  }
}

/* *****************************
 *   Register new car
 * *************************** */
async function registerNewCar(
  inv_make,
  inv_model,
  inv_year,
  inv_description,
  inv_image,
  inv_thumnail,
  inv_price,
  inv_miles,
  inv_color,
  classification_id
) {
  try {
    const sql =
      "INSERT INTO public.inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumnail, inv_price, inv_miles, inv_color, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *";
    const result = await pool.query(sql, [
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Error registering new car:", error.message);
    return null;
  }
}

module.exports = { registerAccount, registerNewCar };