import { IDebtService } from "../contracts/iDebtService";
import { Debt } from "../entitys/debt";
import { DebtDetail } from "../entitys/debtDetail";
import { DebtPaymentInfo } from "../entitys/debtPaymentInfo";
import { InstallmentPayment } from "../entitys/installmentPayment";
import { DebtStatus } from "../enums/debtStatus";
import AgreementRepository from "../repository/agreeementRepository";
import CreditorRepository from "../repository/creditorRepository";
import DebtRepository from "../repository/debtRepository";

export class DebtService implements IDebtService{
    async getDebtPaymentInfo(debtId: String): Promise<DebtPaymentInfo | null> {
        try{    
            const debt = await DebtRepository.getById(debtId);

            if(debt){
                const creditor = await CreditorRepository.getById(debt.creditorId.toString());
                const agreement = await AgreementRepository.getById(debtId.toString());
                const debtDetail = new DebtDetail(
                    debtId,
                    parseFloat(debt?.totalAmount == null ? '' : debt?.totalAmount.toString()),
                    creditor?.name == null ? '' : creditor.name,
                    agreement ? true : false
                )

                const debtPaymentInfo = this.fillDebtPaymentInfo(debtDetail);
                return debtPaymentInfo;
            }    
            
            return null;

        }catch(error){
            console.log(`Ocorreu um erro ao obter os detalhes da divida:${error}`);
            throw error;
        }
    }
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
            const agreement = await AgreementRepository.getAgreementByDebtId(result[i]._id);
            const debtDetail = new DebtDetail(
                result[i]._id,
                parseFloat(result[i].totalAmount.toString()),
                creditor?.name == null ? '' : creditor.name,
                agreement ? true : false
            )

            debtDetails.push(debtDetail);
        }

        return debtDetails;
    }

    private fillDebtPaymentInfo(debtDetail:DebtDetail): DebtPaymentInfo {

        const totalAmount = parseFloat(debtDetail?.totalAmount?.toString() || "0");

        const minimumInstallments = 1;
        const maximumInstallmentsAllowed = 12; // ou outro valor fixo se quiser limitar
        const maxInstallmentsByAmount = Math.floor(totalAmount / 10);

        const maximumInstallments = Math.min(maxInstallmentsByAmount, maximumInstallmentsAllowed);

        const installmentsPayment: InstallmentPayment[] = [];

        for (let i = minimumInstallments; i <= maximumInstallments; i++) {
            const installmentAmount = parseFloat((totalAmount / i).toFixed(2));
            
            if (installmentAmount >= 10) {
                installmentsPayment.push(new InstallmentPayment(installmentAmount, i));
            }
        }

        return new DebtPaymentInfo(
            debtDetail.debtId,
            totalAmount,
            debtDetail.creditorName,
            minimumInstallments,
            maximumInstallments,
            installmentsPayment
        );
    }

}