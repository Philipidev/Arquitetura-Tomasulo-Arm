import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { IEstacaoReserva, IntrucaoContext } from './App';
import { TipoRegistrador } from './Enums/TipoRegistrador';

interface IProps {
}

const QuantidadeTipoRegistrador: React.FC<IProps> = () => {
    const {
        arrEstacaoReserva,
        arrTipoRegistrador,
    } = useContext(IntrucaoContext);


    const onArrTipoRegistradorChanges = () => {
        console.log('aaa')
        const arrAuxEstacaoReserva = arrTipoRegistrador.value.flatMap((tr, index) => {
            const arrAux: IEstacaoReserva[] = [];
            for (let count = 0; count < tr.quantidade; count++) {
                arrAux.push({
                    TipoRegistrador: tr.TipoRegistrador,
                    ocupada: false,
                })
            }
            return arrAux;
        })

        arrEstacaoReserva.setValue([...arrAuxEstacaoReserva]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(onArrTipoRegistradorChanges, [arrTipoRegistrador.value])

    console.log("arrEstacaoReserva", arrEstacaoReserva.value)

    return (
        <Wrapper>
            <label>
                Quantidade tipo registrador:
            </label>
            {
                Object.keys(TipoRegistrador).map((i: any, ind: number) =>
                    <div className='tipo-registrador' key={'tipo-registrador-' + ind}>
                        <label>
                            {i}
                        </label>
                        <input
                            value={arrTipoRegistrador.findByStringId(i, 'TipoRegistrador').quantidade}
                            type="number"
                            onChange={(e) => {
                                if (Number(e.target.value) <= 0) return;
                                arrTipoRegistrador.setValue(
                                    [
                                        ...arrTipoRegistrador.value.map(cpi => {
                                            if (cpi.TipoRegistrador === i) {
                                                cpi.quantidade = Number(e.target.value);
                                            }
                                            return cpi;
                                        })
                                    ])
                            }}
                        />

                    </div>
                )
            }
        </Wrapper>
    );
}

export default QuantidadeTipoRegistrador;

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
    margin-bottom: 15px;
    align-items: end;
    -webkit-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    -moz-box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);
    box-shadow: 8px 7px 28px -17px rgba(29,26,71,0.57);

    .tipo-registrador{
        display: flex;
        flex-direction: row;
        margin-bottom: 3px;
        
        label{
            margin-right: 10px;
        }
    }

    input{
        width: 100px;
    }
`;
