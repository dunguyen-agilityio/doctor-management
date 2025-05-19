export class Strapi {
  id!: number
  documentId!: string

  constructor(doc: Strapi) {
    Object.assign(this, doc)
  }
}
