FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Build app
RUN npm run build

# clean up
RUN npm prune --omit=dev
# delete everything except node_modules, package.json and package-lock.json, and dist
RUN find . -not -path "./node_modules*" -not -path "./package*" -not -path "./dist*" -delete

# Run app
CMD [ "npm", "start" ]