import { AvatarCustom } from '@/core/components/custom/ui/AvatarCustom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/core/components/shadcn/ui/dropdown-menu';
import { logoutHandler } from '@/core/features/auth/utils/logout-handler';
import { validateNonEmptyArray } from '@/core/utils';
import { LogOutIcon } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Props {
  navigationLinks: {
    href: string;
    label: string;
    active?: boolean;
    icon?: LucideIcon;
  }[];
  userInfo?: {
    fullName?: string;
    avatar?: string;
  };
}

function UserMenu({ navigationLinks, userInfo }: Props) {
  const isValidData = validateNonEmptyArray(navigationLinks);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          <AvatarCustom
            loading="eager"
            src={userInfo?.avatar ?? '/common/avatar/maleUser.png'}
            disabledToken
            className="size-10 cursor-pointer"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 ml-3" side="bottom">
        <DropdownMenuLabel className="flex min-w-0 flex-col" dir="rtl">
          <span className="text-foreground truncate text-sm font-medium">{userInfo?.fullName || 'کاربر ناشناس'}</span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {navigationLinks?.map((link, index) => (
            <DropdownMenuItem key={index} asChild>
              <a href={link.href} className="flex items-center">
                {link.icon && <link.icon size={16} className="opacity-80" aria-hidden="true" />}
                <span>{link.label}</span>
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        {isValidData && <DropdownMenuSeparator />}
        <DropdownMenuItem
          className="group hover:!bg-red-200/60 hover:!text-red-600"
          onClick={async () => {
            await logoutHandler();
          }}
        >
          <LogOutIcon size={16} className="opacity-80 group-hover:!stroke-red-600" aria-hidden="true" />
          <span>خروج</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
