import { useQuery } from "@tanstack/react-query";
import { ActiveExchangesValue } from "../app.interface";
import exchangeService from "../services/exchange.service";

export const useExchanges = () => {
    return useQuery<ActiveExchangesValue[]>({
        queryKey: ['exchangeRate'],
        queryFn: () =>
          exchangeService.getAll()
    });
}