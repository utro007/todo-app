# Osnovna slika Node.js (alpine = majhna in optimizirana za produkcijo)
FROM node:18-alpine

# Nastavimo delovno mapo znotraj kontejnerja
WORKDIR /app

# Kopiramo package.json in lockfile (če obstaja)
# To omogoča hitrejše cache-iranje npm install koraka
COPY package*.json ./

# Namestimo samo produkcijske odvisnosti (brez devDependencies)
RUN npm install --production

# Kopiramo preostalo projektno kodo
COPY . .

# Ustvarimo ne-privilegiranega uporabnika (bolj varno kot root)
RUN addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001

# Nastavimo lastništvo datotek za novega uporabnika
RUN chown -R nextjs:nodejs /app

# Preklopimo na ne-root uporabnika
USER nextjs

# Kontejner bo izpostavil aplikacijo na port 3000
EXPOSE 3000

# Privzeti ukaz za zagon aplikacije
CMD ["npm", "start"]
