import React from "react";
import ReactDOM from "react-dom";
import { createServer, Model } from "miragejs";
import App from './App';


createServer({
  models:{
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Salary",
          type: 'deposit',
          category: 'Job',
          amount: 10000,
          createAt: new Date(),
        },
        {
          id: 2,
          title: "Rent",
          type: 'withdraw',
          category: 'Apartment',
          amount: 1100,
          createAt: new Date(),
        }
      ]
    })
  },
  
  routes(){
    this.namespace = "api";

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data);
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


