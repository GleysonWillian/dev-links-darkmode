let input1 = document.getElementById("numero1");
let input2 = document.getElementById("numero2");
let selectOperacao = document.getElementById("operacao");
let resultadoE1 = document.getElementById("resultado");
let historico = document.getElementById("historico");

document.getElementById("btnCalcular").addEventListener("click", calcular);

function calcular() {
  if (input1.value === "" || input2.value == "") {
    resultadoE1.innerText = "Digite os dois números!";
    return;
  }

  let numero1 = Number(input1.value);
  let numero2 = Number(input2.value);
  let operacao = selectOperacao.value;

  let resultado

  switch (operacao) {
    case "+":
      resultado = numero1 + numero2;
      break;
    case "-":
      resultado = numero1 - numero2;
      break;
    case "*":
      resultado = numero1 * numero2;
      break;
    case "/":
        resultado = numero2 === 0 ? "Erro: divisão por zero.": numero1 / numero2;
      break;
    case "**":
      resultado = numero1 ** numero2;
      break;
    case "%":
      resultado = numero1 % numero2;
      break;
  }

  resultadoE1.innerText = "Resultado: " + resultado;

  let item = document.createElement("li");
  item.innerText = `${numero1} ${operacao} ${numero2} = ${resultado}`;

  historico.appendChild(item)
}

function limpar() {
  input1.value = "";
  input2.value = "";
  resultado.innerText = "";
  historico.innerHTML = "";
}
