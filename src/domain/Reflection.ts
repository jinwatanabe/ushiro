export class Reflection {
  constructor(
    readonly id: string,
    readonly createdAt: Date,
    readonly link: string,
    readonly infoTech: string,
    readonly ideaTech: string,
    readonly reflectionTech: string,
    readonly memo?: string
  ) {}
}

// class ReflectionId {
//   constructor(readonly value: string) {}
// }
