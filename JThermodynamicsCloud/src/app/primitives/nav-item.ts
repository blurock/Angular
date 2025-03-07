export interface NavItem {
  displayName: string;
  disabled?: boolean;
  value?: string;
  children?: NavItem[];
}
