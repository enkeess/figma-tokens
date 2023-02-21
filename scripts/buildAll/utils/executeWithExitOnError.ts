import { exec, exit } from 'shelljs';

export const executeWithExitOnError = (command: string) => {
  if (exec(command).code !== 0) {
    exit(1);
  }
};
