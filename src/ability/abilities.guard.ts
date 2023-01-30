import { ForbiddenError } from "@casl/ability";
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RequiredRule, CHECK_ABILITY } from './abilities.decorator';
import { AbilityFactory } from "./ability.factory";


@Injectable()
export class AbilitiesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private abilityFactory: AbilityFactory,
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const rules = this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) || [];

        // const user = context.switchToHttp().getRequest();
        const user = {id: 2, isAdmin: true};

        const ability = this.abilityFactory.defineAbility(user);

        try {
            rules.forEach((rule) => 
                ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject)
            );
            
            return true;
            // return rules.every((rule) => ability.can(rule.action, rule.subject));

        } catch (error) {
            throw new ForbiddenException(error.message);
        }
    }
}


