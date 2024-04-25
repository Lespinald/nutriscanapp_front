private void ordersPayment(){
    
            URL url = new URL("https://api-m.sandbox.paypal.com/v2/checkout/orders");
            HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
            httpConn.setRequestMethod("POST");
    
            httpConn.setRequestProperty("Content-Type", "application/json");
            httpConn.setRequestProperty("PayPal-Request-Id", "AUKr72mzdYzRaAUf7SIdbdzLXY6JK3OUIx3uLKHzd4KilNZ4y5Sngx0maWNCGpi9euFptREQE1eNm3fE ");
            httpConn.setRequestProperty("Authorization", "Bearer /* ENTER TOKEN */");
    
            httpConn.setDoOutput(true);
            OutputStreamWriter writer = new OutputStreamWriter(httpConn.getOutputStream());
            writer.write("{ \"intent\": \"CAPTURE\", \"purchase_units\": [ { \"reference_id\": \"d9f80740-38f0-11e8-b467-0ed5f89f718b\", \"amount\": { \"currency_code\": \"USD\", \"value\": \"100.00\" } } ], \"payment_source\": { \"paypal\": { \"experience_context\": { \"payment_method_preference\": \"IMMEDIATE_PAYMENT_REQUIRED\", \"payment_method_selected\": \"PAYPAL\", \"brand_name\": \"EXAMPLE INC\", \"locale\": \"en-US\", \"landing_page\": \"LOGIN\", \"shipping_preference\": \"SET_PROVIDED_ADDRESS\", \"user_action\": \"PAY_NOW\", \"return_url\": \"https://example.com/returnUrl\", \"cancel_url\": \"https://example.com/cancelUrl\" } } } }");
            writer.flush();
            writer.close();
            httpConn.getOutputStream().close();
    
            InputStream responseStream = httpConn.getResponseCode() / 100 == 2
                    ? httpConn.getInputStream()
                    : httpConn.getErrorStream();
            Scanner s = new Scanner(responseStream).useDelimiter("\\A");
            String response = s.hasNext() ? s.next() : "";
            System.out.println(response);
}