import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from '@/domain/response/response.dto';
import { getResponseMessage } from '@/domain/constant/response-message';

@Injectable()
export class ResponseInterceptor<T>
    implements NestInterceptor<T, ResponseDto<T>>
{
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<ResponseDto<T>> {
        const controllerName = context.getClass().name;
        const methodName = context.getHandler().name;
        const message = getResponseMessage(controllerName, methodName);

        return next
            .handle()
            .pipe(map((data) => new ResponseDto<T>(data, message)));
    }
}
