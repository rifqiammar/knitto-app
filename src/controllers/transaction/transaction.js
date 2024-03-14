const { getUserBalance, paymentBalance, topUp, setTransaction, setTransactionPayment, getUserOneTransaction, getHistory } = require("../../models/transaction.js");
const generateInvoiceNumber = require("../../helper/generateNumber");
const { getOneService } = require("../../models/information.js");

const getBalance = async (req, res) => {
  try {
    const decEmail = req.email;

    // Send to Database
    const result = await getUserBalance(decEmail);

    res.status(200).json({
      status: 0,
      message: "Get Balance Berhasil",
      data: result[0].balance,
    });
  } catch (error) {
    res.status(400).json({
      status: 102,
      message: error.message,
      data: null,
    });
  }
};

const setTopup = async (req, res) => {
  try {
    const decEmail = req.email;
    const top_up_amount = +req.body.top_up_amount;
    // Send to Database
    const result = await topUp(decEmail, top_up_amount);
    if (top_up_amount === undefined) throw new Error("Amount tidak boleh kosong");

    // Date
    let date = new Date();
    let month = (date.getMonth() + 1).toString(); // Perlu ditambah 1 karena indeks bulan dimulai dari 0
    month = month.padStart(2, "0");
    let year = date.getFullYear().toString();
    const day = date.getDay().toString();
    date = day + month + year;

    const invoice = `INV${date}-${generateInvoiceNumber()}`;

    await setTransaction(invoice, top_up_amount, decEmail);

    res.status(200).json({
      status: 0,
      message: "Top Up Balance Berhasil",
      data: { Balance: result[0].balance },
    });
  } catch (error) {
    res.status(400).json({
      status: 102,
      message: error.message,
      data: null,
    });
  }
};

const setTransactionPaymentBalance = async (req, res) => {
  try {
    const decEmail = req.email;
    const { service_code } = req.body;

    const user = await getUserBalance(decEmail);

    if (user[0].balance <= 0) throw new Error("Maaf saldo/balance anda tidak mencukupi");

    const service = await getOneService(service_code);

    if (service.length <= 0) throw new Error("Service ataus Layanan tidak ditemukan");
    console.log(service[0].service_tariff);

    await paymentBalance(decEmail, service[0].service_tariff);

    // Date
    let date = new Date();
    let month = (date.getMonth() + 1).toString(); // Perlu ditambah 1 karena indeks bulan dimulai dari 0
    month = month.padStart(2, "0");
    let year = date.getFullYear().toString();
    const day = date.getDay().toString();
    date = day + month + year;

    const invoice = `INV${date}-00${generateInvoiceNumber()}`;

    // console.log(result);
    await setTransactionPayment(user[0].user_id, invoice, service[0].service_code, service[0].service_name, service[0].service_tariff, decEmail);
    // const { service_name, transaction_type, total_amount } = result[0];
    const result = await getUserOneTransaction(decEmail);
    console.log(result);

    res.status(200).json({
      status: 0,
      message: "Top Up Balance Berhasil",
      //   data: { invoice, Service_code: service[0].service_code, Service_name: service[0].service_name, transaction_type, total_amount, created_on },
    });
  } catch (error) {
    res.status(400).json({
      status: 102,
      message: error.message,
      data: null,
    });
  }
};

const transactionHistory = async (req, res) => {
  try {
    const decEmail = req.email;
    const { limit, offsite } = req.body;

    // Send to Database
    const result = await getHistory(decEmail, limit, offsite);

    console.log(result);

    res.status(200).json({
      status: 0,
      message: "Get History Berhasil",
      offset,
      limit,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 102,
      message: error.message,
      data: null,
    });
  }
};

module.exports = { getBalance, setTopup, setTransactionPaymentBalance, transactionHistory };
