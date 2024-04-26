const express = require ('express');
const cors = require('cors');
const request = require('request');

const app = express();
app.use(cors())

const CLIENT = 'AUKr72mzdYzRaAUf7SIdbdzLXY6JK3OUIx3uLKHzd4KilNZ4y5Sngx0maWNCGpi9euFptREQE1eNm3fE';
const SECRET = 'EFrmnnumMnpHrSJUGaV2tFpG13hdWFFxYaTzikgbLgpoDSiarY5KTjaz8ZSpYWd_nELKe2Fgry7pOOx4';
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; //Live 'https://api-m.paypal.com'
const auth = { user: CLIENT, pass: SECRET}

/** Controladores */

const createPayment = (req, res) => {

        const body = {
                intent: 'CAPTURE', //https://api-m.sandbox.paypal.com/v2/checkout/orders [POST]
                purchase_units: [{
                        amount: {
                                currency_code: 'USD',
                                value: 100
                        }
                }],
                application_context: {
                        brand_name: 'NutriScan',
                        landing_page: 'NO_PREFERENCE', //Default, info en https://developer.paypal.com/docs/api
                        user_action: 'PAGAR',
                        return_url: 'https://localhost/3000/execute-payment',
                        cancel_url: 'https://localhost/3000/cancel-payment'
                }

        }

        request.post('${PAYPAL_API}/v2/checkout/orders', {
                auth,
                body,
                json: true
        }, (err, response) => {
                res.json({ data: response.body})
        })
}

const executePayment = (req, res) => {
        const token = req.query.token;
        console.log('${PAYPAL_API}/v2/checkout/orders/${token}/capture');

} 

app.post('/createPayment', createPayment)
app.get('Execute_payment', executePayment)
app.listen( 3000 ) => {
        console.log ('Comenzamos a facturar');
}