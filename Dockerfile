# Usar la imagen oficial de Node.js 20
FROM node:20

 
# Install all the dependencies in the container using the package.json file
COPY package.json .
RUN npm install --legacy-peer-deps
 
# Copy the remaining project files to the container
COPY . .
 
# Expose the application port
EXPOSE 3000
 
# Run the App
CMD npm start