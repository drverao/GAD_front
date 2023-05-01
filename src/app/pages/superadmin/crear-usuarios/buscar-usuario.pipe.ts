import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarUsuario'
})
export class BuscarUsuarioPipe implements PipeTransform {

  
  transform(value: any, args?: any): any {
    if(!value) return null;
    if(!args) return value;
    args=args.toLowerCase();
    return value.filter((item:any)=>{
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }
  /*
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    for (const usuario of  value  ) {
      if (usuario.user.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(usuario);
      };
    };
    return resultPosts;
  }
*/

}
