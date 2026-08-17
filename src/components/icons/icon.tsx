import { FaBookmark, FaPlay } from "react-icons/fa";
import {
  FiArrowRight,
  FiCheck,
  FiEye,
  FiHeart,
  FiMenu,
  FiSearch,
  FiShare2,
  FiUser,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";
import { HiOutlineChartBar } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

type IconName =
  | "arrow"
  | "bookmark"
  | "chart"
  | "check"
  | "close"
  | "eye"
  | "heart"
  | "menu"
  | "play"
  | "search"
  | "share"
  | "user"
  | "volume"
  | "volumeMute";

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
};

const icons: Record<
  IconName,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  arrow: FiArrowRight,
  bookmark: FaBookmark,
  chart: HiOutlineChartBar,
  check: FiCheck,
  close: IoClose,
  eye: FiEye,
  heart: FiHeart,
  menu: FiMenu,
  play: FaPlay,
  search: FiSearch,
  share: FiShare2,
  user: FiUser,
  volume: FiVolume2,
  volumeMute: FiVolumeX,
};

export function Icon({ name, size = 20, className }: IconProps) {
  const IconComponent = icons[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} size={size} />;
}
