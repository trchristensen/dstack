export const SITE_NAME = "stackd"

export const NAV_ITEMS: Array<NavItem> = [
  {
    href: "/",
    label: "Home",
    subLabel: "subLabel",
  },
  {
    href: "/questions",
    label: "Questions",
    subLabel: "subLabel",
  },
  {
    href: "/tags",
    label: "Tags",
    subLabel: "subLabel",
  },
  {
    href: "/users",
    label: "Users",
    subLabel: "subLabel",
  },
  {
    href: "/questions/unanswered",
    label: "Unanswered",
    subLabel: "subLabel",
  },
];

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}