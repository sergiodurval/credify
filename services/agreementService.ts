import { InferSchemaType } from "mongoose";
import { IAgreementService } from "../contracts/iAgreementService";
import { Agreement } from "../entitys/agreement";
import { Installment } from "../entitys/installments";
import AgreementRepository from "../repository/agreeementRepository";
import DebtRepository from "../repository/debtRepository";
import { AgreementSchema } from "../models/agreementSchema";
type AgreementModel = InferSchemaType<typeof AgreementSchema>;

export class AgreementService implements IAgreementService {
    async getAll(userId: string): Promise<Agreement[]> {
        try{
            const debts = await DebtRepository.getByUserId(userId);
            if(!debts){
                throw new Error('Não foi encontrado nenhuma divida para o usuário informado');
            }
            const agreements = await this.getAgreementByDebtId(debts);
            return agreements;
        }catch(error){
            console.log(`Ocorreu o seguinte erro ao listar os acordos:${error}`)
            throw error;
        }
    }
    async getById(agreementId: string): Promise<Agreement> {
        try{
            const agreementModel = await AgreementRepository.getById(agreementId);
            if(!agreementModel){
                throw new Error('Não foi encontrado nenhum acordo para o id informado');
            }
            return this.convertToEntity(agreementModel);
        }catch(error){
            console.log(`Ocorreu o seguinte erro ao listar os acordos:${error}`)
            throw error;
        }
    }
    create(agreement: Agreement): Promise<void> {
        throw new Error("Method not implemented.");
    }

    private async getAgreementByDebtId(debts:any[]):Promise<Agreement[]>{
        const agreements = new Array<Agreement>();
        const installments = await this.getInstallments(debts);
        for(let i = 0 ; i < debts.length ; i++){
            const agreementModel = await AgreementRepository.getAgreementByDebtId(debts[i].id ?? '');
            if(agreementModel){
            
                const agreement = new Agreement
                (
                    agreementModel.debtId.toString(),
                    debts[i].userId.toString(),
                    agreementModel.status ?? '',
                    installments
                );

                agreements.push(agreement);
            }
        }

        return agreements;
    }

    private async getInstallments(debts: any[]): Promise<Installment[]> {
        const installments: Installment[] = [];
        for (let i = 0; i < debts.length; i++) {
            const agreementModel = await AgreementRepository.getAgreementByDebtId(debts[i].id.toString() ?? '');
            if (agreementModel) {
                for (let x = 0; x < agreementModel.installments.length; x++) {
                    const installmentData = agreementModel.installments[x];
    
                    const installment = new Installment(
                        installmentData.status ?? '',
                        Number(installmentData.amount),
                        installmentData.updated_at ? new Date(installmentData.updated_at) : undefined
                    );
    
                    installments.push(installment);
                }
            }
        }
    
        return installments;
    }

    private convertToEntity(agreementModel: AgreementModel): Agreement {
        // Convert installments
        const installments: Installment[] = agreementModel.installments.map(inst => {
            return new Installment(
                inst.status ?? '',
                Number(inst.amount), // Convert Decimal128 to Number
                inst.updated_at ? new Date(inst.updated_at) : undefined
            );
        });

        // Convert and return Agreement entity
        return new Agreement(
            agreementModel.debtId.toString(),
            agreementModel.userId.toString(),
            agreementModel.status ?? '',
            installments
        );
    }
    

}