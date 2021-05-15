import AppState from '../AppState'

export default class Commercial {
  id: string
  text: string
  image: string | null

  constructor(data: any) {
    this.id = data.id
    this.text = data.text
    this.image = data.image
  }
}