import { IDebtService } from "../contracts/iDebtService";
import { Debt } from "../entitys/debt";
import { DebtDetail } from "../entitys/debtDetail";
import { DebtStatus } from "../enums/debtStatus";
import CreditorRepository from "../repository/creditorRepository";
import DebtRepository from "../repository/debtRepository";

export class DebtService implements IDebtService{
    async getDebtDetail(userId: String): Promise<DebtDetail[]> {
        try{
            const result = await DebtRepository.getByUserId(userId);
            if(!result){
                throw new Error('Não foi encontrado nenhuma divida para o usuário informado');
            }
            const debtDetails = this.mappingRepositoryToDebtDetail(result);
            return debtDetails;
        }catch(error){
            console.log(`Ocorreu um erro ao obter a divida:${error}`);
            throw error;
        }
    }
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
            throw error;
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

     private async mappingRepositoryToDebtDetail(result:any):Promise<DebtDetail[]>{
        const debtDetails = new Array<DebtDetail>();
        for(let i = 0 ; i < result.length ; i++){

            const creditorId = result[i].creditorId;
            const creditor = await CreditorRepository.getById(creditorId);
            const debtDetail = new DebtDetail(
                result[i]._id,
                parseFloat(result[i].totalAmount.toString()),
                creditor?.name == null ? '' : creditor.name
            )

            debtDetails.push(debtDetail);
        }

        return debtDetails;
    }
    

}