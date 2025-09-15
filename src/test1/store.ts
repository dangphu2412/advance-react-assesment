type CreateUserForm = {
    username: string;
    password: string;
    reset: () => void;
}
let state: CreateUserForm = {
    username: 'asd',
    password: 'asd',
}
type ExternalStoreDispatcher = (() => void);
let subscribers: ExternalStoreDispatcher[] = [];

export const useCreaUserFormStore = {
    subscribe(onStoreChange: ExternalStoreDispatcher): ExternalStoreDispatcher {
        subscribers.push(onStoreChange);
        console.log('subscribe onStoreChange', subscribers.length)

        return () => {
            subscribers = subscribers.filter(sub => sub !== onStoreChange);
            console.log('unsubscribe onStoreChange', subscribers.length)
        }
    },
    getSnapshot() {
        return state;
    },
    setState(patches: Partial<CreateUserForm>) {
        console.log(state)
        state = {
            ...state,
            ...patches
        }

        subscribers.forEach(onStoreChange => {
            onStoreChange();
        })
    }
}
