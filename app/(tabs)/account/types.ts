export type AccountMenuItem = {
    id: string;
    title: string;
    icon: string;
    screen?: string;
    action?: () => void;
  };