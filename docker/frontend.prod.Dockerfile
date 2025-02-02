# ---------------------
#  ETAPA 1: BUILD
# ---------------------
    FROM node:20 as build

    WORKDIR /app
    
    # Copiamos sólo los archivos de dependencias primero (para caché)
    COPY frontend/package*.json ./
    RUN npm install
    
    # Copiamos el resto del código del frontend
    COPY frontend/ .
    
    # Construimos el bundle de producción (carpeta /app/build)
    RUN npm run build
    
    
    # ---------------------
    #  ETAPA 2: NGINX
    # ---------------------
    FROM nginx:alpine
    
    # Copiamos el bundle generado en la etapa de build a la carpeta pública de Nginx
    COPY --from=build /app/build /usr/share/nginx/html
    
    # Exponemos el puerto 80 para servir la app
    EXPOSE 80
    
    # Arrancamos Nginx en primer plano
    CMD ["nginx", "-g", "daemon off;"]
    