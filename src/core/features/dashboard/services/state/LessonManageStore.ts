'use client';

import createSessionStore from "@/core/services/state/createSessionStorage";


type LessonState = {
    id: string;
};

const initialLessonState: LessonState & {
    setData: (data: Partial<LessonState>) => void;
    clearData: () => void;
} = {
    id: '',
    setData: () => { },
    clearData: () => { },
};

export const lessonSessionStore = createSessionStore<LessonState>({
    keyName: 'lessons',
    initialState: initialLessonState,
});
