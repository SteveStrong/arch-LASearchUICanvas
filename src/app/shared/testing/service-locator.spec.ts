import { ServiceLocator } from '..';
import { environment } from '../../../environments/environment';

import { HttpHeaders } from '@angular/common/http';

describe('ServiceLocator', () => {
    it('should get the baseURL', () => {
        const answer = 'baseURL';
        environment.baseURL = answer;
        expect(ServiceLocator.getBaseURL()).toBe(answer);
    });
});
