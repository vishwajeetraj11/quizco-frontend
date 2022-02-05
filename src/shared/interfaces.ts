
export interface IQuestion {
    id: number;
    question: string;
    correct: string;
    options: IOption[];
}

export interface IOption {
    value: string;
}

export interface IResponse extends IQuestion {
    response: string;
}

export interface IQuiz {
    title: string,
    description: string,
    status?: 'draft' | 'unpublished' | 'active' | 'inactive',
    tags: string[],
}