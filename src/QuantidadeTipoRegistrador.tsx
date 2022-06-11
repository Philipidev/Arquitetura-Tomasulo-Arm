import { Input } from 'antd';
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
                        <Input
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
    margin-top: 12px;
    align-items: end;

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
