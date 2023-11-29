export function formatYupError(err: any): string {
  if (typeof err === 'object' && err && 'name' in err && err.name === 'ValidationError' && 'errors' in err) {
    const message = JSON.stringify(err.errors)
    return message;
  }
  else {
    return err.toString()
  }
}