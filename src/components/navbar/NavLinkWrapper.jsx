import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";


export function NavLinkWrapper({ href, children }) {
  return (
      <NavigationMenuLink
        href={href}
        className={cn(
          navigationMenuTriggerStyle(),
          "hover:text-[#01aa90] focus:text-[#01aa90]"
        )}
      >
        {children}
      </NavigationMenuLink>
  );
}
