
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