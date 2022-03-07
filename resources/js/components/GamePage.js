import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function GamePage(props) {
    const { game } = props;
    const { slug } = useParams();
    let api_address = '';
    let token = '';
    window.addEventListener('message', (event) => {
        if (event.origin !== window.location.origin) {
            let data = event.data;
            if (data.loaded) {
                let game_address =
                    'https://fabricadejogos.portaleducacional.tec.br';
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                let iframe = document.getElementById('frame');
                const message = JSON.stringify({
                    user_token: token ? token : localStorage.getItem('token'),
                    api_address: api_address
                        ? api_address
                        : localStorage.getItem('api_address'),
                    game_address: game_address,
                    slug: slug,
                    aula_id: urlParams.has('aula_id')
                        ? urlParams.get('aula_id')
                        : 0,
                    conteudo_id: urlParams.has('conteudo_id')
                        ? urlParams.get('conteudo_id')
                        : 0
                });
                iframe.contentWindow.postMessage(message, '*');
                return;
            }
            api_address = data.api_address;
            token = data.user_token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios
                .get(`${api_address}/api/validate`, config)
                .then((response) => {
                    if (response.status === 200) {
                        console.log('okay');
                    }
                });
        }
    });
    let gameAddress = '';
    switch (game) {
        case 'quiz':
            gameAddress =
                'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/Quiz%20%281%29/index.html';
            break;
        case 'wordSearch':
            gameAddress =
                'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/Caca-Palavras%20%281%29/index.html';
            break;
        case 'anagram':
            gameAddress =
                'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/Anagrama%20%281%29/index.html';
            break;
        case 'trueOrFalse':
            gameAddress =
                'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/VerdadeiroOuFalso%20%282%29/index.html';
            break;
        case 'matchUp':
            gameAddress =
                'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/SignificadosDasPalavras%20%281%29/index.html';
            break;
        case 'memoryGame':
            gameAddress =
                'https://nyc3.digitaloceanspaces.com/metech/API-ATUALIZADA/JogoDaMemória%20%281%29/index.html';
            break;
    }
    return (
        <div>
            <iframe
                id="frame"
                src={gameAddress}
                height="100%"
                width="100%"
                frameBorder="0"
                allowFullScreen
                style={{
                    position: 'fixed',
                    top: '0px',
                    bottom: '0px',
                    right: '0px',
                    border: 'none',
                    margin: 0,
                    padding: 0,
                    overflow: 'hidden',
                    zIndex: 999999
                }}
            />
        </div>
    );
}
