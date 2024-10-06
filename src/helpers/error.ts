import { z } from 'zod';

export function prettyErrors(path: string, err: unknown) {
  if (err instanceof z.ZodError) {
    for (const { path: subPath, message } of err.issues) {
      console.error(`- ${message} ${path}.${subPath.join('.')}`);
    }
  }
}
