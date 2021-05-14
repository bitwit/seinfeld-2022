export default class Character {
  id: string = ""
  name: string = ""
  title: string = ""
  expression: string = "male" // facial expressions

  constructor(data: any) {
    this.id = data.id
    this.name = data.name
    this.title = data.title
    this.expression = data.expression
  }
}