const { openAsBlob } = require("fs");
const { ClientRequest } = require("http");
const readline = require("readline");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


let proximoIDCarro = 1;
let carros = [];


let proximoIDCliente = 1;
let clientes = [];


let proximoIDAluguel = 1;
let alugueis = [];


function mostrarMenu() {
    console.log("\n========================");
    console.log("   BEM VINDO A TURBOCAR!!!  ");
    console.log("========================");
    console.log("         CARROS      ");
    console.log("========================");
    console.log(" 1 - Cadastrar Carro");
    console.log(" 2 - Listar Carros");
    console.log(" 3 - Buscar por ID ");
    console.log(" 4 - Buscar por Placa ");
    console.log(" 5 - Atualizar Carro");
    console.log(" 6 - Remover Carro");
    console.log(" 7 - Listar Carros Disponiveis");
    console.log(" 8 - Listar Carros Indisponiveis")
    console.log("=======================");
    console.log("        CLIENTES       ")
    console.log("=======================");
    console.log(" 9 - Cadastrar Cliente");
    console.log(" 10 - Listar Cliente");
    console.log(" 11 - Buscar por ID ");
    console.log(" 12 - Atualizar Cliente");
    console.log(" 13 - Remover Cliente");
    console.log(" 14 - Buscar por CPF")
    console.log("=======================");
    console.log("        ALUGUEL      ")
    console.log("=======================");
    console.log(" 15 - Realizar Aluguel");
    console.log(" 16 - Devolver Carro");
    console.log(" 17 - Listar Alugueis Ativos");
    console.log(" 18 - Listar Alugueis Finalizados");
    console.log("=======================");
    console.log("19 - Resumo do estoque (total de carros, quantos disponiveis e alugados)");
    console.log("20 - Relatório Geral (totais e faturamento)");
    console.log("0 - SAIR");
    console.log("=======================\n");


    rl.question("Escolha uma opção: ", (opcao) => {
        if (opcao === "1") {
            cadastrarCarro();
        } else if (opcao === "2") {
            listarCarro();
        } else if (opcao === "3") {
            buscarCarroPorID();
        } else if (opcao === "4") {
            buscarCarroPorPlaca();
        } else if (opcao === "5") {
            atualizarCarro();
        } else if (opcao === "6") {
            removerCarro();
        } else if (opcao === "7") {
            listarCarroDisponivel();
        } else if (opcao === "8") {
            listarCarroIndisponivel();
        } else if (opcao === "9") {
            cadastrarCliente();
        } else if (opcao === "10") {
            listarCliente();
        } else if (opcao === "11") {
            buscarClientePorID();
        } else if (opcao === "12") {
            atualizarCliente();
        } else if (opcao === "13") {
            removerCliente();
        } else if (opcao === "14") {
            buscarClientePorCPF();
        } else if (opcao === "15") {
            realizarAluguel();
        } else if (opcao === "16") {
            devolverCarro();
        } else if (opcao === "17") {
            listaAlugueis();
        } else if (opcao === "18") {
            listarAlugueisFinalizados();
        } else if (opcao === "19") {
            resumoDoEstoque();
        } else if (opcao === "20") {
            relatorioGeral();
        } else if (opcao === "0") {
            sair();
        }
        else {
            console.log("opção invalida");
            mostrarMenu();
        }


    });
}


function cadastrarCarro() {
    console.log("Cadastrar Carro")
    rl.question("Modelo do carro: ", (modelo) => {
        rl.question("Placa do carro: ", (placa) => {
            rl.question("Ano de fabrição: ", (ano) => {
                rl.question("Preço por dia: ", (preco) => {
                    ano = Number(ano);
                    preco = Number(preco);


                    if (modelo === '' || placa === '') {
                        console.log("ERRO: Não preencheu todas as infos");
                        mostrarMenu();
                        return;
                    }
                    if (ano <= 0 || preco <= 0) {
                        console.log("ERRO: Ano ou preço inválidos");
                        mostrarMenu();
                        return;
                    }

                    for (let i = 0; i < carros.length; i++) {
                        if (carros[i].placa === placa) {
                            console.log("A placa não pode ser duplicada")
                            mostrarMenu();
                            return;
                        }
                    }

                    let cadastroCarro = {
                        id1: proximoIDCarro,
                        modelo: modelo,
                        placa: placa,
                        ano: ano,
                        precoPorDia: preco,
                        disponivel: true
                    }
                    carros.push(cadastroCarro);
                    proximoIDCarro++;

                    console.log("Carro cadastrado com sucesso!")
                    mostrarMenu();


                });
            });
        });
    });


}

function listarCarro() {
    console.log("Lista de carros");


    if (carros.length === 0) {
        console.log("Nenhum carro cadastrado")
        mostrarMenu();
        return;
    }


    for (let i = 0; i < carros.length; i++) {
        console.log("\nID:", carros[i].id1)
        console.log("Modelo do carro:", carros[i].modelo);
        console.log("Placa do carro:", carros[i].placa);
        console.log("Ano de fabricação:", carros[i].ano);
        console.log("Preço por dia:", carros[i].precoPorDia);
        console.log("Esta disponivel:", carros[i].disponivel)
    }
    mostrarMenu();
}

function buscarCarroPorID() {
    console.log("Buscar carro por ID")


    rl.question("Digite id do carro:", (id1) => {
        id1 = Number(id1);


        let carro = encontrarCarroPorID(id1);


        if (carro === null) {
            console.log(" Carro não encontrado");
            mostrarMenu();
            return;
        }


        console.log("\n Carro Encontrado");
        console.log("ID: ", carro.id1);
        console.log("Modelo do carro: ", carro.modelo)
        console.log("Placa do carro: ", carro.placa)
        console.log("Ano de fabricação: ", carro.ano)
        console.log("Preço por dia: ", carro.precoPorDia)


        mostrarMenu();
        return;
    });
}

function encontrarCarroPorID(id1) {
    for (let i = 0; i < carros.length; i++) {
        if (carros[i].id1 === id1) {
            return carros[i];
        }
    }
    return null;
}

function buscarCarroPorPlaca() {
    console.log("Buscar carro por placa")


    rl.question("Digite a placa do carro: ", (placa) => {

        if (placa === '') {
            console.log(" Placa Inválida");
            mostrarMenu();
            return;
        }
        for (let i = 0; i < carros.length; i++) {
            if (carros[i].placa === placa) {
                console.log("\n Carro Encontrado");
                console.log("ID: ", carros[i].id1);
                console.log("Modelo do carro: ", carros[i].modelo)
                console.log("Placa do carro: ", carros[i].placa)
                console.log("Ano de fabricação: ", carros[i].ano)
                console.log("Preço por dia: ", carros[i].precoPorDia)

                mostrarMenu();
                return;

            }
        }

        console.log("Placa não encontrada");
        mostrarMenu();

    });
}

function atualizarCarro() {
    console.log("Atualizar carro")


    rl.question("Digite op ID do carro:", (id1) => {
        id1 = Number(id1);


        let carro = encontrarCarroPorID(id1);


        if (carro === null) {
            console.log(" Carro não encontrado");
            mostrarMenu();
            return;
        }
        rl.question("Digite o  novo modelo do carro:", (novoModelo) => {
            rl.question("Digite a  nova placa do carro:", (novaPlaca) => {
                rl.question("Digite o novo ano de fabricação:", (novoAno) => {
                    rl.question("Digite o novo preço por dia:", (novoPreco) => {
                        novoAno = Number(novoAno);
                        novoPreco = Number(novoPreco);


                        if (novoModelo === '' || novaPlaca === '') {
                            console.log("ERRO: Não preencheu todas as infos");
                            mostrarMenu();
                            return;
                        }
                        if (novoAno <= 0 || novoPreco <= 0) {
                            console.log("ERRO: Ano ou preço inválidos");
                            mostrarMenu();
                            return;
                        }


                        carro.modelo = novoModelo;
                        carro.placa = novaPlaca;
                        carro.ano = novoAno;
                        carro.precoPorDia = novoPreco;


                        mostrarMenu();
                        return;
                    });
                });
            });
        });


    });


}

function removerCarro() {
    console.log("Remover Carro")


    rl.question("Digite o ID do carro:", (id1) => {
        id1 = Number(id1);

        let carro = encontrarCarroPorID(id1);

        if (carro === null) {
            console.log(" Carro não encontrado");
            mostrarMenu();
            return;
        }

        if (carro.disponivel === false) {
            console.log("Não pode remover carro já alugado")
            mostrarMenu();
            return;
        }

        for (let i = 0; i < carros.length; i++) {
            if (carros[i] === carro) {
                carros.splice(i, 1)
                console.log("Cadastro do Carro removido")
                mostrarMenu();
                return;
            }
        }


    });
}

function listarCarroDisponivel() {
    console.log("Lista de carros disponivel");


    if (carros.length === 0) {
        console.log("Nenhum carro cadastrado")
        mostrarMenu();
        return;
    }


    for (let i = 0; i < carros.length; i++) {
        if (carros[i].disponivel === true) {
            console.log("\nID:", carros[i].id1)
            console.log("Modelo do carro:", carros[i].modelo);
            console.log("Placa do carro:", carros[i].placa);
            console.log("Ano de fabricação:", carros[i].ano);
            console.log("Preço por dia:", carros[i].precoPorDia);
            console.log("Esta disponivel:", carros[i].disponivel);
        }
    }
    mostrarMenu();
}

function listarCarroIndisponivel() {
    console.log("Lista de carros indisponivel");


    if (carros.length === 0) {
        console.log("Nenhum carro cadastrado")
        mostrarMenu();
        return;
    }

    for (let i = 0; i < carros.length; i++) {
        if (carros[i].disponivel === false) {
            console.log("\nID:", carros[i].id1)
            console.log("Modelo do carro:", carros[i].modelo);
            console.log("Placa do carro:", carros[i].placa);
            console.log("Ano de fabricação:", carros[i].ano);
            console.log("Preço por dia:", carros[i].precoPorDia);
            console.log("Esta disponivel:", carros[i].disponivel)

        }
    }

    mostrarMenu();
}

function cadastrarCliente() {
    rl.question("nome: ", (nome) => {
        rl.question("CPF: ", (cpf) => {
            rl.question("Telefone: ", (telefone) => {


                if (nome === '' || cpf === '' || telefone === '') {
                    console.log("ERRO: Não preencheu todas as infos");
                    mostrarMenu();
                    return;
                }

                for (let i = 0; i < clientes.length; i++) {
                    if (clientes[i].cpf === cpf) {
                        console.log("O CPF não pode ser duplicado")
                        mostrarMenu();
                        return;
                    }
                }

                let cadastroClientes = {
                    id2: proximoIDCliente,
                    nome: nome,
                    cpf: cpf,
                    telefone: telefone
                }
                clientes.push(cadastroClientes);
                proximoIDCliente++;


                console.log("Cliente cadastrado com sucesso!")
                mostrarMenu();
            });
        });
    });
}

function listarCliente() {
    console.log("lista dos clientes")

    let contador = 0;

    if (clientes.length === 0) {
        console.log("Nenhum cliente cadastrado")
        mostrarMenu();
        return;
    }
    for (let i = 0; i < clientes.length; i++) {
        contador++;
        console.log("\nID:", clientes[i].id2)
        console.log("Nome cliente:", clientes[i].nome);
        console.log("Cpf cliente:", clientes[i].cpf);
        console.log("Telefone cliente:", clientes[i].telefone);
    }
    console.log("O total de clientes é:", contador)

    mostrarMenu();


}

function buscarClientePorID() {
    console.log("Buscar Cliente Por ID")


    rl.question("Digite o id do cliente: ", (id2) => {
        id2 = Number(id2);


        let cliente = encontrarClientePorID(id2);


        if (cliente === null) {
            console.log("Cliente não encontrado")
        }


        console.log("\n Cliente Encontrado");
        console.log("ID: ", cliente.id2);
        console.log("Nome do cliente: ", cliente.nome)
        console.log("CPF do cliente: ", cliente.cpf)
        console.log("CPF do cliente: ", cliente.telefone)


        mostrarMenu();
        return;
    });
}

function encontrarClientePorID(id2) {


    for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].id2 === id2) {
            return clientes[i];
        }
    }
    return null;
}

function atualizarCliente() {
    console.log("Atualizar cliente")

    rl.question("Digite o id do cliente: ", (id2) => {


        id2 = Number(id2);


        let cliente = encontrarClientePorID(id2);


        if (cliente === null) {
            console.log("Cliente não encontrado")
        }


        rl.question("Digite o novo nome:", (novoNome) => {
            rl.question("Digite o novo CPF:", (novoCpf) => {
                rl.question("Digite o novo telefone:", (novoTelefone) => {


                    if (novoNome === '' || novoCpf === '' || novoTelefone === '') {
                        console.log("ERRO: Não preencheu todas as infos");
                        mostrarMenu();
                        return;
                    }
                    cliente.nome = novoNome
                    cliente.cpf = novoCpf
                    cliente.telefone = novoTelefone


                    mostrarMenu();
                    return;
                });
            });
        });
    });
}

function removerCliente() {
    console.log("Remover Cliente")

    rl.question("Digite o id do cliente: ", (id2) => {
        id2 = Number(id2);

        let cliente = encontrarClientePorID(id2);

        if (cliente === null) {
            console.log("Cliente não encontrado")
            mostrarMenu();
            return;
        }

        for (let i = 0; i < clientes.length; i++) {
            if (clientes[i].id2 === cliente.id2) {
                clientes.splice(i, 1)
                console.log("Cliente removido com sucesso")

                mostrarMenu();
                return;
            }

        }
        mostrarMenu();
        return;
    });
}

function buscarClientePorCPF() {
    console.log("Buscar Cliente Por CPF")

    rl.question("Digite o cpf do cliente: ", (cpf) => {

        if (cpf === '') {
            console.log(" CPF Inválido");
            mostrarMenu();
            return;
        }

        for (let i = 0; i < clientes.length; i++) {
            if (clientes[i].cpf === cpf) {
                console.log("\n Cliente Encontrado");
                console.log("ID: ", clientes[i].id2)
                console.log("Nome cliente:  ", clientes[i].nome);
                console.log("Cpf cliente: ", clientes[i].cpf);
                console.log("Telefone cliente: ", clientes[i].telefone)
                mostrarMenu();
                return;
            }
        }

        console.log("CPF não encontrado");
        mostrarMenu();

    });
}

function realizarAluguel() {
    console.log("Realizar aluguel")

    rl.question("Digite o id do cliente:  ", (id2) => {
        rl.question("Digite o id do Carro:  ", (id1) => {
            rl.question("Total de  Dias :  ", (Dias) => {
                id2 = Number(id2);
                id1 = Number(id1);
                Dias = Number(Dias);

                if (id2 === null || id1 === null) {
                    console.log("Cliente ou  Carrro inexistente ")
                    mostrarMenu();
                    return;
                }
                if (Dias <= 0) {
                    console.log("ERRO: total de dias inválidos");
                    mostrarMenu();
                    return;
                }

                for (let i = 0; i < alugueis.length; i++) {
                    if (alugueis[i].status === "Ativo" && alugueis[i].idCarro === id1) {
                        console.log("Carro já alugado")
                        mostrarMenu();
                        return;
                    }
                }

                let carro = encontrarCarroPorID(id1);

                let Total = Dias * carro.precoPorDia;

                let aluguel = {
                    id3: proximoIDAluguel,
                    idCliente: id2,
                    idCarro: id1,
                    dias: Dias,
                    total: Total,
                    status: "Ativo",
                }
                carro.disponivel = false;
                proximoIDAluguel++;
                alugueis.push(aluguel);

                console.log("O preço total ficou: ", aluguel.total)
                console.log("Auguel realizado com sucesso");

                mostrarMenu();
                return;
            });
        });
    });
}

function devolverCarro() {
    console.log("Devolver carro")


    rl.question("Digite o id do Aluguel: ", (id3) => {
        id3 = Number(id3);


        let idaluguel = encontrarAluguelPorID(id3);


        if (idaluguel === null) {
            console.log("Aluguel não encontrado ou aluguel já finalizado")
            mostrarMenu();
            return;
        }


        idaluguel.status = "finalizado"


        let carro = encontrarCarroPorID(idaluguel.idCarro)


        if (carro !== null) {
            carro.disponivel = true;
        }


        console.log("Carro Devolvido")
        mostrarMenu();
        return;
    });
}

function encontrarAluguelPorID(id3) {

    for (let i = 0; i < alugueis.length; i++) {
        if (alugueis[i].id3 === id3) {
            return alugueis[i];
        }
    }
    return null;
}

function listaAlugueis() {
    console.log("===ALUGUEIS ATIVOS===")


    if (alugueis.length === 0) {
        console.log("Nenhum aluguel efetuado ")
        mostrarMenu();
        return;
    }
    for (let i = 0; i < alugueis.length; i++) {
        if (alugueis[i].status === "Ativo") {
            console.log("\nID do aluguel  :", alugueis[i].id3)
            console.log("ID do cliente :", alugueis[i].idCliente);
            console.log("ID do carro :", alugueis[i].idCarro);
            console.log("Total de dias :", alugueis[i].dias);
            console.log("Status :", alugueis[i].status);
        }

    }

    rl.question("Quer saber o valor total dos alugueis ativos?", (valorAtivos) => {

        if (valorAtivos === "sim") {

            let soma = 0;
            for (let i = 0; i < alugueis.length; i++) {
                if (alugueis[i].status === "Ativo") {

                    soma = soma + alugueis[i].total;
                }
            }
            console.log("O valor total dos alugueis ativos é:", soma)
            mostrarMenu();
            return;

        } else if (valorAtivos === "não" || valorAtivos === "nao") {
            mostrarMenu();
            return;
        }
        else {
            console.log("Opção invalida");
            mostrarMenu();
            return;
        }
        mostrarMenu();
        return;
    });

}

function listarAlugueisFinalizados() {
    console.log("===ALUGUEIS FINALIZADO===")


    if (alugueis.length === 0) {
        console.log("Nenhum aluguel efetuado ")
        mostrarMenu();
        return;
    }
    for (let i = 0; i < alugueis.length; i++) {
        if (alugueis[i].status === "finalizado") {
            console.log("\nID do aluguel  :", alugueis[i].id3)
            console.log("ID do cliente :", alugueis[i].idCliente);
            console.log("ID do carro :", alugueis[i].idCarro);
            console.log("Total de dias :", alugueis[i].dias);
            console.log("Status :", alugueis[i].status);

        }
    }
    mostrarMenu();
    return;
}

function sair() {

    rl.question("você quer sair?: ", (sair) => {

        if (sair === "sim") {
            rl.close();
        } else if (sair === "não") {
            mostrarMenu();
            return;
        }
        else {
            console.log("opção inválida")
            mostrarMenu();
            return;
        }
    });


}

function resumoDoEstoque() {
    console.log("Resumo do estoque");

    if (carros.length === 0) {
        console.log("Nenhum carro cadastrado");
        mostrarMenu();
        return;
    }

    let contadorTotal = 0;
    let contadorDisponiveis = 0;
    let contadorIndisponiveis = 0;

    for (let i = 0; i < carros.length; i++) {

        contadorTotal++;

        if (carros[i].disponivel === true) {
            contadorDisponiveis++;
        } else {
            contadorIndisponiveis++;
        }

    }

    console.log("Total de carros:", contadorTotal);
    console.log("Carros disponíveis:", contadorDisponiveis);
    console.log("Carros indisponíveis:", contadorIndisponiveis);

    mostrarMenu();
}

function relatorioGeral() {
    console.log("Relatorio Geral");

    let totalCarros = carros.length;

    let totalClientes = clientes.length;

    let totalAlugueis = alugueis.length;
    let faturamento = 0;

    for (let i = 0; i < alugueis.length; i++) {

        if (alugueis[i].status === "finalizado") {
            faturamento += alugueis[i].total;
        }

    }

    console.log("\n--- RESUMO ---");
    console.log("Total de carros:", totalCarros);
    console.log("Total de clientes:", totalClientes);
    console.log("Total de alugueis:", totalAlugueis);

    console.log("\n--- FINANCEIRO ---");
    console.log("Faturamento (finalizados):", faturamento);

    console.log("\n==============================");

    mostrarMenu();
}

mostrarMenu();
