type LoginCredentials = {
    username: string,
    password: string,
};

export function submit(loginCredentials: LoginCredentials): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(loginCredentials);
        })
        resolve();
    })
}