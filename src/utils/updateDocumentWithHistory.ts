import { Model } from 'mongoose';
/**
 * Updates a document by ID, generates a change log, and appends it to the history field.
 *
 * @param model - The Mongoose model to update.
 * @param id - The ID of the document to update.
 * @param updatedData - The data to update in the model.
 * @param modifiedBy - The identifier of the user making the changes.
 * @returns The updated document or throws an error if not found.
 */
export const updateDocumentWithHistory = async <T extends { history: any[] }>(
    model: Model<T>,
    id: string,
    updatedData: Record<string, any>,
    modifiedBy: string
): Promise<T> => {
    const excludedFields = ['history', 'createdAt', 'updatedAt', '__v']; // Fields to ignore in change log
    // Find the existing document
    const existingDocument: any = await model.findById(id);
    if (!existingDocument) {
        throw new Error(`${model.modelName} not found`);
    }

    // Generate the change log by comparing original and updated data
    const changeLog: Record<string, { old: any; new: any }> = {};
    for (const key in updatedData) {
        if (
            updatedData.hasOwnProperty(key) &&
            existingDocument[key] !== updatedData[key] &&
            !excludedFields.includes(key) // Ignore excluded fields
        ) {
            changeLog[key] = {
                old: existingDocument[key],
                new: updatedData[key]
            };
        }
    }

    // If there are changes, append them to the history
    if (Object.keys(changeLog).length > 0) {
        existingDocument.history = [
            ...existingDocument.history,
            {
                modifiedBy,
                changes: changeLog,
                modifiedAt: new Date()
            }
        ];
    }

    // Update the document without overwriting the `history` field
    for (const key in updatedData) {
        if (!excludedFields.includes(key)) {
            existingDocument[key] = updatedData[key];
        }
    }
    // Save the updated document
    const updatedDocument = await existingDocument.save();
    return updatedDocument;
};
