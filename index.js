import app from "./app";

app.listen(app.get('port'), () => {
    console.log("Aplicação rodando na porta $(app.get('port'))");
});