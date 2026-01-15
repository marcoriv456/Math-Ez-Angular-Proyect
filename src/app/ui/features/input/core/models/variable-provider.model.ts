export class VariableProvider {
  variables = new Map<string, any>();
  get variableNames() {
    return Array.from(this.variables.keys());
  }
  getVariable(name: string) {
    return this.variables.get(name);
  }
}
