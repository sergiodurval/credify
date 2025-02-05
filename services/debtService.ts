import { IDebtService } from "../contracts/iDebtService";
import { Debt } from "../entitys/debt";
import { DebtStatus } from "../enums/debtStatus";
import CreditorRepository from "../repository/creditorRepository";
import DebtRepository from "../repository/debtRepository";

export class DebtService implements IDebtService{
    async getByUserId(userId: String): Promise<Debt[]> {
        try{
            const result = await DebtRepository.getByUserId(userId);
            if(!result){
                throw new Error('Não foi encontrado nenhuma divida para o usuário informado');
            }
            const debts = this.mappingRepositoryToModel(result);
            return debts;
        }catch(error){
            console.log(`Ocorreu um erro ao obter a divida:${error}`);
            throw error;
        }
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

    private mappingRepositoryToModel(result:any):Debt[]{
        const debts = new Array<Debt>();
        console.log(result);
        for(let i = 0 ; i < result.length ; i++){
            const debt = new Debt
            (
                result[i].cpf,
                result[i].userId.toString(),
                parseFloat(result[i].totalAmount.toString()), 
                result[i].status,
                result[i].creditorId.toString(),
                result[i].updated_at ? new Date(result[i].updated_at) : undefined 
            )

            debts.push(debt);
        }

        return debts;
    }
    

}