'use client';

import createSessionStore from "@/core/services/state/createSessionStorage";


type CourseState = {
    id: string;
    course_title: string;
};

const initialCourseState: CourseState & {
    setData: (data: Partial<CourseState>) => void;
    clearData: () => void;
} = {
    id: '',
    course_title: '',
    setData: () => { },
    clearData: () => { },
};

export const courseSessionStore = createSessionStore<CourseState>({
    keyName: 'course-manage',
    initialState: initialCourseState,
});
