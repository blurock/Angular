export interface NavItem {
  displayName: string;
  disabled?: boolean;
  value?: any;
  children?: NavItem[];
}
