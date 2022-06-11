import React, { useState } from 'react';
import styled from 'styled-components';
import CiclosPorInstrucao from './CiclosPorInstrucao';
import InputInstrucao from './InputInstrucao';
import QuantidadeTipoRegistrador from './QuantidadeTipoRegistrador';



const ListaInstrucoes: React.FC = () => {
    const [quantidadeInstrucoes, setQuantidadeInstrucoes] = useState<number>(1);

    // const {

    // } = useContext(IntrucaoContext);

    const GerarCampoInstrucoes = () => {
        const arrFragmentInstrucao: JSX.Element[] = [];
        for (let i = 0; i < quantidadeInstrucoes; i++)
            arrFragmentInstrucao.push(<InputInstrucao key={`index-ionpt-instrucao-${i}`} index={i} />)
        return arrFragmentInstrucao;
    }

    return (
        <Wrapper>
            <div className='qtd-instrucoes-wrapper'>
                <label >
                    Quantidade de instruções:
                </label>
                <div className='qtd-instrucoes'>
                    <button
                        onClick={() => { if (quantidadeInstrucoes === 1) return; setQuantidadeInstrucoes(quantidadeInstrucoes - 1); }}
                    >
                        -
                    </button>

                    <input
                        type={'number'}
                        value={quantidadeInstrucoes}
                        onChange={(e) => { if (Number(e.target.value) <= 0) return; setQuantidadeInstrucoes(Number(e.target.value)) }}
                    />
                    <button
                        onClick={() => setQuantidadeInstrucoes(quantidadeInstrucoes + 1)}
                    >
                        +
                    </button>

                </div>
            </div>
            <div className='lista-de-instrucoes'>
                <label >
                    Lista de instruções:
                </label>
                {
                    GerarCampoInstrucoes()
                }
            </div>
            <CiclosPorInstrucao />
            <QuantidadeTipoRegistrador />
        </Wrapper >
    );
}

export default ListaInstrucoes;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
    

    .qtd-instrucoes-wrapper{
        display: flex;
        flex-direction: column;
        margin-bottom: 40px;
        align-items: center;
        -webkit-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
        -moz-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
        box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
        .qtd-instrucoes{
            display: flex;
            flex-direction: row;
        }
    }
    .input-instrucoes{
        display: flex;
        flex-direction: row;
    }
    .lista-de-instrucoes{
        -webkit-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
        -moz-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
        box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
        margin-bottom: 15px;
    }
`;
