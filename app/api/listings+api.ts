// const API_KEY = process.env.CRYPTO_API_KEY;

// export async function GET(request: any) {
// const ids = request.query.get("ids");
// try {
// const res = await axios.get(
//   "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10&sort=market_cap&sort_dir=desc&convert=USD",
//   {
//     headers: {
//       "X-CMC_PRO_API_KEY": API_KEY,
//     },
//   }
// );
// const result = await res.data.data;
//     return Response.json(CryptoData);
//   } catch (error) {
//     console.log(error);
//     return Response.error();
//   }
// }
