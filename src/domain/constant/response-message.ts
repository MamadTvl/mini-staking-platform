import { AuthController } from '@/infrastructure/controller/auth/auth.controller';
import { TransactionController } from '@/infrastructure/controller/transaction/transaction.controller';

export const getResponseMessage = (
    controllerName: string,
    methodName: string,
): string => {
    switch (controllerName) {
        case AuthController.name:
            switch (methodName as keyof AuthController) {
                case 'register':
                    return 'registered successfully';
                case 'login':
                    return 'login successfully';
            }
        case TransactionController.name:
            switch (methodName as keyof TransactionController) {
                case 'approveTransaction':
                    return 'transaction approved';
                case 'rejectTransaction':
                    return 'transaction rejected';
                case 'deposit':
                    return '';
                case 'withdraw':
                    return '';
                case 'getPendingTransactions':
                    return '';
            }

        default:
            return '';
    }
};
