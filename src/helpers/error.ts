import { z } from 'zod';

export function prettyErrors(path: string, err: unknown) {
  if (err instanceof z.ZodError) {
    err.issues.forEach(({ path: subPath, message }) => {
      console.error(`- ${message} ${path}.${subPath.join('.')}`);
    });
  }
}
