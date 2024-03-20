import jwt from 'jsonwebtoken';

export const generarJWT = (id_user: number, per_id: number,rol_id:number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { id_user,per_id,rol_id };
    jwt.sign(
      payload,
      process.env.SECRETORPTIVATEKEY as string,
      {
        expiresIn: '4h',
      },
      (err: Error | null, token: string | undefined) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el token');
        } else {
          resolve(token as string);
        }
      }
    );
  });
};







