export class DefaultError {
  constructor(issues: string, statusCode: number) {
    this.issues = issues;
    this.statusCode = statusCode;
  }

  public readonly issues: string;
  public readonly statusCode: number;
}
