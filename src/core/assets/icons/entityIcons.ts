import { BookOpen, ClipboardCheck, PenTool, Award, User, Users, PlusCircle, BookText, Presentation, LucideBookOpenText, Image } from 'lucide-react';
import { CommonIcon } from '../types';
import { CommonIconEdit } from './commonIcons';



const IconsEntityCourse: CommonIcon = {
    default: BookText,
    create: PlusCircle,
    edit: CommonIconEdit,
};

const IconsEntityLesson: CommonIcon = {
    default: BookOpen,
    create: LucideBookOpenText,
    edit: CommonIconEdit,
};

const IconsEntityTest: CommonIcon = {
    default: ClipboardCheck,
    create: PlusCircle,
    edit: CommonIconEdit,
};
const IconsEntitySession: CommonIcon = {
    default: Presentation,
    create: PlusCircle,
    edit: CommonIconEdit,
};

const IconsEntityExercise: CommonIcon = {
    default: PenTool,
    create: PlusCircle,
    edit: CommonIconEdit,
};

const IconsEntityCertificate: CommonIcon = {
    default: Award,
    create: PlusCircle,
    edit: CommonIconEdit,
};

const IconsEntityMedia: CommonIcon = {
    default: Image,
    create: PlusCircle,
    edit: CommonIconEdit,
};


// -------------- User icons ----------------
const IconsEntityUser: CommonIcon = {
    default: User,
    create: PlusCircle,
    edit: CommonIconEdit,
};

const IconsEntityUsers: CommonIcon = {
    default: Users,
    create: PlusCircle,
    edit: CommonIconEdit,
};


export {
    IconsEntityCourse,
    IconsEntityLesson,
    IconsEntityTest,
    IconsEntitySession,
    IconsEntityExercise,
    IconsEntityCertificate,
    IconsEntityUser,
    IconsEntityUsers,
    IconsEntityMedia,
}