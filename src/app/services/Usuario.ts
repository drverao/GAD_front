export class usuario {

  id: number = 0;
  username: string = "";
  pasword: string = "";
  estado: string = "";

  persona?:persona;
}

interface persona{
  id_persona:number;
}
