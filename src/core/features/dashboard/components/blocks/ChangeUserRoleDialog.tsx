'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/core/components/shadcn/ui/dialog';
import { useForm } from 'react-hook-form';
import { Checkbox } from '@/core/components/shadcn/ui/checkbox';
import { cn, decodeDataFromUrl } from '@/core/utils';
import { ImgNormalCustom } from '@/core/components/custom/ui/ImgsCustom';
import { TypographyMuted } from '@/core/components/custom/ui/Typography';
import { useApiMutation } from '@/core/hooks/custom';
import { ButtonSubmit } from '@/core/components/custom/ui/Buttons';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type UserRoles = 'student' | 'teacher' | 'admin';

type RoleItem = {
  id: number;
  key: UserRoles;
  label: string;
  imgSrc: string;
};
const roleItems: RoleItem[] = [
  { id: 1, key: 'student', label: 'دانشپذیر', imgSrc: '/common/avatar/maleUser.png' },
  { id: 2, key: 'teacher', label: 'استاد', imgSrc: '/common/avatar/femaleAdmin.png' },
  { id: 3, key: 'admin', label: 'مدیر', imgSrc: '/common/avatar/maleAdmin.png' },
];
type ReactHookFormValues = Record<UserRoles, boolean>;

function ChangeUserRoleDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const searchParams = useSearchParams();
  const userId = searchParams.get('user_id');
  const userName = decodeDataFromUrl<string>(searchParams.get('user_name'), true);

  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      student: false,
      teacher: false,
      admin: false,
    } as ReactHookFormValues,
  });
  const formValues = watch();

  const { mutate, isPending, isSuccess } = useApiMutation({
    endpoint: '/user/assign-role',
  });

  useEffect(() => {
    if (open) return;
    reset();
  }, [open, reset]);

  const onSubmit = (data: ReactHookFormValues) => {
    const selectedRolesData = roleItems?.filter((item) => data[item?.key]);
    const selectedRolesIds = selectedRolesData.map((item) => item.id);

    mutate({ user_id: userId, roles: selectedRolesIds });

    if (isSuccess) {
      onClose();
    }
  };

  return (
    <Dialog open={isPending || open} onOpenChange={onClose}>
      <DialogContent dir="rtl" className="space-y-2">
        <DialogHeader className="pt-5 block">
          <DialogTitle className="text-right pr-1">تغییر نقش {userName ?? 'کاربر'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4 w-full max-w-lg mx-auto">
          {roleItems?.map((item) => (
            <label
              key={item.key}
              htmlFor={item.key}
              className={cn(
                'flex items-center justify-center flex-col cursor-pointer rounded-lg border border-input p-2 py-1 size-full ease-in-out duration-200',
                {
                  'bg-secondary shadow-lg': formValues[item?.key],
                }
              )}
            >
              <Checkbox
                id={item.key}
                {...register(item.key as 'student')}
                className="opacity-0 pointer-events-none appearance-none"
                onCheckedChange={(value) => {
                  setValue(item.key as 'student', value as boolean);
                }}
              />
              <div className="relative rounded-lg overflow-hidden size-28">
                <ImgNormalCustom priority src={item.imgSrc} alt={item.label} className="object-cover" fill />
              </div>
              <TypographyMuted
                className={cn('w-full text-right pr-1 pt-1', {
                  'text-secondary-foreground': formValues[item.key],
                })}
              >
                {item?.label}
              </TypographyMuted>
            </label>
          ))}
          <div className="flex items-start pt-1">
            <ButtonSubmit isLoading={isPending}>ثبت تغییرات</ButtonSubmit>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ChangeUserRoleDialog;
