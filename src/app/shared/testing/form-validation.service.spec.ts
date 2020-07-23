import { FormValidationService } from '../form-validation.service';
import { UploadForm } from '@src/app/data-models';

describe('FormValidationService', () => {
    it('should be created', () => {
        const formValidationService = new FormValidationService();
        expect(formValidationService).toBeTruthy();
    });

    it('should getFormGroupErrorInfo', () => {
        const formValidationService = new FormValidationService();
        const uploadForm = new UploadForm();
        const output = formValidationService.getFormGroupErrorInfo('veteranFirstName', uploadForm.getFormGroupSpec());
        const answer = {
            errorLabel: 'First Name'
        };
        expect(output).toEqual(answer);
    });

    it('should setAllErrorMessages', () => {
        const formValidationService = new FormValidationService();
        const uploadForm = new UploadForm();
        const form = uploadForm.createForm().controls;
        const answer = {
            veteranFirstName: 'Maximum length is 30',
            veteranLastName: 'Last Name is required',
            zipCode: 'ZIP Code is invalid',
            fileNumber: 'Minimum length is 8'
        };
        form.veteranFirstName.setValue('||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||');
        form.zipCode.setValue('qbads');
        form.fileNumber.setValue('1');
        const output = formValidationService.setAllErrorMessages(form, uploadForm.getFormGroupSpec());
        expect(output).toEqual(answer);
    });
});
