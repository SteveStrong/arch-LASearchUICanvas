// Credit to https://gist.github.com/sasxa
// Imports
import { Injectable, EventEmitter } from '@angular/core';
import { FuncAny, FuncT } from '.';
import { foBroadcastTopic } from '../shared';

// https://scotch.io/tutorials/angular-2-http-requests-with-observables

@Injectable()
export class EmitterService {
  // Event store
  // tslint:disable-next-line: variable-name
  private static _emitters: { [ID: string]: EventEmitter<any> } = {};
  // Set a new event in the store with a given ID
  // as key
  static get(ID: string): EventEmitter<any> {
    if (!this._emitters[ID]) {
      const source = new EventEmitter();
      this._emitters[ID] = source;
    }
    return this._emitters[ID];
  }

  static processCommands(target: any, done?: FuncAny) {
    EmitterService.get('COMMAND').subscribe((cmd: any) => {
      const { command, args, source } = cmd;
      const name = `cmd${command}`;

      let success = false;
      const func = target[name];
      if (func) {
        func.call(target, args, source);
        success = true;
      }
      done && done(success);
    });
    return target;
  }

  static broadcastCommand(source: any, command: string, args: Array<any> = []) {
    const cmd = {
      command,
      args,
      source
    };
    setTimeout(() => {
      EmitterService.get('COMMAND').emit(cmd);
    }, 10);
    return cmd;
  }

  static registerCommand(source: any, command: string, func: FuncAny) {
    const name = `cmd${command}`;
    source[name] = func;
    return name;
  }

  static broadcastTopic<T extends foBroadcastTopic>(source: any, topic: string, args?: T) {
    const cmd = {
      command: topic,
      args,
      source
    };
    setTimeout(() => {
      EmitterService.get('COMMAND').emit(cmd);
    }, 10);
    return cmd;
  }

  static registerTopic<T extends foBroadcastTopic>(source: any, topic: string, func: FuncT<T>) {
    const name = `cmd${topic}`;
    source[name] = func;
    return name;
  }

  static displayToastUsing(source: any, func: FuncAny, done?: FuncAny) {
    EmitterService.get('SHOWERROR').subscribe(item => {
      func.call(source, 'error', item.title, item.message);
      done && done();
    });

    EmitterService.get('SHOWWARNING').subscribe(item => {
      func.call(source, 'warning', item.title, item.message);
      done && done();
    });

    EmitterService.get('SHOWINFO').subscribe(item => {
      func.call(source, 'info', item.title, item.message);
      done && done();
    });

    EmitterService.get('SHOWSUCCESS').subscribe(item => {
      func.call(source, 'success', item.title, item.message);
      done && done();
    });
    return source;
  }
}

class PopupToast {
  error(message: string, title?: string) {
    const toast = {
      title: title || '',
      message
    };
    EmitterService.get('SHOWERROR').emit(toast);
    return toast;
  }

  warning(message: string, title?: string) {
    const toast = {
      title: title || '',
      message
    };
    EmitterService.get('SHOWWARNING').emit(toast);
    return toast;
  }

  success(message: string, title?: string) {
    const toast = {
      title: title || '',
      message
    };
    EmitterService.get('SHOWSUCCESS').emit(toast);
    return toast;
  }

  info(message: string, title?: string) {
    const toast = {
      title: title || '',
      message
    };
    EmitterService.get('SHOWINFO').emit(toast);
    return toast;
  }
}

// tslint:disable-next-line: variable-name
export const Toast: PopupToast = new PopupToast();
