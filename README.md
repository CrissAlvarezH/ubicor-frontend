## Go to [ubicor.alvarezcristian.com](https://ubicor.alvarezcristian.com) to see in production

# Ubicor
Is a web to see the entire university in a map with its blocks and rooms.

# Screenshots

## Home mobile
<img width="300px" src="https://github.com/CrissAlvarezH/ubicor-frontend/blob/main/docs/imgs/ubicor-frontend-home-mobile.gif"/>

## Building details (mobile)
<img width="300px" src="https://github.com/CrissAlvarezH/ubicor-frontend/blob/main/docs/imgs/ubicor-frontend-buildings-details.gif"/>

## Desktop version
<img width="920px" src="https://github.com/CrissAlvarezH/ubicor-frontend/blob/main/docs/imgs/ubicor-frontend-home-desktop.png"/>


# Configurar entorno de desarrollo

```
# Construimos la imagen
# Nota: si quiere cambiar el dominio al cual el api apunta en build time, use el siguiente comando
# `export API_DOMAIN=https://domain.com`, por defecto es `https://api.ubicor.alvarezcristian.com`
make build

# Definimos las variables de entorno por defecto
cp .env.local.example .env.local

# Corremos el proyecto
make dev
```