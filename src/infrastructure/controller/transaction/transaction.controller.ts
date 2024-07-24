import { Roles } from '@/infrastructure/common/decorators/role.decorator';
import { JwtAuthGuard } from '@/infrastructure/common/guards/jwtAuth.guard';
import { RoleGuard } from '@/infrastructure/common/guards/role.guard';
import { PageOptionsDto } from '@/infrastructure/common/pagination/dto/page-options.dto';
import { PaginationDto } from '@/infrastructure/common/pagination/dto/pagination.dto';
import { Transaction } from '@/infrastructure/db/entities/transaction.entity';
import { TransactionReviewUseCase } from '@/use-case/transaction/transaction-review.use-case';
import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { TransferDto } from './dto/transfer.dto';
import { DepositUseCase } from '@/use-case/transaction/deposit.use-case';
import { ReqUser } from '@/infrastructure/common/decorators/req-user.decorator';
import { User } from '@/infrastructure/db/entities/user.entity';
import { WithdrawalUseCase } from '@/use-case/transaction/withdrawal.use-case';
import { ApproveTransactionDto, RejectTransactionDto } from './dto/review.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@/domain/response/api-paginated-response.decorator';
import { ApiBoolResponse } from '@/domain/response/api-response.decorator';

@ApiSecurity('user-auth')
@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
    constructor(
        private readonly transactionReviewUseCase: TransactionReviewUseCase,
        private readonly depositUseCase: DepositUseCase,
        private readonly withdrawalUseCase: WithdrawalUseCase,
    ) {}

    @ApiPaginatedResponse(Transaction)
    @Get('review')
    @Roles()
    @UseGuards(JwtAuthGuard, RoleGuard)
    async getPendingTransactions(@Query() pageOptions: PageOptionsDto) {
        const [data, count] =
            await this.transactionReviewUseCase.getPendingTransactions(
                pageOptions.take,
                pageOptions.skip,
            );
        return new PaginationDto<Transaction>(data, {
            itemCount: count,
            pageOptionsDto: pageOptions,
        });
    }

    @ApiBoolResponse()
    @Patch('approve')
    @Roles()
    @UseGuards(JwtAuthGuard, RoleGuard)
    async approveTransaction(@Body() dto: ApproveTransactionDto) {
        await this.transactionReviewUseCase.approveTransaction(
            dto.transactionId,
            dto.taxPercentage,
        );
        return true;
    }

    @ApiBoolResponse()
    @Patch('reject')
    @Roles()
    @UseGuards(JwtAuthGuard, RoleGuard)
    async rejectTransaction(@Body() dto: RejectTransactionDto) {
        await this.transactionReviewUseCase.rejectTransaction(
            dto.transactionId,
        );
        return true;
    }

    @ApiBoolResponse({ status: 201 })
    @Post('deposit')
    @UseGuards(JwtAuthGuard)
    async deposit(@Body() dto: TransferDto, @ReqUser() user: User) {
        await this.depositUseCase.requestForDepositTransaction(
            user.id,
            dto.amount,
        );
        return true;
    }

    @ApiBoolResponse({ status: 201 })
    @Post('withdraw')
    @UseGuards(JwtAuthGuard)
    async withdraw(@Body() dto: TransferDto, @ReqUser() user: User) {
        await this.withdrawalUseCase.withdrawRequest(user.id, dto.amount);
        return true;
    }
}
