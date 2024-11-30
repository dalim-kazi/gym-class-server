import { Schema, model, Document } from 'mongoose';

// Define an interface for the supplier schema
export interface ISupplier extends Document {
    profileInfo: {
        companyname: string;
        brand: string;
        companyAddress: string;
        companyType: string;
        ownerName: string;
        ownerMobileNumber: number;
        managerMobileNumber: number;
        emailaddress: string;
    };
    bankInfo: {
        accountName: string;
        accountNumber: string;
        bankName: string;
        branchName: string;
        bankAddress: string;
    };
    suppliedMaterials: Array<{
        label: string;
        value: string;
    }>;
    mobileFinancialInfo: Array<{
        bkash: Record<string, any>;
        nagad: Record<string, any>;
        rocket: Record<string, any>;
    }>;
    agreementInfo: {
        paymentMethod: string;
        period: string;
    };
    status: 'Submited' | 'Rejected' | 'Approved';
    createdBy: string;
    history: Array<{
        modifiedBy: string;
        changes: Record<string, any>;
        modifiedAt: Date;
    }>;
}

const supplierSchema = new Schema(
    {
        profileInfo: {
            companyname: { type: String, required: true },
            brand: { type: String, required: true },
            companyAddress: { type: String, required: true },
            companyType: { type: String, required: true },
            ownerName: { type: String, required: true },
            ownerMobileNumber: { type: Number, required: true },
            managerMobileNumber: { type: Number, required: true },
            emailaddress: { type: String, required: true }
        },
        bankInfo: {
            accountName: { type: String, required: true },
            accountNumber: { type: String, required: true },
            bankName: { type: String, required: true },
            branchName: { type: String, required: true },
            bankAddress: { type: String, required: true }
        },
        suppliedMaterials: [
            {
                label: { type: String, required: true },
                value: { type: String, required: true }
            }
        ],
        mobileFinancialInfo: [
            {
                bkash: { type: Object, required: true },
                nagad: { type: Object, required: true },
                rocket: { type: Object, required: true }
            }
        ],
        agreementInfo: {
            paymentMethod: { type: String, required: true },
            period: { type: String, required: true }
        },
        status: {
            type: String,
            required: true,
            default: 'Submited',
            enum: ['Submited', 'Rejected', 'Approved']
        },
        createdBy: { type: String, required: true },
        history: [
            {
                modifiedBy: { type: String, required: true },
                changes: { type: Object, required: true },
                modifiedAt: { type: Date, default: Date.now }
            }
        ]
    },
    { timestamps: true }
);

export const SuppliersModel = model<ISupplier>('suppliers', supplierSchema);
