// Fungsi untuk membuat nomor iterasi
let counter = 1;

function generateNumber() {
  let number = counter.toString().padStart(2, "0");
  counter++;
  return number;
}

// Fungsi untuk menggabungkan prefix dan nomor iterasi
function generateInvoiceNumber() {
  let number = generateNumber();
  return number;
}

module.exports = generateInvoiceNumber;
