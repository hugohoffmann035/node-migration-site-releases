require("dotenv/config");
const fetch = require("node-fetch");
const releases = require("./data/releases.json");

// --> Auth
const auth = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/auth`, {
      method: "POST",
      body: JSON.stringify({
        email: process.env.API_EMAIL,
        password: process.env.API_PASSWORD,
      }),
      headers: {
        "Content-Type": "application/json",
        secret: process.env.API_SECRET,
      },
    }).then((res) => res.json());

    if (response.error === true) return console.log(`> FALHA NA AUTENTICAÇÃO!`)
    const { payload } = response;
    
    console.log(`> AUTENTICADO COM SUCESSO!`)

    return payload.acess_token;
  } catch (err) {
    console.log(`> FALHA NA AUTENTICAÇÃO! ${err}`)
  }
};

// --> Cria nova release
const storeRelease = async (
  authorization,
  title,
  version = "",
  change_log = "",
  launch = new Date(Date.now())
) => {
  try {
    const response = await fetch(`${process.env.API_URL}/releases`, {
      method: "POST",
      body: JSON.stringify({
        title,
        version,
        change_log,
        launch,
      }),
      headers: {
        "Content-Type": "application/json",
        secret: process.env.API_SECRET,
        authorization,
      },
    }).then((res) => res.json());

    if (response.error === true) return console.log(`> RELEASE (${version}) NÃO MIGRADA!`);
    const { payload } = response;

    console.log(`> RELEASE (${version}) MIGRADA!`);

    return payload;
  } catch (err) {
    console.log(`> RELEASE NÃO MIGRADA! ${err}`);
  }
};

// --> Start
(async () => {
  console.log(`> INICIO DA MIGRAÇÃO!`)
  const authorization = `Bearer ${await auth()}`;

  releases.reverse().map(
    async ({ title, change_log, version, launch }) =>
      await storeRelease(authorization, title, version, change_log, launch)
  );
})();
