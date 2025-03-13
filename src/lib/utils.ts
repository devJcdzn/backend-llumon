import axios from "axios";
import fs from "node:fs";
import https from "node:https";
import { env } from "../env";

const BASE_URL = env.EFI_BASE_URL;
const CLIENT_ID = env.EFI_CLIENT_ID;
const CLIENT_SECRET = env.EFI_CLIENT_SECRET;
const CERT_PATH = "./llumon-dev.p12";

const agent = new https.Agent({
  pfx: fs.readFileSync(CERT_PATH),
  passphrase: "",
});

const data = JSON.stringify({ grant_type: "client_credentials" });

const credentials = `${CLIENT_ID}:${CLIENT_SECRET}`;

const auth = Buffer.from(credentials).toString("base64");

export async function getAccessToken() {
  try {
    const response = await axios.post(`${BASE_URL}/oauth/token`, data, {
      headers: {
        authorization: `Basic ${auth}`,
        "content-type": "application/json",
      },
      httpsAgent: agent,
    });

    return {
      agent,
      accessToken: response.data.access_token,
    };
  } catch (err) {
    console.error("Erro ao obter token:", (err as Error).message);
  }
}
