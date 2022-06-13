import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IBufferReordenamento, IEstacaoReserva, IInstrucoes, IntrucaoContext, IRegistrador } from '../App';
import { TipoRegistrador } from '../Enums/TipoRegistrador';


const AvancarInstrucoes: React.FC = () => {
    const arrInstrucoesConfirmadas = useRef<IInstrucoes[]>([]);
    const {
        arrRegistrador,
        arrCicloPorInstrucao,
        arrEstacaoReserva,
        arrInstrucoes,
        confirmado,
        cicloAtual,
        setCicloAtual,
        arrBufferReordenamento,
        tamnhoBuffer,
    } = useContext(IntrucaoContext);

    const avancarInstrucoes = () => {
        const instrucaoAtual = arrInstrucoesConfirmadas.current.shift();
        //TODO: se nao houver mais instrucoes nao procurar estacao reserva e sim executar os ciclos das estacoes
        //se nao houver mais instrucoes e nao houver estacao reserva ocupada, então acabou todo o ciclo
        let estacaoReservaVazia: IEstacaoReserva | undefined = undefined;
        console.log('arrEstacaoReserva', arrEstacaoReserva.value);
        console.log('arrInstrucoes', arrInstrucoes.value);
        console.log('arrInstrucoesConfirmadas.current', arrInstrucoesConfirmadas.current);
        console.log('instrucaoAtual', instrucaoAtual);

        if (!instrucaoAtual && arrInstrucoes.value.every(i => i.escrita === true) && arrEstacaoReserva.value.every(e => e.ocupada === false)) {
            alert("Fim do ciclo!");
            return;
        }
        const arrBufferAux = arrBufferReordenamento.value;
        setCicloAtual(cicloAtual + 1);
        const arrRegParaAtualizar: IRegistrador[] = [];
        const arrAuxER = arrEstacaoReserva.value.sort((a, b) => (a.Ciclos ?? 0) - (b.Ciclos ?? 0)).map(er => {
            if (er.ocupada) {
                const indiceInstrucaoNoBuffer = arrBufferAux.findIndex(b => b.idInstrucao === er.idInstrucao);
                let canCommit = true;
                arrBufferAux.forEach((b, ind) => {
                    if (ind < indiceInstrucaoNoBuffer) {
                        const i = arrInstrucoes.value.find(i => i.id === b.idInstrucao)
                        if (i && !i.commited) {
                            canCommit = false;
                        }
                    }
                });

                if (er.Ciclos === 1
                    && (er.Vj && er.Vk)
                    && er.TipoRegistrador !== TipoRegistrador.Load
                    && er.TipoRegistrador !== TipoRegistrador.Store
                    && er.idInstrucao !== estacaoReservaVazia?.idInstrucao
                ) {
                    er.A = `${er.Vj} + ${er.Vk}`;
                    er.Vj = undefined;
                    er.Vk = undefined;
                    er.Ciclos = er.Ciclos - 1;
                }
                else if (er.Ciclos === 0 && canCommit) {
                    const registradorNome =
                        er.destino?.startsWith('F') ?
                            er.destino :
                            arrInstrucoes.value.find(i => i.id === arrBufferAux[Number(er.destino) - 1].idInstrucao)!.entrada1;
                    const registradorValor = er.destino!;//`${er.nome}_${er.A!}`;
                    er.ocupada = false;
                    er.operacao = undefined;
                    er.Ciclos = undefined;
                    er.A = undefined;
                    er.Vj = undefined;
                    er.Vk = undefined;
                    er.Qj = undefined;
                    er.Qk = undefined;
                    er.destino = undefined;
                    er.idInstrucao = undefined;
                    er.registradorSendoUtilizado = undefined;

                    if (er.TipoRegistrador !== TipoRegistrador.Store) {
                        const regToEdit = arrRegistrador.findByStringId(registradorNome, "nome");
                        regToEdit.valor = registradorValor;
                        arrRegParaAtualizar.push(regToEdit);
                    }
                }
                else {
                    if (((er.Vj && er.Vk) || (er.TipoRegistrador === TipoRegistrador.Load || er.TipoRegistrador === TipoRegistrador.Store))) {
                        if (instrucaoAtual?.id !== er.idInstrucao) {
                            //@ts-expect-error
                            er.Ciclos = er.Ciclos - 1;
                            console.log('diminuiu nesse ciclo pra instrucao' + instrucaoAtual?.id)
                        }
                    }
                    else {
                        const qj = arrBufferAux[Number(er.Qj) - 1];
                        const instQj = arrInstrucoes.value.find(i => i.id === qj?.idInstrucao);
                        if (instQj?.escrita) {
                            er.Vj = er.Qj;
                            er.Qj = undefined;
                        }
                        const qk = arrBufferAux[Number(er.Qk) - 1];
                        const instQk = arrInstrucoes.value.find(i => i.id === qk?.idInstrucao);
                        if (instQk?.escrita) {
                            er.Vj = er.Qj;
                            er.Qj = undefined;
                        }
                    }
                }
            }
            else if (estacaoReservaVazia && er.nome === estacaoReservaVazia.nome) {
                er = estacaoReservaVazia;
            }
            return er;
        })
        if (instrucaoAtual !== undefined && arrBufferReordenamento.length < tamnhoBuffer) {
            if (!arrBufferAux.find(b => b.idInstrucao === instrucaoAtual.id))
                arrBufferAux.push({
                    idInstrucao: instrucaoAtual.id,
                })
            if (instrucaoAtual.nome === 'Add' || instrucaoAtual.nome === "Sub") {
                estacaoReservaVazia = arrEstacaoReserva.value.find(er => er.TipoRegistrador === TipoRegistrador.Inteiro && !er.ocupada);
            }
            else if (instrucaoAtual.nome === 'Mul') {
                estacaoReservaVazia = arrEstacaoReserva.value.find(er => er.TipoRegistrador === TipoRegistrador.Flutuante && !er.ocupada);
            }
            else if (instrucaoAtual.nome === 'Ldr') {
                estacaoReservaVazia = arrEstacaoReserva.value.find(er => er.TipoRegistrador === TipoRegistrador.Load && !er.ocupada);
            }
            else if (instrucaoAtual.nome === 'Str') {
                estacaoReservaVazia = arrEstacaoReserva.value.find(er => er.TipoRegistrador === TipoRegistrador.Store && !er.ocupada);
            }
            else if (instrucaoAtual.nome === 'B') {
                //TODO: implementar
                // estacaoReservaVazia = arrEstacaoReserva.value.find(er => er.TipoRegistrador === TipoRegistrador.Jump && !er.ocupada);
            }

            if (estacaoReservaVazia !== undefined) {
                if (estacaoReservaVazia.TipoRegistrador === TipoRegistrador.Load) {
                    estacaoReservaVazia.ocupada = true;
                    estacaoReservaVazia.idInstrucao = instrucaoAtual.id;
                    estacaoReservaVazia.operacao = instrucaoAtual.nome;
                    estacaoReservaVazia.Ciclos = arrCicloPorInstrucao.value.find(cpi => cpi.TipoInstrucao.toUpperCase() === instrucaoAtual.nome.toLocaleUpperCase())?.quantidade;
                    estacaoReservaVazia.A = `${instrucaoAtual.entrada2} + (${instrucaoAtual.entrada3})`;
                    const destinoIndex = arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada1);
                    estacaoReservaVazia.destino = destinoIndex !== -1 ? (destinoIndex + 1).toString() : instrucaoAtual.entrada1;
                    estacaoReservaVazia.registradorSendoUtilizado = instrucaoAtual.entrada3;
                }
                else if (estacaoReservaVazia.TipoRegistrador === TipoRegistrador.Store) {
                    estacaoReservaVazia.ocupada = true;
                    estacaoReservaVazia.idInstrucao = instrucaoAtual.id;
                    estacaoReservaVazia.operacao = instrucaoAtual.nome;
                    estacaoReservaVazia.Ciclos = arrCicloPorInstrucao.value.find(cpi => cpi.TipoInstrucao.toUpperCase() === instrucaoAtual.nome.toLocaleUpperCase())?.quantidade;
                    estacaoReservaVazia.A = `${instrucaoAtual.entrada2} + (${instrucaoAtual.entrada3})`;
                    const destinoIndex = arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada1);
                    estacaoReservaVazia.destino = destinoIndex !== -1 ? (destinoIndex + 1).toString() : instrucaoAtual.entrada1;
                    estacaoReservaVazia.registradorSendoUtilizado = instrucaoAtual.entrada3;
                }
                else if (estacaoReservaVazia.TipoRegistrador === TipoRegistrador.Inteiro) {
                    estacaoReservaVazia.ocupada = true;
                    estacaoReservaVazia.idInstrucao = instrucaoAtual.id;
                    estacaoReservaVazia.operacao = instrucaoAtual.nome;
                    estacaoReservaVazia.Ciclos = arrCicloPorInstrucao.value.find(cpi => cpi.TipoInstrucao.toUpperCase() === instrucaoAtual.nome.toLocaleUpperCase())?.quantidade;
                    const destinoIndex = arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada1);
                    estacaoReservaVazia.destino = destinoIndex !== -1 ? (destinoIndex + 1).toString() : instrucaoAtual.entrada1;
                    const estacaoPendenteEnt2 = arrEstacaoReserva.value.find(er => er.ocupada && (er.destino === (arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada2) + 1).toString() || er.destino === instrucaoAtual.entrada2));
                    const estacaoPendenteEnt3 = arrEstacaoReserva.value.find(er => er.ocupada && (er.destino === (arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada3) + 1).toString() || er.destino === instrucaoAtual.entrada3));
                    console.log('estacaoPendenteEnt3', estacaoPendenteEnt3)
                    if (estacaoPendenteEnt2) {
                        estacaoReservaVazia.Qj = (arrBufferAux.findIndex(b => b.idInstrucao === estacaoPendenteEnt2.idInstrucao) + 1).toString() //`${estacaoPendenteEnt2.nome}_${estacaoPendenteEnt2.destino}`;
                    }
                    else {
                        estacaoReservaVazia.Vj = (arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada2)).toString() //instrucaoAtual.entrada2
                        estacaoReservaVazia.Vj = estacaoReservaVazia.Vj === '-1' ? instrucaoAtual.entrada2 : estacaoReservaVazia.Vj + 1;
                    }
                    if (estacaoPendenteEnt3) {
                        estacaoReservaVazia.Qk = (arrBufferAux.findIndex(b => b.idInstrucao === estacaoPendenteEnt3.idInstrucao) + 1).toString() //`${estacaoPendenteEnt3.nome}_${estacaoPendenteEnt3.destino}`;
                    }
                    else {
                        estacaoReservaVazia.Vk = (arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada3)).toString() //instrucaoAtual.entrada2
                        estacaoReservaVazia.Vk = estacaoReservaVazia.Vk === '-1' ? instrucaoAtual.entrada3 : estacaoReservaVazia.Vk + 1;
                    }
                }
                else {
                    estacaoReservaVazia.ocupada = true;
                    estacaoReservaVazia.idInstrucao = instrucaoAtual.id;
                    estacaoReservaVazia.operacao = instrucaoAtual.nome;
                    estacaoReservaVazia.Ciclos = arrCicloPorInstrucao.value.find(cpi => cpi.TipoInstrucao.toUpperCase() === instrucaoAtual.nome.toLocaleUpperCase())?.quantidade;
                    const destinoIndex = arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada1);
                    estacaoReservaVazia.destino = destinoIndex !== -1 ? (destinoIndex + 1).toString() : instrucaoAtual.entrada1;
                    const estacaoPendenteEnt2 = arrEstacaoReserva.value.find(er => er.ocupada && (er.destino === (arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada2) + 1).toString() || er.destino === instrucaoAtual.entrada2));
                    const estacaoPendenteEnt3 = arrEstacaoReserva.value.find(er => er.ocupada && (er.destino === (arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada3) + 1).toString() || er.destino === instrucaoAtual.entrada3));
                    if (estacaoPendenteEnt2) {
                        estacaoReservaVazia.Qj = (arrBufferAux.findIndex(b => b.idInstrucao === estacaoPendenteEnt2.idInstrucao) + 1).toString() //`${estacaoPendenteEnt2.nome}_${estacaoPendenteEnt2.destino}`;
                    }
                    else {
                        estacaoReservaVazia.Vj = arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada2).toString() //instrucaoAtual.entrada2
                        estacaoReservaVazia.Vj = estacaoReservaVazia.Vj === '-1' ? instrucaoAtual.entrada2 : estacaoReservaVazia.Vj + 1;
                    }
                    if (estacaoPendenteEnt3) {
                        estacaoReservaVazia.Qk = (arrBufferAux.findIndex(b => b.idInstrucao === estacaoPendenteEnt3.idInstrucao) + 1).toString() //`${estacaoPendenteEnt3.nome}_${estacaoPendenteEnt3.destino}`;
                    }
                    else {
                        estacaoReservaVazia.Vk = arrBufferAux.findIndex(b => b.idInstrucao === instrucaoAtual.entrada3).toString() //instrucaoAtual.entrada2
                        estacaoReservaVazia.Vk = estacaoReservaVazia.Vk === '-1' ? instrucaoAtual.entrada3 : estacaoReservaVazia.Vk + 1;
                    }
                }
            }
            else {
                arrInstrucoesConfirmadas.current = [...[instrucaoAtual], ...arrInstrucoesConfirmadas.current];
            }
        }



        arrInstrucoes.setValue([...arrInstrucoes.value.map(i => {
            const instER = arrAuxER.find(e => e.idInstrucao === i.id);
            console.log('instER', instER)
            if (!i.enviada && arrBufferAux.find(b => b.idInstrucao === i.id)) {
                i.enviada = true;
            }
            if (instER) {
                i.enviada = true;
                if ((instER.Vj && instER.Vk) || instER.A !== undefined) {
                    i.executada = true;
                }
                if (instER.A !== undefined) {
                    i.escrita = true;
                }
            }
            else if (!instER && i.escrita) {
                i.commited = true;
            }

            return i;
        })])
        arrRegistrador.setValue([...arrRegistrador.value.map(r => {
            const regAttAtual = arrRegParaAtualizar.find(regAtt => regAtt.nome === r.nome);
            if (regAttAtual) {
                r.valor = regAttAtual.valor;
            }
            return r;
        })])
        arrBufferReordenamento.setValue([...arrBufferAux]);
        arrEstacaoReserva.setValue([...arrAuxER]);
    }

    const onStart = () => {
        if (cicloAtual === 0 && confirmado) {
            console.log('oi')
            arrInstrucoesConfirmadas.current = [...arrInstrucoes.value];
        }
        else if (!confirmado) {
            console.log('oi2')
            arrInstrucoesConfirmadas.current = [];
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onStart, [confirmado, cicloAtual])


    return (
        <Wrapper>
            <Tag
                color={confirmado ? 'processing' : 'default'}
            >
                Ciclo: {cicloAtual}
            </Tag>
            <Button
                onClick={avancarInstrucoes}
                disabled={!confirmado}
                type={'primary'}
            >
                Avançar
                <ArrowRightOutlined />
            </Button>
        </Wrapper >
    );
}

export default AvancarInstrucoes;

const Wrapper = styled.div`
	.ciclo-atual-label{
        margin-right: 10px;
    }
`;
