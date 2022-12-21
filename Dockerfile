FROM node:16

# Create app directory
WORKDIR D:/Mtalkz/workingapp

# Install app dependencies
COPY package*.json ./


# RUN pip install -r requirements.txt
# COPY . ./
# EXPOSE 8080
# ENTRYPOINT ["python3", "app.py"]

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "app.js" ]