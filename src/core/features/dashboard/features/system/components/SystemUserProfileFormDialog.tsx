'use client';

import { DatePickerField } from '@/core/components/custom/blocks/DatePickerInput';
import { GridContainer } from '@/core/components/custom/ui/Container';
import { TextareaCustom } from '@/core/components/custom/ui/inputs/TextAreaCustom';
import ImageDropCropUploader from '@/core/components/custom/ui/inputs/ImageDropCropUploader';
import { SelectBoxCustom } from '@/core/components/custom/ui/SelectBoxCustom';
import { ARRAY_GENDER } from '@/core/assets/mapping';
import { TextFieldsList } from '@/core/components/custom/ui/inputs/TextFieldsList';
import { FieldsListArray } from '@/core/assets/types/field';
import DialogNormal from '@/core/components/custom/blocks/DialogNormal';
import FormNormal from '@/core/components/custom/blocks/forms/FormNormal';
import { getUserProfile, updateUserProfile } from '@/core/services/api/client/clientFetchUserProfile';

const fieldListArray: FieldsListArray = [
  {
    name: 'first_name',
    label: 'نام',
  },
  {
    name: 'last_name',
    label: 'نام خانوادگی',
  },
  {
    name: 'father_name',
    label: 'نام پدر',
  },
  {
    name: 'national_code', // کد ملی
    label: 'کد ملی',
  },
  {
    name: 'mobile',
    label: 'شماره موبایل',
  },
  {
    name: 'skills',
    label: 'مهارت ها',
  },
  {
    name: 'address',
    label: 'آدرس',
  },
];

export default function SystemUserProfileFormDialog({ isOpen, setIsOpen }) {
  const { mutate, isPending } = updateUserProfile();
  const userProfilResult = getUserProfile();
  const userProfileData = userProfilResult?.data?.data?.profile;

  return (
    <DialogNormal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="ویرایش پروفایل"
      description="شما در اینجا میتوانید اطلاعات پروفایل خود را ویرایش کنید."
    >
      <FormNormal
        isLoading={isPending}
        defaultValues={userProfileData}
        onSubmit={(data) => mutate({ ...data })}
        disabledParentCard
        className=""
      >
        <div className="h-full max-h-[400px] overflow-y-scroll px-5 py-4">
          <ImageDropCropUploader nameInput="avatar" className="mx-auto" initialImageToken={userProfileData?.avatar} />
          <GridContainer className=" py-5">
            <TextFieldsList fieldListArray={fieldListArray} />
            <DatePickerField name="birth_date" label="تاریخ تولد" />
            <SelectBoxCustom data={ARRAY_GENDER} name="gender" label="جنسیت" />
          </GridContainer>

          <TextareaCustom size="lg" name="about_me" label="درباره من" />
        </div>
      </FormNormal>
    </DialogNormal>
  );
}
