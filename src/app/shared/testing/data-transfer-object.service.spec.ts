import { DataTransferObjectService } from '../data-transfer-object.service';

describe('DataTransferObjectService', () => {
    it('should be created', () => {
        const dtoService = new DataTransferObjectService();
        expect(dtoService).toBeTruthy();
    });
});
