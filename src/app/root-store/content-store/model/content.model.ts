export type ContentType = 'articles' | 'timetables' | 'preachings' | 'sayings';

export interface EditorContent {
  attrs: {
    level?: number;
    align: string;
  };
  type: string;
  content: {
    attrs: {
      alt?: string;
      src?: string;
      title?: string;
      width?: string;
    };
    text?: string;
    type: string;
  }[]
}

export interface TimetableContent {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  timetables: [
    {
      date: string;
      description: [
        {
          hours: string;
          minutes: string;
          text: string;
        }
      ]
    }
  ]
}
export interface Content {
  id: string;
  contentType: ContentType;
  author: string;
  authorId: string;
  createdAt: string;
  content: {
    editorContent: {
      content: EditorContent[] | TimetableContent;
      type: 'doc' | 'html' | 'formGroupValue';
    }
  };
  editor?: string;
  updatedAt?: number;
}

export interface Calendar {
  date: string | number | Date;
  content: {
    type: 'Buffer',
    data: number[];
  }[]
}

export interface AdminPageContent {
  title: string | undefined;
  author: string | undefined;
  createdAt: string | undefined;
  edit?: {
    updatedAt: Date;
    editor: string;
  }
}
