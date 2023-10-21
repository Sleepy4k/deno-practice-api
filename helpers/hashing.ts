import { hash, verify } from 'https://raw.githubusercontent.com/Sleepy4k/deno-argon2-updated/master/lib/mod.ts';

const hash_password = async (password: string) => {
  const salt = crypto.getRandomValues(new Uint8Array(20));
  const hashed_password = await hash(password, { salt });

  return hashed_password;
}

const verify_password = async (password: string, hashed_password: string) => {
  const verified_password = await verify(hashed_password, password);

  return verified_password;
}

export {
  hash_password,
  verify_password
};