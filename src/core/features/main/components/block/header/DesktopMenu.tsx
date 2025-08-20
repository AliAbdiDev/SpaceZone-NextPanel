import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/core/components/shadcn/ui/navigation-menu';
import { naviagtionHeader } from '@/core/features/main/assets/types/header';

export function DesktopMenu({ navigationLinks }: { navigationLinks: naviagtionHeader[] }) {
  return (
    <NavigationMenu className="h-full *:h-full max-md:hidden min-w-50">
      <NavigationMenuList className="h-full gap-2 ">
        {navigationLinks?.map((link, index) => {
          if (link?.disabled) return;

          return (
            <NavigationMenuItem key={index} className="h-full">
              <NavigationMenuLink
                active={link.active}
                href={link.href}
                className="text-muted-foreground hover:text-primary border-b-primary hover:border-b-primary data-[active]:border-b-primary h-full  rounded-none border-y-2 border-transparent py-1.5 font-medium hover:bg-transparent data-[active]:bg-transparent!"
              >
                {link.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
