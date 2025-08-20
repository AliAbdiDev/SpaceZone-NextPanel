'use client';

import React, { useEffect } from 'react';

import Separator from '../Seperator';
import NavLinkButton from '../btns/NavLinkButton';
import { TextareaCustom } from '@/core/components/custom/ui/inputs/TextAreaCustom';
import { TooltipCustom } from '@/core/components/custom/ui/TooltipCustom';
import ImageDropCropUploader from '@/core/components/custom/ui/inputs/ImageDropCropUploader';
import { DatePickerField } from '@/core/components/custom/blocks/DatePickerInput';
import { SelectBoxCustom } from '@/core/components/custom/ui/SelectBoxCustom';
import { ARRAY_GENDER } from '@/core/assets/mapping';
import ButtonAuth from '../ButtonAuth';
import { TextFieldsList } from '@/core/components/custom/ui/inputs/TextFieldsList';
import { FieldsListArray } from '@/core/assets/types/field';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import FormNormal from '@/core/components/custom/blocks/forms/FormNormal';
import { useApiMutation } from '@/core/hooks/custom';

const fieldListArray: FieldsListArray = [
  { name: 'first_name', label: 'نام', maxLength: 100, required: true },
  { name: 'last_name', label: 'نام خانوادگی', maxLength: 100, required: true },
  { name: 'father_name', label: 'نام پدر', maxLength: 100, required: true },
  { name: 'national_code', label: 'کد ملی', maxLength: 10, required: true },
  { name: 'mobile', label: 'شماره موبایل', maxLength: 11, required: true },
  { name: 'address', label: 'آدرس', maxLength: 100, required: true },
  { name: 'skills', label: 'مهارت ها', maxLength: 100, required: true },
];

// const schema = z.object({
//   avatar: avatarSchema.nullable(),
//   first_name: firstNameSchema.min(3, 'نام باید حداقل ۳ کاراکتر باشد').max(50, 'حداکثر ۵۰ کاراکتر'),
//   last_name: lastNameSchema.min(3, 'نام خانوادگی باید حداقل ۳ کاراکتر باشد').max(50, 'حداکثر ۵۰ کاراکتر'),
//   father_name: fatherNameSchema.min(3, 'نام پدر باید حداقل ۳ کاراکتر باشد').max(50, 'حداکثر ۵۰ کاراکتر').nullable(),
//   national_code: nationalCodeSchema,
//   mobile: mobileSchema,
//   skills: skillSchema.max(100, 'مهارت‌ها نباید بیشتر از ۱۰۰ کاراکتر باشد').nullable(),
//   gender: genderTypeEnum,
//   status: statusSchema.nullable(),
//   password: passwordSchema.min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد').nullable().optional(),
//   status_description: statusDescriptionSchema.max(200, 'حداکثر ۲۰۰ کاراکتر').nullable().optional(),
//   about_me: aboutMeSchema.max(500, 'حداکثر ۵۰۰ کاراکتر').nullable().optional(),
// });

export default function SignUpForm({ endpoint, loginHref }) {
  const path = usePathname();
  const router = useRouter();
  const { mutate, isPending, isSuccess } = useApiMutation({ endpoint });

  useEffect(() => {
    if (isSuccess) {
      router.push(loginHref || '');
    }
  }, [isSuccess, loginHref, router]);

  return (
    <FormNormal
      activeButton={false}
      onSubmit={(formData) => {
        console.log('🚀 ~ SignUpForm ~ formData:', formData);
        mutate(formData);
      }}
      disabledParentCard
    >
      <div className="flex items-end justify-center pb-6">
        <TooltipCustom content={'آپلود عکس پروفایل'}>
          <span>
            <ImageDropCropUploader classNameButtonUploader="size-24" nameInput={'avatar'} />
          </span>
        </TooltipCustom>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <TextFieldsList fieldListArray={fieldListArray} />
        <DatePickerField name="birth_date" label="تاریخ تولد" requiredField />
      </div>

      <span className="my-4">
        <SelectBoxCustom name="gender" label="جنسیت" data={ARRAY_GENDER} />
      </span>

      <TextareaCustom className="w-full" label="درباره من" name="about_me" size="lg" maxLength={null} />
      <Link
        href={path?.includes('student') ? 'teacher' : 'student'}
        className="my-1.5 text-sm hover:underline text-muted-foreground hover:text-primary duration-200"
      >
        شما از طریق این لینک میتوانید به عنوان{' '}
        <span className="font-semibold">{path?.includes('student') ? 'استاد' : 'دانشپذیر'}</span> ثبت نام کنید
      </Link>

      <ButtonAuth isLoading={isPending} label="ثبت نام" className="py-6" />
      <div className="pt-5 space-y-5">
        <Separator label="یا" />
        <NavLinkButton label="ورود" destination={loginHref} />
      </div>
    </FormNormal>
  );
}
