import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import { ArgonWorker, variant } from "https://deno.land/x/argon2ian@2.0.1/src/async.ts";

const wrk = new ArgonWorker();
const enco = new TextEncoder();
const salt = Deno.env.get("PASS_SALT") || "SOME_SALT";

/**
 * @desc Hash password
 * 
 * @param password string
 * 
 * @returns string
 */
const hash_password = async (password: string) => {
  const hashed_password = await wrk.hash(enco.encode(password), enco.encode(salt),
    { t: 2, variant: variant.Argon2i }); // -> Uint8Array

  return hashed_password.toString();
}

/**
 * @desc Verify password
 * 
 * @param password string
 * @param hashed_password string
 * 
 * @returns boolean
 */
const verify_password = async (password: string, hashed_password: string) => {
  const new_password = await hash_password(password);
  if (new_password !== hashed_password) return false;

  return true;
}

export {
  hash_password,
  verify_password
};