import { repl } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    initializeTransactionalContext,
    StorageDriver,
} from 'typeorm-transactional';

async function bootstrap() {
    initializeTransactionalContext({
        storageDriver: StorageDriver.ASYNC_LOCAL_STORAGE,
    });
    const replServer = await repl(AppModule);
    replServer.setupHistory('.nestjs_repl_history', (err) => {
        if (err) {
            console.error(err);
        }
    });
}
bootstrap();
