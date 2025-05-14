
Este README incluye:
1. Instrucciones claras de instalación
2. Configuración esencial
3. Comandos Docker clave
4. Solución de problemas comunes


# Virtual Wallet - Docker Deployment

![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

Aplicación de billetera virtual con arquitectura de 3 capas utilizando Docker.

## 🚀 Requisitos Previos

- Docker 20.10+
- Docker Compose 2.0+
- 2 GB de RAM disponible
- Puerto 3000, 8080, 8081 y 27017 libres

## 📥 Instalación

1. **Clonar repositorio**
```bash
git clone https://github.com/jesuschavez1994/virtual-wallet.git
cd virtual-wallet

2. **Iniciar con Docker compose**

# Construir imágenes y levantar contenedores
docker-compose up --build

# Modo detached
docker-compose up -d

2. **Comando esenciales**
# Detener todos los servicios
docker-compose down

# Reiniciar servicio específico
docker-compose restart service-client

# Ver logs en tiempo real
docker-compose logs -f --tail=100

# Eliminar volúmenes persistentes
docker-compose down -v

# Reconstruir sin caché
docker-compose build --no-cache