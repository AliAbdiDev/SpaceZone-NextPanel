export type MediaType = 'pdf' | 'video' | 'audio' | 'image' | 'archive';

export interface Media {
    id: number | string;
    title: string;
    description: string;
    status: 'active' | 'inactive' | string;
    type: MediaType;
    file_token: string;
    lesson_id: number | string;
    file_url: string;
}

