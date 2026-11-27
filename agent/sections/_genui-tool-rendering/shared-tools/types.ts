// Demo: showcase/shared/typescript/tools/types.ts — only the `Flight` type used by search-flights.ts.
export interface Flight {
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  origin: string;
  destination: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  status: string;
  statusColor: string;
  price: string;
  currency: string;
}
