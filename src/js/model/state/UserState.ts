export interface UserState {
    data?: User[],
    input?: any 
}

interface User {
    id: number,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    is_active: boolean
}