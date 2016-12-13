FROM node:4.3.2

RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm install --global npm@3.7.5

ENV HOME=/home/app

COPY package.json npm-shrinkwrap.json $HOME/testes-automatizados/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/testes-automatizados
RUN npm cache clean && npm install --silent --progress=false

USER root
COPY . $HOME/testes-automatizados
RUN chown -R app:app $HOME/*
USER app

CMD ["npm", "start"]
