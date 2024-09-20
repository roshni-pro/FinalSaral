export interface ShippingAddressInput {
    ShippingAddress: string;
    CustomerId: number;
    CustomerAddressId: number | null;
    AddressLat: number | null;
    AddressLng: number | null;
    AddressPlaceId: string;
    AddressText: string;
    AreaLat: number | null;
    AreaLng: number | null;
    AreaPlaceId: string;
    AreaText: string;
    ZipCode: number | null;
    AddressLineTwo: string;
    AddressLineOne: string;
    CityName: string;
    CityPlaceId: string;
}