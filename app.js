const serviceSelect = document.getElementById("service");
const orderForm = document.getElementById("orderForm");
const result = document.getElementById("result");

document.querySelectorAll(".choose-service").forEach((button) => {
  button.addEventListener("click", () => {
    serviceSelect.value = button.dataset.service;
    document.getElementById("order").scrollIntoView({ behavior: "smooth", block: "start" });
    serviceSelect.focus({ preventScroll: true });
  });
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(orderForm);
  const name = String(data.get("customerName") || "").trim();
  const mobile = String(data.get("mobile") || "").trim();
  const service = String(data.get("service") || "").trim();

  if (!/^[0-9]{10}$/.test(mobile)) {
    result.hidden = false;
    result.textContent = "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।";
    return;
  }

  result.hidden = false;
  result.textContent = `डेमो सफल: ${name}, आपकी "${service}" सेवा का नमूना अनुरोध तैयार हुआ। यह अभी सर्वर पर सेव नहीं हुआ है और वास्तविक ऑर्डर नंबर नहीं बना है।`;
});

if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
}
