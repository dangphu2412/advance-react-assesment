export type Task = {
    id: number;
    name: string;
    description: string;
    tags: string[];
}
const fakeDB = {
    tasks: [
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
    ]
}

export async function getTasks() {
    return new Promise<Task[]>((res) => setTimeout(() => res(fakeDB.tasks), 800));
}

export function saveTasks(tasks: Task[]) {
    console.log('Storing task ....', tasks);
    return new Promise(resolve => setTimeout(() => {
        console.log('Stored task ....', tasks);
        fakeDB.tasks.push(...tasks);
        resolve(tasks)
    }, 1000));
}
