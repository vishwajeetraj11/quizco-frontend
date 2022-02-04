export const JSQuiz = [
    {
        id: 1,
        question: "An infinity iterator is one that never expresses true through what property?",
        correct: 'done',
        options: [
            { value: "complete" },
            { value: "done" },
            { value: "end" },
            { value: "finished" },
        ],
    },
    {
        id: 2,
        question: "You managed a web page that allows external customers to register for a logon to your company's intranet. The webpage has a vulnerability where users can access variables that have sensitive data. What could you implement to prevent this from happening?",
        options: [
            { value: "Client-side Node.js" },
            { value: "Input/Output (I/O) standardization" },
            { value: "Getters and setters" },
            { value: "Multi-threading" },
        ],
        correct: 'Getters and setters',
    },

    {
        id: 3,
        question: "What is a consequence of setting exported modules to strict mode by default?",
        options: [
            { value: "Export statements cannot be imported without being renamed." },
            { value: "Export statements cannot be used in most non-JavaScript web frameworks." },
            { value: "Export statement cannot use variables such as const or let" },
            { value: "Export statements cannot be used in embedded scripts" },
        ],
        correct: "Export statements cannot be used in embedded scripts",
    },
    {
        id: 4,
        question: "What object is returned when you call map.prototype.entries()?",
        options: [
            { value: "An iterator" },
            { value: "An array" },
            { value: "A generators" },
            { value: "A WeakMap" },
        ],
        correct: "An iterator",
    },
    {
        id: 5,
        question: "After the following code is executed, what is the printed to the console? console.log(eval('2 + 2'));",
        options: [
            { value: "4" },
            { value: "NaN" },
            { value: "22" },
            { value: "true" },
        ],
        correct: "4"
    },
    {
        id: 6,
        question: "What method determined if two values are the same?",
        options: [
            { value: "data.cal()" },
            { value: "object.is()" },
            { value: "var.compare()" },
            { value: "data.isEqual()" },
        ],
        correct: 'object.is()'
    },
    {
        id: 7,
        question: "What type of loop iterates over the properties of an object?",
        options: [
            { value: "for" },
            { value: "for...of" },
            { value: "forEach" },
            { value: "for...in" },
        ],
        correct: 'for...in'
    },
    {
        id: 8,
        question: "What is one way to create an object without a prototype to prevent Prototype Pollution?",
        options: [
            { value: "Object.create()" },
            { value: "Object.constructor()" },
            { value: "Object.proto()" },
            { value: "Object.type()" },
        ],
        correct: 'Object.create()'
    },
    {
        id: 9,
        question: "Why was JavaScript's browser security model designed?",
        options: [
            { value: "To protect the server from receiving denial-of-service (DoS) attacks" },
            { value: "To protect website owners from receiving amlicious attacks" },
            { value: "To protect the internet browser from being corrupted" },
            { value: "To protect users from malicious websites" },
        ],
        correct: 'To protect users from malicious websites'
    },
    {
        id: 10,
        question: "How would you make a new key flavor equal to sweet in a Map called food?",
        options: [
            { value: "food.create('flavor', 'sweet');" },
            { value: "food.add('flavor', 'sweet');" },
            { value: "food.set('flavor','sweet');" },
            { value: "food['flavor'] = 'sweet';" },
        ],
        correct: "food.set('flavor','sweet');"
    },
];
