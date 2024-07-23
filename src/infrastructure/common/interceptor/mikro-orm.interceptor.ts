import { MikroORM, RequestContext } from '@mikro-orm/core';
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MikroOrmInterceptor implements NestInterceptor {
    constructor(private readonly orm: MikroORM) {}
    intercept(
        _context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> | Promise<Observable<any>> {
        return new Observable((subscriber) => {
            const subscription = RequestContext.create(this.orm.em, () =>
                next.handle().subscribe(subscriber),
            );
            return () => subscription.unsubscribe();
        });
    }
}
