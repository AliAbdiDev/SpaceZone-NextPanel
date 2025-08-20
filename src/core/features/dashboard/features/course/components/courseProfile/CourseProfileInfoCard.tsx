import { CourseProfileData } from '../../courseProfileType';

export const CourseProfileInfoCard = ({ title, value }) => (
  <span className="hover:shadow border border-input transition-[box-shadow] duration-200 ease-in-out flex flex-wrap items-center justify-start rounded-lg bg-accent/55 text-accent-foreground text-sm p-2 max-lg:min-h-20">
    <p className="p-1.5 text-nowrap"> {title}: </p>
    <p> {value}</p>
  </span>
);
export function CourseProfileInfoCardsList({ profileData }: { profileData: CourseProfileData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {profileData.items.map((item, index) => (
        <CourseProfileInfoCard key={index} title={item?.title} value={item?.value} />
      ))}
    </div>
  );
}
