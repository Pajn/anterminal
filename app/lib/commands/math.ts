import {command} from './decorators';

class MathCommands {

  @command()
  add(a: number, b: number) {
    return a + b;
  }

  @command()
  subtract(a: number, b: number) {
    return a - b;
  }

  @command()
  multiply(a: number, b: number) {
    return a * b;
  }

  @command()
  divide(a: number, b: number) {
    return a / b;
  }

  @command()
  sqrt(a: number) {
    return Math.sqrt(a);
  }

  @command()
  pow(a: number, b: number) {
    return Math.pow(a, b);
  }

  @command()
  log(a: number) {
    return Math.log(a);
  }

  @command()
  log10(a: number) {
    return Math.log10(a);
  }

  @command()
  round(a: number) {
    return Math.round(a);
  }

  @command()
  floor(a: number) {
    return Math.floor(a);
  }

  @command()
  ceil(a: number) {
    return Math.ceil(a);
  }

  @command()
  sin(a: number) {
    return Math.sin(a);
  }

  @command()
  cos(a: number) {
    return Math.cos(a);
  }

  @command()
  tan(a: number) {
    return Math.tan(a);
  }
}
