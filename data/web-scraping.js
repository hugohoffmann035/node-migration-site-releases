// --> https://releases.sistemafusion.com.br/
// --> colar o código abaixo no console.

arrData = [];

document.querySelectorAll(".timeline-item").forEach((item, idx) => {

  // --> Organiza dados
  const title = item.children[0].innerText;
  const artefatos = title.split(" ");
  const id = artefatos[0].replace(/[^\w]/gi, '').trim()
  const version = artefatos[artefatos.length - 1].replace('v', '');
  const change_log = item.children[1].innerText;
  const launch = document
    .querySelectorAll(".time-label")
    [idx].children[0].innerText.split("/")
    .reverse()
    .join("-");

  obj = {
    id,
    title,
    change_log,
    version,
    launch,
  };

  // --> Joga no array
  arrData.push(obj);
});

// --> Faz encode+stringfy e manda para download
encodedUri =
  "data:aplication/json;charset=utf-8," +
  encodeURIComponent(JSON.stringify(arrData));
window.open(encodedUri);

// --> Renomeie o arquivo para .json, baixe a extensão prettier no vscode para fazer o parser do json.