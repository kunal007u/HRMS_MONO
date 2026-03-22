export interface Holiday {
    id: number;
    title: string;
    date: string;
    day: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface HolidayResponse {
    message: string;
    status: boolean;
    data: Holiday[];
}

export interface HolidayFormValues {
    title: string;
    date: string;
  }
  