import React, { useContext } from 'react';
import styled from 'styled-components';
import { IEstacaoReserva, IntrucaoContext } from '../App';
import { TipoRegistrador } from '../Enums/TipoRegistrador';


const AvancarInstrucoes: React.FC = () => {
    const {
        arrRegistrador,
        arrCicloPorInstrucao,
        arrEstacaoReserva,
        arrInstrucoes,
        arrTipoRegistrador,
        confirmado,
        cicloAtual,
        setCicloAtual
    } = useContext(IntrucaoContext);

    const avancarInstrucoes = () => {
        setCicloAtual(cicloAtual + 1);

        const instrucaoAtual = arrInstrucoes.value.shift()!;
        //TODO: se nao houver mais instrucoes nao procurar estacao reserva e sim executar os ciclos das estacoes
        //se nao houver mais instrucoes e nao houver estacao reserva ocupada, então acabou todo o ciclo
        let estacaoReservaVazia: IEstacaoReserva | undefined = undefined;
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

        if (estacaoReservaVazia) {
            if (estacaoReservaVazia.TipoRegistrador === TipoRegistrador.Load) {
                //TODO: validar se o registradorSendoUtilizado estiver sendo utilizado por alguma outra estacao de reserva (ocupada === true)
                estacaoReservaVazia.ocupada = true;
                estacaoReservaVazia.operacao = instrucaoAtual.nome;
                estacaoReservaVazia.Ciclos = arrCicloPorInstrucao.findByStringId(instrucaoAtual.nome, 'TipoInstrucao').quantidade;
                estacaoReservaVazia.A = `${instrucaoAtual.entrada2} + (${instrucaoAtual.entrada3})`;
                estacaoReservaVazia.destino = instrucaoAtual.entrada1;
                estacaoReservaVazia.registradorSendoUtilizado = instrucaoAtual.entrada3;
            }
            if (estacaoReservaVazia.TipoRegistrador === TipoRegistrador.Store) {
                //TODO: validar se o registradorSendoUtilizado estiver sendo utilizado por alguma outra estacao de reserva (ocupada === true)
                //TODO: se exitir pendencia para o registrador entrada1 tem que colocar no Qj/Qk e nao no A
                estacaoReservaVazia.ocupada = true;
                estacaoReservaVazia.operacao = instrucaoAtual.nome;
                estacaoReservaVazia.Ciclos = arrCicloPorInstrucao.findByStringId(instrucaoAtual.nome, 'TipoInstrucao').quantidade;
                estacaoReservaVazia.A = `${instrucaoAtual.entrada2} + (${instrucaoAtual.entrada3})`;
                estacaoReservaVazia.destino = instrucaoAtual.entrada1;
                estacaoReservaVazia.registradorSendoUtilizado = instrucaoAtual.entrada3;
            }
        }
        else{
            // estacao ocupada para a instrucao, entao apenas fazer o ciclo das estacoes de reserva
        }

        //Implementar ciclo para cada item ocupado da estacao de reserva
        //Diminuir contador de ciclo analisando pendencias QJ/Qk 
        //Limpar estacao de reserva quando o contador de ciclo for 0
        //quando ciclo da estacao de reservar terminar passar o valor para o registrador
    }


    return (
        <Wrapper>
            <label className='ciclo-atual-label'>
                Ciclo: {cicloAtual}
            </label>
            <button
                onClick={avancarInstrucoes}
                disabled={!confirmado}
            >
                Avançar
            </button>
        </Wrapper >
    );
}

export default AvancarInstrucoes;

const Wrapper = styled.div`
	.ciclo-atual-label{
        margin-right: 10px;
    }
`;
