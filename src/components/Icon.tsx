import {
  BarChart3, Briefcase, CalendarCheck, Factory, Globe2, Handshake, HardHat, Mail, Network, Package,
  Search, ShieldCheck, Ship, Store, Target, Warehouse, type LucideProps,
} from "lucide-react";

const MAP = {
  target: Target,
  search: Search,
  package: Package,
  chart: BarChart3,
  calendar: CalendarCheck,
  handshake: Handshake,
  ship: Ship,
  network: Network,
  warehouse: Warehouse,
  store: Store,
  hardhat: HardHat,
  briefcase: Briefcase,
  factory: Factory,
  globe: Globe2,
  shield: ShieldCheck,
  mail: Mail,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const C = MAP[name as keyof typeof MAP] ?? Globe2;
  return <C strokeWidth={1.5} aria-hidden {...props} />;
}
