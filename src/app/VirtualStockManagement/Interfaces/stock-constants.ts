export class StockConstants {

    public Value: string;
    public ShortName: string;
    constructor(value: string) {
        this.Value = value;
    }

    public static CurrentStocks(): StockConstants {
        return new StockConstants("CurrentStocks");
    }
    public static NonSellableStocks(): StockConstants {
        return new StockConstants("NonSellableStocks");
    }
    public static ClearanceStockNews(): StockConstants {
        return new StockConstants("ClearanceStockNews");
    }
    public static DamageStocks(): StockConstants {
        return new StockConstants("DamageStocks");
    }
    public static DeliveredStocks(): StockConstants {
        return new StockConstants("DeliveredStocks");
    }
    public static ExpiredStocks(): StockConstants {
        return new StockConstants("ExpiredStocks");
    }
    public static FreeStocks(): StockConstants {
        return new StockConstants("FreeStocks");
    }
    public static InReceivedStocks(): StockConstants {
        return new StockConstants("InReceivedStocks");
    }
    public static ReservedStocks(): StockConstants {
        return new StockConstants("ReservedStocks");
    }
    public static RTDStocks(): StockConstants {
        return new StockConstants("RTDStocks");
    }
    // public static ClearanceStocks(): StockConstants {
    //     return new StockConstants("ClearanceStocks");
    // }
    public static RTVStocks(): StockConstants {
        return new StockConstants("RTVStocks");
    }
    public static LostAndFoundStocks(): StockConstants {
        return new StockConstants("LostAndFoundStocks");
    }
    public static QuarantineStocks(): StockConstants {
        return new StockConstants("QuarantineStocks");
    }
    public static IssuedStocks(): StockConstants {
        return new StockConstants("IssuedStocks");
    }

    public static InventoryReserveStocks(): StockConstants {
        return new StockConstants("InventoryReserveStocks");
    }
    public static NonRevenueStocks(): StockConstants {
        return new StockConstants("NonRevenueStocks");
    }
}