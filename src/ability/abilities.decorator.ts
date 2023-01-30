import { SetMetadata } from "@nestjs/common";
import { User } from "src/user/entities/user.entity";
import { Action } from './ability.factory';
import { Subject } from "./ability.factory";

export interface RequiredRule {
    action: Action;
    subject: Subject;
}

export const CHECK_ABILITY = 'check_ability';

export const CheckAbilities = (...requirements: RequiredRule[]) => SetMetadata(CHECK_ABILITY, requirements);
