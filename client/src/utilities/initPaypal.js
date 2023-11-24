export function initPayPalButton(amount, onSuccess = () => {}) {
  paypal.Buttons({
    style: {
      shape: 'rect',
      color: 'gold',
      layout: 'vertical',
      label: 'paypal',
    },
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          "amount":{
            "currency_code": "USD",
            "value": amount
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(orderData) {
        onSuccess();
      });
    },
    onError: function(err) {
      console.log(err);
    }
  }).render('#paypal-button-container');
}