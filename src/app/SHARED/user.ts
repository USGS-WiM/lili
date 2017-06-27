export interface IUser {
    id: number,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    groups: Array<number>,
    user_permissions: Array<number>,
    is_superuser: boolean,
    is_staff: boolean,
    is_active: boolean
}
