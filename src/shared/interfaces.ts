
export interface IQuestion {
    _id: string;
    quiz: string; // unpopulated
    title: string;
    correct: string;
    options: IOption[];
}

export interface IOption {
    value: string;
    _id: string;
}

export interface IResponse extends IQuestion {
    response: string;
}

export interface IQuizForm {
    title: string;
    description: string;
    tags: string[];
}

export interface IQuiz extends IQuizForm {
    status: string;
    _id: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    id: string;
}