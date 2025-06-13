import { SetMetadata } from "@nestjs/common";

export const PERMISSION_KEY = 'permissions'

export const PermissionsRequired = (...permissions:string[]) => SetMetadata(PERMISSION_KEY , permissions)

