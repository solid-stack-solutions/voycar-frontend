FROM node:22-alpine
WORKDIR /app

# Install dependencies from package-lock.json
COPY ["package*.json", "."]
RUN npm ci

# Build from source
COPY . .
RUN npm run build

# Run build
EXPOSE 5173
CMD ["npm", "run", "preview", "--", "--host", "--port", "5173"]