export type Task = {
    id: number;
    name: string;
    description: string;
    tags: string[];
}

export async function getTasks() {
    return new Promise<Task[]>((res) => setTimeout(() => res([
        {
            id: 1,
            name: 'Top 1',
            description: 'This is short',
            tags: ['red', 'blue', 'green', 'yellow'],
        },
        {
            id: 2,
            name: 'Delimiter',
            description: 'Represent for minus characters',
            tags: ['red', 'yellow'],
        },
        {
            id: 3,
            name: 'Facilitator',
            description: 'Is the person who contribute to the most of discussion',
            tags: ['blue', 'red'],
        }
    ]), 800));
}
