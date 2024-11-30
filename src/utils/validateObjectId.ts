import { ObjectId } from 'mongodb';
import { sendError } from '@/libs/response';

export default function validateObjectId(id: string, title: string) {
    if (!ObjectId.isValid(id)) sendError.invalidObjectId(title);
}
