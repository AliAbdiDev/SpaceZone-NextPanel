export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type CourseType = 'online' | 'in_person';
export type RegistrationStatus = 'open' | 'closed';
export type PublishingStatus = 'published' | 'unpublished' | 'publishing';
export type DiscountType = 'percent' | 'amount';

export interface Course {
    id: number;
    title: string;
    slug: string; // unique
    description?: string;
    type: CourseType;
    duration: string; // hours
    level: CourseLevel;
    certificate_des?: string;
    final_exam_des?: string;
    capacity?: number;
    price: number;
    discount_type?: DiscountType | null;
    discount_value: number; // default: 0
    image?: string;
    image_url?: string;
    preview_file?: string;
    publishing_status: PublishingStatus;
    registration_status: RegistrationStatus;
    status_description?: string;
}
