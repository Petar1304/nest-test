import { InferSubjects, PureAbility, AbilityBuilder, AbilityClass, ExtractSubjectType, MongoAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { User } from '../user/entities/user.entity';

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}

export enum Subject {
    Sales = 'sales',
    Finances = 'finances',
    Consumption = 'consumption',
    Locations = 'locations',
}

// export type Subjects = InferSubjects<typeof Subject> | 'all'; // 'all' is wildcard for every subject

export type AppAbility = MongoAbility<[Action, Subject | 'all']>;

@Injectable()
export class AbilityFactory {
    defineAbility(user: User) {
        // define rules
        const {can, cannot, build } = new AbilityBuilder(PureAbility as AbilityClass<AppAbility>);
 
        if (user.isAdmin) {
            can(Action.Manage, 'all');
        }

        /*
        return build({
            detectSubjectType: (item) => 
                item.constructor as ExtractSubjectType<Subjects>,
        });
        */
        return build();
    }
}
