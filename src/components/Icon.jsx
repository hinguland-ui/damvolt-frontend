import {
  Activity,
  Anvil,
  BadgeCheck,
  Bot,
  Building2,
  Cable,
  Car,
  Clock,
  Cpu,
  Factory,
  FlaskConical,
  Gauge,
  Headset,
  IndianRupee,
  LayoutPanelTop,
  PlugZap,
  ShieldCheck,
  Sun,
  Warehouse,
  Wind,
  Workflow,
  Wrench,
  Zap,
} from 'lucide-react'

// Icons referenced by name from the data files.
const map = {
  Activity,
  Anvil,
  BadgeCheck,
  Bot,
  Building2,
  Cable,
  Car,
  Clock,
  Cpu,
  Factory,
  FlaskConical,
  Gauge,
  Headset,
  IndianRupee,
  LayoutPanelTop,
  PlugZap,
  ShieldCheck,
  Sun,
  Warehouse,
  Wind,
  Workflow,
  Wrench,
  Zap,
}

export default function Icon({ name, size = 22, ...rest }) {
  const C = map[name] || Zap
  return <C size={size} strokeWidth={2} {...rest} />
}
