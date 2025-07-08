interface AgentAttributes {
  accountId: string;
  symbol: string;
  headquarters: string;
  credits: number;
  startingFaction: string;
}

interface AgentDetailsAttributes {
  accountId: string;
  symbol: string;
  headquarters: string;
  credits: number;
  startingFaction: string;
}

interface ChartAttributes {
  waypointSymbol: string;
  submittedBy: string;
  submittedOn: Date;
}

interface ContractAttributes {
  id: string;
  factionSymbol: string;
  type: string;
  terms: ContractTermsAttributes;
  accepted: boolean;
  fulfilled: boolean;
  expiration: Date;
  deadlineToAccept: Date;
}

interface ContractDeliverGoodAttributes {
  tradeSymbol: string;
  destinalSymbol: string;
  unitsRequired: number;
  unitsFulfilled: number;
}

interface ContractPaymentAttributes {
  onAccepted: number;
  onFulfilled: number;
}

interface ContractTermsAttributes {
  deadline: Date;
  payment: ContractPaymentAttributes;
  deliver: ContractDeliverGoodAttributes[];
}

interface CooldownAttributes {
  shipSymbol: string;
  totalSeconds: number;
  remainingSeconds: number;
  expiration: Date;
}

interface MarketAttributes {
  symbol: string;
  exports: TradeGoodAttributes[];
  imports: TradeGoodAttributes[];
  exchange: TradeGoodAttributes[];
  transactions: MarketTransactionAttributes[];
  tradeGoods: MarketTradeGoodAttributes[];
}

interface MarketTradeGoodAttributes {
  symbol: string;
  tradeVolume: number;
  supply: string;
  purchasePrice: number;
  sellPrice: number;
}

interface MarketTransactionAttributes {
  waypointSymbol: string;
  shipSymbol: string;
  tradeSymbol: string;
  type: string;
  units: number;
  pricePerUnit: number;
  totalPrice: number;
  timestamp: Date;
}

interface ScannedShipAttributes {
  symbol: string;
  registration: ShipRegistrationAttributes;
  nav: ShipNavAttributes;
  frame: SymbolObject;
  reactor: SymbolObject;
  engine: SymbolObject;
  mounts: SymbolObject[];
}

interface ScannedSystemAttributes {
  symbol: string;
  sectorSymbol: string;
  type: string;
  x: number;
  y: number;
  distance: number;
}

interface ScannedWaypointAttributes {
  symbol: string;
  type: string;
  systemSymbol: string;
  x: number;
  y: number;
  orbitals: SymbolObject[];
  faction: SymbolObject;
  traits: WaypointTraitAttributes[];
}

interface ShipAttributes {
  symbol: string;
  registration: ShipRegistrationAttributes;
  nav: ShipNavAttributes;
  crew: ShipCrewAttributes;
  frame: ShipFrameAttributes;
  reactor: ShipReactorAttributes;
  engine: ShipEngineAttributes;
  modules: ShipModuleAttributes[];
  mounts: ShipMountAttributes[];
  cargo: ShipCargoAttributes;
  fuel: ShipFuelAttributes;
}

interface ShipCargoAttributes {
  capacity: number;
  units: number;
  inventory: ShipCargoItemAttributes[];
}

interface ShipCargoItemAttributes {
  symbol: string;
  name: string;
  description: string;
  units: number;
}

interface ShipCrewAttributes {
  current: number;
  required: number;
  capacity: number;
  rotation: string;
  morale: number;
  wages: number;
}

interface ShipEngineAttributes {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  speed: number;
  requirements: ShipRequirementsAttributes;
}

interface ShipFrameAttributes {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  moduleSlots: number;
  mountingPoints: number;
  fuelCapacity: number;
  requirements: ShipRequirementsAttributes;
}

interface ShipFuelAttributes {
  current: number;
  capacity: number;
  consumed: {
    amount: number;
    timestamp: Date;
  };
}

interface ShipModuleAttributes {
  symbol: string;
  capacity: number;
  range: number;
  name: string;
  description: string;
  requirements: ShipRequirementsAttributes;
}

interface ShipMountAttributes {
  symbol: string;
  name: string;
  description: string;
  strength: number;
  deposits: string[];
  requirements: ShipRequirementsAttributes;
}

interface ShipNavAttributes {
  systemSymbol: string;
  waypointSymbol: string;
  route: ShipNavRouteAttributes;
  status: string;
  flightMode: string;
}

interface ShipNavRouteAttributes {
  destination: ShipNavRouteWaypointAttributes;
  departure: ShipNavRouteWaypointAttributes;
  departureTime: Date;
  arrival: Date;
}

interface ShipNavRouteWaypointAttributes {
  symbol: string;
  type: string;
  systemSymbol: string;
  x: number;
  y: number;
}

interface ShipReactorAttributes {
  symbol: string;
  name: string;
  description: string;
  condition: number;
  powerOutput: number;
  requirements: ShipRequirementsAttributes;
}

interface ShipRegistrationAttributes {
  name: string;
  factionSymbol: string;
  role: string;
}

interface ShipRequirementsAttributes {
  crew: number;
  power?: number;
  slots?: number;
}

interface SymbolObject {
  symbol: string;
}

interface SystemAttributes {
  symbol: string;
  sectorSymbol: string;
  type: string;
  x: number;
  y: number;
  waypoints: SystemWaypointAttributes[];
  factions: string[];
}

interface SystemWaypointAttributes {
  symbol: string;
  type: string;
  x: number;
  y: number;
}

interface TradeGoodAttributes {
  symbol: string;
  name: string;
  description: string;
}

interface WaypointAttributes {
  symbol: string;
  type: string;
  systemSymbol: string;
  x: number;
  y: number;
  orbitals: string[];
  faction: SymbolObject;
  traits: SymbolObject[];
  chart: ChartAttributes;
}

interface WaypointTraitAttributes {
  symbol: string;
  name: string;
  description: string;
}
