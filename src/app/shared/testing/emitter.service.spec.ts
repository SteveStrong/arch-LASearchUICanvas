import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EmitterService, Toast } from '../emitter.service';
import { BroadcastTopic } from '../model-base';

class LocalTarget {
    doOpen() {
        //console.log('doOpen is called');
    }
    doDisplay(type, title, message, done?) {
        //console.log('doDisplay is called');
        if (done) {
            done();
        }
    }
}

describe('emitter Service', () => {
    const popupMessage = {
        message: 'the message',
        title: 'the title'
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        }).compileComponents();
    }));


    it('should NOT processCommands for UN registerCommand', done => {
        const test = new LocalTarget();
        // EmitterService.registerCommand(test, "open", test.doOpen);

        EmitterService.processCommands(test, result => {
            expect(result).toBeFalsy();
            done();
        });
        EmitterService.broadcastCommand(test, 'open');
    });

    it('should broadcastCommand', () => {
        const test = new LocalTarget();
        const result = EmitterService.broadcastCommand(test, 'open');
        expect(result).toBeTruthy();
    });

    it('should registerCommand', () => {
        const test = new LocalTarget();
        const name = EmitterService.registerCommand(test, 'open', test.doOpen);
        expect(name).toBeTruthy();
    });


    it('should broadcastTopic', () => {
        const test = new LocalTarget();
        const result = EmitterService.broadcastTopic<BroadcastTopic>(test, 'open');
        expect(result).toBeTruthy();
    });

    it('should registerTopic', () => {
        const test = new LocalTarget();
        const name = EmitterService.registerTopic<BroadcastTopic>(test, 'open', test.doOpen);
        expect(name).toBeTruthy();
    });

    it('should displayToastUsing', done => {
        const test = new LocalTarget();
        const result = EmitterService.displayToastUsing(test, test.doDisplay, done);
        expect(result).toBeTruthy();
        done();
    });

    it('should do Popup Error', () => {
        const test = new LocalTarget();
        EmitterService.displayToastUsing(test, test.doDisplay);

        const result = Toast.error(popupMessage.message, popupMessage.title);
        expect(result).toEqual(popupMessage);
    });

    it('should do Popup Warning', () => {
        const test = new LocalTarget();
        EmitterService.displayToastUsing(test, test.doDisplay);

        const result = Toast.warning(popupMessage.message, popupMessage.title);
        expect(result).toEqual(popupMessage);
    });

    it('should do Popup Success', () => {
        const test = new LocalTarget();
        EmitterService.displayToastUsing(test, test.doDisplay);

        const result = Toast.success(popupMessage.message, popupMessage.title);
        expect(result).toEqual(popupMessage);
    });

    it('should do Popup Info', () => {
        const test = new LocalTarget();
        EmitterService.displayToastUsing(test, test.doDisplay);

        const result = Toast.info(popupMessage.message, popupMessage.title);
        expect(result).toEqual(popupMessage);
    });
});
