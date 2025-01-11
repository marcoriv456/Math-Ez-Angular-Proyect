export interface TermValidationMessage{
  message:string
  type?:'partially-invalid'|'fully-invalid'
}
