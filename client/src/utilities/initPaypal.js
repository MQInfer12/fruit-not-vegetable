export function initPayPalButton(amount, onSuccess = () => {}) {
  paypal
    .Buttons({
      style: {
        shape: "rect",
        color: "gold",
        layout: "vertical",
        label: "paypal",
      },
      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amount,
              },
            },
          ],
        });
      },
      onApprove: function (data, actions) {
        return actions.order.capture().then(function (orderData) {
          onSuccess(orderData);
        });
      },
      onError: function (err) {
        console.log(err);
      },
    })
    .render("#paypal-button-container");
}
