export class TestVO {
  id : number;
  name : string;

  constructor(id : number, name : string) {
    this.id = id;
    this.name = name;
  }

  public getId() : number {
    return this.id;
  }

  public setId(id : number) {
    this.id = id;
  }

  public getName() : string {
    return this.name;
  }

  public setName(name : string) {
    this.name = name;
  }

  public toString() : string {
    return "TestVO [id=" + this.id + ", name=" + this.name + "]";
  }
}
