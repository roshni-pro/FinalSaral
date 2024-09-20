import { StockConstants } from "./stock-constants";

export class StockHelper {
    public static IsPhysicalStock(stockName: string): boolean {
        if (stockName == StockConstants.CurrentStocks().Value ||
         stockName == StockConstants.FreeStocks().Value || 
         stockName == StockConstants.DamageStocks().Value || 
         stockName == StockConstants.NonSellableStocks().Value || 
         stockName == StockConstants.ClearanceStockNews().Value ||
         stockName == StockConstants.InventoryReserveStocks().Value||
         stockName == StockConstants.NonRevenueStocks().Value
         ) {
            return true;
        } else {
            return false;
        }
    }
}
