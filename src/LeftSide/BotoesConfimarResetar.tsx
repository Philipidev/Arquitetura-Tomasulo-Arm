import React, { useContext } from 'react';
import styled from 'styled-components';
import { reduceEachTrailingCommentRange } from 'typescript';
import { IntrucaoContext } from '../App';
import { TipoInstrucao } from '../Enums/TipoInstrucao';
import { TipoRegistrador } from '../Enums/TipoRegistrador';



const BotoesConfimarResetar: React.FC = () => {

    const {
        arrInstrucoes,
        arrCicloPorInstrucao,
        arrTipoRegistrador,
        arrEstacaoReserva,
        setQuantidadeInstrucoes,
        confirmado, setConfirmado,
    } = useContext(IntrucaoContext);

    const onCliqueConfirmar = () => {
        if (arrInstrucoes.value.length <= 0) {
            alert('Não há instruções para confirmar');
            return;
        }
        let ehValido = true;
        arrInstrucoes.value.forEach((i, ind) => {
            console.log(i)
            if (i.nome === TipoInstrucao.Add && (!i.entrada1 || !i.entrada2 || !i.entrada3)) {
                ehValido = false;
                alert(`'Instrução ${ind + 1}' ADD deve ter 3 entradas`);
            }
            if (i.nome === TipoInstrucao.Sub && (!i.entrada1 || !i.entrada2 || !i.entrada3)) {
                ehValido = false;
                alert(`'Instrução ${ind + 1}' SUB deve ter 3 entradas`);
            }
            if (i.nome === TipoInstrucao.Mul && (!i.entrada1 || !i.entrada2 || !i.entrada3)) {
                ehValido = false;
                alert(`'Instrução ${ind + 1}' MUL deve ter 3 entradas`);
            }
            if (i.nome === TipoInstrucao.Div && (!i.entrada1 || !i.entrada2 || !i.entrada3)) {
                ehValido = false;
                alert(`'Instrução ${ind + 1}' DIV deve ter 3 entradas`);
            }
            //TODO mais validacoes
        })
        if (!ehValido)
            return;

        // arrInstrucoes.setValue([...arrInstrucoes.value.map(i => {
        //     i.Ciclos = arrCicloPorInstrucao.findByStringId(i.nome, 'TipoInstrucao').quantidade;
        //     return i;
        // })]);

        // arrEstacaoReserva.setValue([...arrEstacaoReserva.value.map(er => {
        //     if(TipoRegistrador.DivF === er.TipoRegistrador){
        //         er.Ciclos = arrCicloPorInstrucao.findByStringId(TipoInstrucao.Div, 'TipoInstrucao').quantidade;
        //     }
        //     else  if(TipoRegistrador.Inteiro === er.TipoRegistrador){
        //         er.Ciclos = arrCicloPorInstrucao.findByStringId(TipoInstrucao.Div, 'TipoInstrucao').quantidade;
        //     }
        //     else if(TipoRegistrador.MulF === er.TipoRegistrador){
        //         er.Ciclos = arrCicloPorInstrucao.findByStringId(TipoInstrucao.Mul, 'TipoInstrucao').quantidade;
        //     }
        //     return er;
        // })])

        setConfirmado(true);
    }

    const onCliqueResetar = () => {
        setConfirmado(false);
        setQuantidadeInstrucoes(1);
        arrTipoRegistrador.setValue(Object.keys(TipoRegistrador).map((i: any, ind: number) => {
            return (
                {
                    quantidade: 1,
                    TipoRegistrador: i
                }
            )
        }))
        arrCicloPorInstrucao.setValue(Object.keys(TipoInstrucao).map((i: any, ind: number) => {
            return (
                {
                    quantidade: 1,
                    TipoInstrucao: i
                }
            )
        }))
        const instrucaoDefault = arrInstrucoes.value[0];
        instrucaoDefault.nome = 'Add';
        instrucaoDefault.entrada1 = '';
        instrucaoDefault.entrada2 = '';
        instrucaoDefault.entrada3 = undefined;
        instrucaoDefault.enviada = false;
        instrucaoDefault.executada = false;
        instrucaoDefault.escrita = false;
        arrInstrucoes.setValue([...[instrucaoDefault]]);
    }

    return (
        <Wrapper>
            <button
                disabled={confirmado}
                onClick={() => onCliqueConfirmar()}
            >
                Confirmar
            </button>
            <button
                onClick={() => onCliqueResetar()}
            >
                Resetar
            </button>
        </Wrapper >
    );
}

export default BotoesConfimarResetar;

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
    width: 50%;
    justify-content: space-evenly;
    -webkit-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    -moz-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
`;
