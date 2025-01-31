import { IDebtService } from "../contracts/iDebtService";
import { Debt } from "../entitys/debt";
import { DebtStatus } from "../enums/debtStatus";
import CreditorRepository from "../repository/creditorRepository";
import DebtRepository from "../repository/debtRepository";

export class DebtService implements IDebtService{
    getById(userId: String): Promise<Debt[]> {
        throw new Error("Method not implemented.");
    }
    async assignDebt(userId: String, cpf: String): Promise<void> {
        try{
            const creditor = await CreditorRepository.getRandomCreditor();
            if(!creditor){
                throw new Error('Não há nenhum credor cadastrado no banco de dados');
            }
            const newDebt = this.generateDebt(userId, cpf,creditor._id.toString());
            await DebtRepository.add(
                newDebt.cpf,
                newDebt.userId,
                newDebt.totalAmount,
                newDebt.created_at,
                newDebt.status,
                newDebt.creditorId
            );

        }catch(error){
            console.log(`Ocorreu um erro ao atribuir uma divida ao usuário:${userId} - erro:${error}`);
        }
    }

    private generateDebt(userId:String,cpf:String,creditorId:String):Debt{
        const totalAmount = this.getRandomAmount(50, 950);
        const debtStatus = DebtStatus.OPEN;

        return new Debt(cpf, userId, totalAmount, debtStatus, creditorId);
    }

    private getRandomAmount(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    

}