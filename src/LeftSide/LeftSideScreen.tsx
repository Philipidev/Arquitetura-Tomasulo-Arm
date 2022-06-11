import React from 'react';
import styled from 'styled-components';
import BotoesConfimarResetar from './BotoesConfimarResetar';
import CiclosPorInstrucao from './CiclosPorInstrucao';
import ListaInstrucoes from './ListaInstrucoes';
import QuantidadeTipoRegistrador from './QuantidadeTipoRegistrador';



const LeftSideScreen: React.FC = () => {

    return (
        <Wrapper>
            <ListaInstrucoes />
            <CiclosPorInstrucao />
            <QuantidadeTipoRegistrador />
            <BotoesConfimarResetar />
        </Wrapper >
    );
}

export default LeftSideScreen;

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
