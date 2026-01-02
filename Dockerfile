# 1. Use the official Node.js 24 Alpine image
FROM node:24-alpine

# 2. Set environment to production
ENV NODE_ENV=production

# 3. Set the working directory
WORKDIR /usr/src/app

# 4. Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# 5. Copy the rest of the application code
COPY --chown=node:node . .

# 6. Switch to the non-root user
USER node

# 7. Expose the port (Documentation only)
EXPOSE 3000

# 8. Define the command to run the app
CMD ["node", "server.js"]