import React from 'react';
import styled from 'styled-components';
import AvancarInstrucoes from './AvancarInstrucoes';
import TabelaEstacaoReserva from './TabelaEstacaoReserva';
import TabelaRegistradores from './TabelaRegistradores';
import TabelasInstrucoes from './TabelasInstrucoes';


const RigthSideScreen: React.FC = () => {

    return (
        <Wrapper>
            <div className='registradores'>
                <AvancarInstrucoes />
                <TabelaRegistradores />
            </div>
            <div className='instrucao-estacao-reserva'>
                <TabelasInstrucoes />
                <TabelaEstacaoReserva />
            </div>
        </Wrapper >
    );
}

export default RigthSideScreen;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
    height: 100%;
    position: relative;

    .registradores{
        top: 0;
        align-items: center;
        position: absolute;
        display: flex;
        flex-direction: column;
        margin-top: 20px;
    }

    .instrucao-estacao-reserva{
        max-height: 600px;
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-around;
    }
`;
