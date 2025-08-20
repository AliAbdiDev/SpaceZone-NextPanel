import { Suspense } from "react";
import AccordionCourse from "./AccordionCourse";
import AccordionSkeleton from "@/components/general/skeletons/AccordionSkeleton";
import { actionFetcher } from "@/actions/actionFetcher";

async function fetchCourseAccordion(courseId) {
  const { data: lessonData } = await actionFetcher({
    url: `/summary_lists?item=lesson&course_id=${courseId}`,
  });
  console.log(lessonData);

  const accordionData = await Promise.all(
    lessonData?.data?.map(async (lesson) => {
      const { data: meetingData } = await actionFetcher({
        url: `/summary_lists?item=lesson_meeting&lesson_id=${lesson.id}`,
      });
      return {
        lesson,
        accordionItem: meetingData?.data,
      };
    }) || []
  );
  return accordionData;
}

async function AccordionWrapper({ courseId }) {
  const accordionData = await fetchCourseAccordion(courseId);
  if (!accordionData || accordionData.length <= 0) return null;
  return (
    <div className="space-y-9">
      <h2 className="w-full text-center title-bold-primary text-4xl">
        دروس آموزشی
      </h2>
      <AccordionCourse data={accordionData} />
    </div>
  );
}

export default function AccordionSection({ courseId }) {
  return (
    <Suspense fallback={<AccordionSkeleton number={4} />}>
      <AccordionWrapper courseId={courseId} />
    </Suspense>
  );
}
