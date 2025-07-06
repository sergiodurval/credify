import mongoose, { InferSchemaType } from "mongoose";
import { IAgreementService } from "../contracts/iAgreementService";
import { Agreement } from "../entitys/agreement";
import { Installment } from "../entitys/installments";
import AgreementRepository from "../repository/agreeementRepository";
import DebtRepository from "../repository/debtRepository";
import { AgreementSchema, IAgreement } from "../models/agreementSchema";
import { CreateAgreement } from "../entitys/createAgreement";
import { InstallmentStatus } from "../enums/installmentStatus";
type AgreementModel = InferSchemaType<typeof AgreementSchema>;

export class AgreementService implements IAgreementService {
    async validateAlreadyExistAgreement(debtId: string): Promise<boolean> {
        const agreement = await AgreementRepository.getAgreementByDebtId(debtId);
        if(agreement){
            return true;
        }
        return false;
    }
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
    async create(createAgreement:CreateAgreement): Promise<void> {
        try{

            const debt = await DebtRepository.getById(createAgreement.debtId);
            if(!debt){
                throw new Error('Não foi encontrado nenhuma divida para o id informado');
            }

            //parcelas
            const installments = Array.from({ length: createAgreement.totalInstallment }, () => ({
                status: InstallmentStatus.PENDING,
                created_at: new Date(),
                updated_at: new Date(),
                amount: new mongoose.Types.Decimal128((Number(debt.totalAmount) / createAgreement.totalInstallment).toFixed(2)),
            }));

            await AgreementRepository.add
            (
                createAgreement.debtId,
                Number(debt.totalAmount),
                createAgreement.totalInstallment,
                installments,
                debt.userId.toString()
            );

        }catch(error){
            console.log(`Ocorreu um erro ao realizar o acordo:${error}`)
            throw error;
        }
    }

    private async getAgreementByDebtId(debts:any[]):Promise<Agreement[]>{
        const agreements = new Array<Agreement>();
        const installments = await this.getInstallments(debts);
        for(let i = 0 ; i < debts.length ; i++){
            const agreementModel = await AgreementRepository.getAgreementByDebtId(debts[i].id ?? '');
            if(agreementModel){
            
                const agreement = new Agreement
                (
                    agreementModel._id.toString(),
                    agreementModel.debtId.toString(),
                    debts[i].userId.toString(),
                    agreementModel.status.toString(),
                    Number(agreementModel.amount),
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
                        installmentData.status.toString(),
                        Number(installmentData.amount),
                        new Date(installmentData.updated_at.toString())
                    );
    
                    installments.push(installment);
                }
            }
        }
    
        return installments;
    }

    private convertToEntity(agreementModel: IAgreement): Agreement {
        // Convert installments
        const installments: Installment[] = agreementModel.installments.map(inst => {
            return new Installment(
                inst.status.toString(),
                Number(inst.amount), // Convert Decimal128 to Number
                new Date(inst.updated_at.toString())
            );
        });

        // Convert and return Agreement entity
        return new Agreement(
            agreementModel._id.toString(),
            agreementModel.debtId.toString(),
            agreementModel.userId.toString(),
            agreementModel.status.toString(),
            Number(agreementModel.amount),
            installments
        );
    }
}