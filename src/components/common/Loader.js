import React from 'react'
import { css } from '@emotion/core';
import { PacmanLoader } from 'react-spinners';
import './loader.scss'

const override = css`
    display: block;
    margin: 80px auto;
    width: 110px;
`;

const Loader = ({loading}) => (
  loading ? (
    <div className='loader-wrapper'>
      <PacmanLoader
        css={override}
        sizeUnit={"px"}
        size={25}
        color={'#2993bb'}
        loading={true}
      />
    </div>
  ) : null
)

export default Loader