import { AvatarUserCustom } from '@/core/components/custom/ui/AvatarUserCustom';
import { validateNonEmptyArray } from '@/core/utils';

interface Teacher {
  first_name: string;
  last_name: string;
  avatar?: string;
  skill?: string;
  about_me?: string;
}

function CourseDetailAboutTeacher({ teachersData }: { teachersData: Teacher[] }) {
  if (!validateNonEmptyArray(teachersData)) return null;

  return (
    <div className="space-y-9">
      <h2 className="w-full text-center title-bold-primary text-4xl">درباره اساتید دوره</h2>

      <ul className="space-y-12">
        {teachersData.map((item, index) => (
          <li className=" flex items-start justify-start max-w-5xl gap-5 w-full" key={index}>
            <AvatarUserCustom
              gender="male"
              role="user"
              src={item?.avatar}
              className="size-32 border-[3px] border-white rounded-full shadow-md"
            />
            <div className="flex items-start justify-center flex-col gap-y-2">
              <p className="font-iranBold text-xl text-foreground-dark">
                {item?.first_name} {item?.last_name}
              </p>
              <p className="text-muted-foreground ">{item?.skill || 'مهارتی تعریف نشده است'}</p>
              <p className="description-section text-wrap line-clamp-4">
                {item?.about_me || 'توضیحاتی تعریف نشده است'}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseDetailAboutTeacher;
