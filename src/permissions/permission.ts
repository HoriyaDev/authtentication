import { Role } from "../auth/roles.enum";

export const RolePermissions ={

    [Role.Admin]:['read:profile' , 'update:user' , 'delete:user'],
    [Role.Moderator]:['read:profile' , 'update:user'],
    [Role.User]:['read:profile']


}