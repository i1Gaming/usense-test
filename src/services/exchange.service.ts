import axios from "axios";
import { ExchangeRate } from "../app.interface";

class ExchangeService {
    async getAll() {
        return axios
        .get<ExchangeRate[]>('/NBU_Exchange/exchange?json')
        .then(response => response.data.map(item => ({
            CurrencyCodeL: item.CurrencyCodeL,
            Units: item.Units,
            Amount: item.Amount
          })))
    }
}

const exchangeService = new ExchangeService();

export default exchangeService;