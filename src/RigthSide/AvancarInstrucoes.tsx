import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IEstacaoReserva, IInstrucoes, IntrucaoContext, IRegistrador } from '../App';
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
        setCicloAtual
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
        setCicloAtual(cicloAtual + 1);
        if (instrucaoAtual !== undefined) {
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
                    //TODO: validar se o registradorSendoUtilizado estiver sendo utilizado por alguma outra estacao de reserva (ocupada === true)
                    estacaoReservaVazia.ocupada = true;
                    estacaoReservaVazia.idInstrucao = instrucaoAtual.id;
                    estacaoReservaVazia.operacao = instrucaoAtual.nome;
                    estacaoReservaVazia.Ciclos = arrCicloPorInstrucao.value.find(cpi => cpi.TipoInstrucao.toUpperCase() === instrucaoAtual.nome.toLocaleUpperCase())?.quantidade;
                    estacaoReservaVazia.A = `${instrucaoAtual.entrada2} + (${instrucaoAtual.entrada3})`;
                    estacaoReservaVazia.destino = instrucaoAtual.entrada1;
                    estacaoReservaVazia.registradorSendoUtilizado = instrucaoAtual.entrada3;
                }
                else if (estacaoReservaVazia.TipoRegistrador === TipoRegistrador.Store) {
                    //TODO: validar se o registradorSendoUtilizado estiver sendo utilizado por alguma outra estacao de reserva (ocupada === true)
                    estacaoReservaVazia.ocupada = true;
                    estacaoReservaVazia.idInstrucao = instrucaoAtual.id;
                    estacaoReservaVazia.operacao = instrucaoAtual.nome;
                    estacaoReservaVazia.Ciclos = arrCicloPorInstrucao.value.find(cpi => cpi.TipoInstrucao.toUpperCase() === instrucaoAtual.nome.toLocaleUpperCase())?.quantidade;
                    estacaoReservaVazia.A = `${instrucaoAtual.entrada2} + (${instrucaoAtual.entrada3})`;
                    estacaoReservaVazia.destino = instrucaoAtual.entrada1;
                    estacaoReservaVazia.registradorSendoUtilizado = instrucaoAtual.entrada3;
                }
                else if (estacaoReservaVazia.TipoRegistrador === TipoRegistrador.Inteiro) {
                    //TODO: validar se o registradorSendoUtilizado estiver sendo utilizado por alguma outra estacao de reserva (ocupada === true)
                    estacaoReservaVazia.ocupada = true;
                    estacaoReservaVazia.idInstrucao = instrucaoAtual.id;
                    estacaoReservaVazia.operacao = instrucaoAtual.nome;
                    estacaoReservaVazia.Ciclos = arrCicloPorInstrucao.value.find(cpi => cpi.TipoInstrucao.toUpperCase() === instrucaoAtual.nome.toLocaleUpperCase())?.quantidade;
                    estacaoReservaVazia.destino = instrucaoAtual.entrada1;
                    const estacaoPendenteEnt2 = arrEstacaoReserva.value.find(er => er.ocupada && er.destino === instrucaoAtual.entrada2);
                    const estacaoPendenteEnt3 = arrEstacaoReserva.value.find(er => er.ocupada && er.destino === instrucaoAtual.entrada3);
                    if (estacaoPendenteEnt2) {
                        estacaoReservaVazia.Qj = `${estacaoPendenteEnt2.nome}_${estacaoPendenteEnt2.destino}`;
                    }
                    else {
                        estacaoReservaVazia.Vj = instrucaoAtual.entrada2
                    }
                    if (estacaoPendenteEnt3) {
                        estacaoReservaVazia.Qk = `${estacaoPendenteEnt3.nome}_${estacaoPendenteEnt3.destino}`;
                    }
                    else {
                        estacaoReservaVazia.Vk = instrucaoAtual.entrada3
                    }
                }
                // else if (estacaoReservaVazia.TipoRegistrador === TipoRegistrador.Flutuante) {
                else {
                    //TODO: validar se o registradorSendoUtilizado estiver sendo utilizado por alguma outra estacao de reserva (ocupada === true)
                    estacaoReservaVazia.ocupada = true;
                    estacaoReservaVazia.idInstrucao = instrucaoAtual.id;
                    estacaoReservaVazia.operacao = instrucaoAtual.nome;
                    estacaoReservaVazia.Ciclos = arrCicloPorInstrucao.value.find(cpi => cpi.TipoInstrucao.toUpperCase() === instrucaoAtual.nome.toLocaleUpperCase())?.quantidade;
                    estacaoReservaVazia.destino = instrucaoAtual.entrada1;
                    const estacaoPendenteEnt2 = arrEstacaoReserva.value.find(er => er.ocupada && er.destino === instrucaoAtual.entrada2);
                    const estacaoPendenteEnt3 = arrEstacaoReserva.value.find(er => er.ocupada && er.destino === instrucaoAtual.entrada3);
                    if (estacaoPendenteEnt2) {
                        estacaoReservaVazia.Qj = `${estacaoPendenteEnt2.nome}_${estacaoPendenteEnt2.destino}`;
                    }
                    else {
                        estacaoReservaVazia.Vj = instrucaoAtual.entrada2
                    }
                    if (estacaoPendenteEnt3) {
                        estacaoReservaVazia.Qk = `${estacaoPendenteEnt3.nome}_${estacaoPendenteEnt3.destino}`;
                    }
                    else {
                        estacaoReservaVazia.Vk = instrucaoAtual.entrada3
                    }
                }
            }
            else {
                arrInstrucoesConfirmadas.current = [...[instrucaoAtual], ...arrInstrucoesConfirmadas.current];
            }
        }

        const arrRegParaAtualizar: IRegistrador[] = [];
        const arrAuxER = arrEstacaoReserva.value.sort((a, b) => (a.Ciclos ?? 0) - (b.Ciclos ?? 0)).map(er => {
            if (er.ocupada) {
                if (er.Ciclos === 1 && (er.Vj && er.Vk) && er.TipoRegistrador !== TipoRegistrador.Load && er.TipoRegistrador !== TipoRegistrador.Store) {
                    er.A = `${er.Vj} + ${er.Vk}`;
                    er.Vj = undefined;
                    er.Vk = undefined;
                    er.Ciclos = er.Ciclos - 1;
                }
                else if (er.Ciclos === 0) {
                    const registradorNome = `${er.destino!}`;
                    const registradorValor = `${er.nome}_${er.A!}`;
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

                    const regToEdit = arrRegistrador.findByStringId(registradorNome, "nome");
                    regToEdit.valor = registradorValor;
                    arrRegParaAtualizar.push(regToEdit);
                }
                else {
                    if ((er.Vj && er.Vk) || (er.TipoRegistrador === TipoRegistrador.Load || er.TipoRegistrador === TipoRegistrador.Store)) {
                        //@ts-expect-error
                        er.Ciclos = er.Ciclos - 1;
                    }
                    else {
                        const regAttQj = arrRegParaAtualizar.find(regAtt => regAtt.nome === er.Qj?.split('_')[1]);
                        if (regAttQj) {
                            er.Qj = undefined;
                            er.Vj = regAttQj.valor.split('_')[1];
                        }
                        const regAttQk = arrRegParaAtualizar.find(regAtt => regAtt.nome === er.Qk?.split('_')[1]);
                        if (regAttQk) {
                            er.Qk = undefined;
                            er.Vk = regAttQk.valor.split('_')[1];
                        }
                    }
                }
            }
            else if (estacaoReservaVazia && er.nome === estacaoReservaVazia.nome) {
                er = estacaoReservaVazia;
            }
            return er;
        })
        arrInstrucoes.setValue([...arrInstrucoes.value.map(i => {
            const instER = arrAuxER.find(e => e.idInstrucao === i.id);
            if (instER) {
                i.enviada = true;
                if (instER.A !== undefined)
                    i.executada = true;
            }
            else if (!instER && i.executada)
                i.escrita = true;

            return i;
        })])
        arrRegistrador.setValue([...arrRegistrador.value.map(r => {
            const regAttAtual = arrRegParaAtualizar.find(regAtt => regAtt.nome === r.nome);
            if (regAttAtual) {
                r.valor = regAttAtual.valor;
            }
            return r;
        })])
        arrEstacaoReserva.setValue([...arrAuxER]);
    }

    const onStart = () => {
        if (confirmado) {
            arrInstrucoesConfirmadas.current = [...arrInstrucoes.value];
        }
        else {
            arrInstrucoesConfirmadas.current = [];
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onStart, [confirmado])


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
