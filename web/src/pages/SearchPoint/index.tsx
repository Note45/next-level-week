import React, { useState, ChangeEvent, useEffect} from 'react';
import axios from 'axios';

import './styles.css';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const SearchPoint = () => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedUf, setSelectedUf] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
    .then(response => {
      const cityNames = response.data.map(city => city.nome);

      setCities(cityNames);
    });
  }, [selectedUf]);

  async function handleClick() {
    console.log('Entrou HandleCLick')
    if(ufs.includes(selectedUf.toUpperCase()) === false || cities.includes(selectedCity) === false) {
      alert('Erro no valor do estado ou cidade!');
      return;
    }

    //go to page ListPointsSearch
  }

  function handleSelectedUf(event: ChangeEvent<HTMLInputElement>) {
    const uf = event.target.value;

    setSelectedUf(uf);
  }

  function handleSelectedCity(event: ChangeEvent<HTMLInputElement>) {
    const city = event.target.value;

    setSelectedCity(city);
  }
  
  return(
    <div className='containerSearchPoint'>
      <input
        type='text'
        name='Estado'
        id='uf'
        onChange={handleSelectedUf}
        placeholder='Digite o estado(UF)'
        maxLength={2}
        required
      />

      <input
        type='text'
        name='city'
        id='city'
        onChange={handleSelectedCity}
        placeholder='Digite a Cidade'
        required
      />
      
      <button 
        className='buttonSearch'
        onClick={handleClick}
      >
        <p className='buttonText'>Buscar</p>
      </button>
    </div>
  );
}

export default SearchPoint;