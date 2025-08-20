import { Button } from '@/core/components/shadcn/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/core/components/shadcn/ui/navigation-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/core/components/shadcn/ui/popover';
import { naviagtionHeader } from '@/core/features/main/assets/types/header';

export function MobileMenu({ navigationLinks }: { navigationLinks: naviagtionHeader[] }) {
  return (
    <div className="flex items-center md:hidden">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="group size-10" variant="ghost" size="icon">
            <svg
              style={{ width: '1.3rem', height: '1.3rem' }}
              className="pointer-events-none"
              width={18}
              height={18}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 12L20 12"
                className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
              />
              <path
                d="M4 12H20"
                className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
              />
              <path
                d="M4 12H20"
                className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
              />
            </svg>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-36 p-1 md:hidden">
          <NavigationMenu className="max-w-none *:w-full">
            <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
              {navigationLinks?.map((link, index) => {
                if (link?.disabled) return;
                return (
                  <NavigationMenuItem key={index} className="w-full cursor-pointer text-end">
                    <NavigationMenuLink href={link?.href} className="py-1.5" active={link.active} {...link?.propertys}>
                      {link?.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </PopoverContent>
      </Popover>
    </div>
  );
}
