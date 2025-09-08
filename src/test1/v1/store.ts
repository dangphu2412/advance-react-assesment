import { create } from 'zustand'

type CreateUserForm = {
    username: string;
    password: string;
    reset: () => void;
}

export const useCreaUserFormStore = create<CreateUserForm>((set, get) => ({
    username: '',
    password: '',
    reset: () => {
        console.log('reset fron', useCreaUserFormStore.getState());
        set({
            username: '',
            password: '',
        })
    }
}))
