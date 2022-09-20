# Projeto (Node.js + Express + Jest + Docker)

Micro-serviço para visualização da temperatura atual de uma cidade, além de um status de alerta, com base na API [OpenWeatherMap](https://openweathermap.org/current).

Há três endpoints: root com os endpoints disponíveis; name recebe como parâmetro o nome da cidade; coords recebe como parâmetro latitude e longitude. O retorno dos endpoints é a temperatura, humidade e status. 

## Tecnologias utilizadas:

- NodeJs
- ExpressJs
- Jest 
- Axios 
- swagger-autogen
- Docker

## Regras de negócio:

- Se a umidade do ar estiver abaixo de 30%, deve ser indicado um status de “Umidade baixa”
- Se a temperatura (Celsius) estiver acima de 30 graus, deve ser indicado um status de
"Risco de ensolação”.
- Se a temperatura está entre 10 e 30 graus, e umidade acima de 30%, deve ser indicado um
status de “Nenhum risco eminente”.
- Se a temperatura estiver abaixo de 10 graus, deve ser indicado um status de “Frio Intenso”.
- Status fora das condições anteriores retornam "Status desconhecido".


## Uso

Dentro da pasta do projeto, crie a imagem:

```
$ docker build . -t <nome que desejar>
```

Rode o container, a porta 3000 está definida no Dockerfile que será executada:

```
$ docker run -p 3000:3000 <nome dado ao container>
```
Para mais informação em relação ao [Dockerfile](https://docs.docker.com/engine/reference/builder/)

Instale as dependências:

```
$ npm i
```

Para executar e gerar a documentação use o comando:

```
$ npm run doc
```

Para executar sem gerar documentação use o comando:

```
$ npm start
```

Para executar o teste use o comando:

```
$ npm test
```

### Portas:

- http://localhost:3000

### Endpoints:

- /name/:name
- /coords/:lat/:lon
- /documentation"

