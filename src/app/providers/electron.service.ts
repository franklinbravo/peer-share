import { Injectable } from '@angular/core';

class nodeClass {
  nodeId: string;
  isViewing: boolean;
  key: string;
  nodesArray: Array<any>;
  value: string;
  constructor() {
    this.nodesArray = [];
  }
}
// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote, BrowserWindow, shell } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as fsE from 'fs-extra';
@Injectable()
export class ElectronService {
  browserWindow: typeof BrowserWindow;
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  shell: typeof shell;
  childProcess: typeof childProcess;
  fs: typeof fs;
  fsE: typeof fsE;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;
      this.shell = window.require('electron').shell;
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.fsE = window.require('fs-extra');
      this.browserWindow= window.require('electron').BrowserWindow;
      
    }
  }
  
  
  
  isElectron = () => {
    return window && window.process && window.process.type;
  }

}
