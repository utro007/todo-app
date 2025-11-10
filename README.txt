# ToDo App

ToDo App je spletna aplikacija za upravljanje opravil, razvita kot del učne naloge. 
Projekt je sestavljen iz **Spring Boot** backend-a, **Node.js/Express** frontend-a in **MySQL** podatkovne baze. 
Aplikacija omogoča ustvarjanje, urejanje, označevanje dokončanih opravil ter brisanje opravil.

---

## 1. Dokumentacija za razvijalce

### Projektna struktura

todo-app/
│
├─ backend/ # Spring Boot REST API
│ ├─ src/main/java/... # Kontrolerji, servisi, modeli, repozitoriji
│ ├─ src/main/resources/ # application.properties (povezava na MySQL)
│ └─ pom.xml # Maven odvisnosti in konfiguracija
│
├─ frontend/ # Node.js + Express strežnik
│ ├─ public/ # Statične datoteke (HTML, CSS, JS)
│ ├─ views/ # EJS predloge (če uporabljene)
│ ├─ package.json # Node odvisnosti
│ └─ server.js # Vstopna točka frontenda
│
└─ docker-compose.yml # (Opcijsko) Docker orkestracija

### Tehnologije in verzije

| Tehnologija | Verzija | Namen |
|------------|---------|--------|
| Java | 17+ | Poganjanje backend aplikacije |
| Spring Boot | 3.x | Backend REST API |
| Node.js | 18+ | Frontend strežnik |
| MySQL | 8.x | Relacijska podatkovna baza |
| Maven | 3.x | Upravljanje odvisnosti backend |
| npm | 9.x | Upravljanje odvisnosti frontend |

### Standardi kodiranja
- Backend uporablja **MVC arhitekturo** (Controller → Service → Repository).
- Komunikacija frontenda in backend-a poteka prek **REST API**.
- Logika in viri so ločeni po nivojih in modulih.

---

## 2. Navodila za namestitev

### Predpogoji
Pred zagonom potrebujete:
- Java 17+
- Node.js 18+
- MySQL 8+
- Maven
- Dostop do terminala

### 2.1. Ustvarite podatkovno bazo

V MySQL zaženite:

```sql
CREATE DATABASE todo_app;
Nato v backend/src/main/resources/application.properties nastavite:


spring.datasource.url=jdbc:mysql://localhost:3306/todo_app
spring.datasource.username=VAŠ_UPORABNIK
spring.datasource.password=VAŠE_GESLO
spring.jpa.hibernate.ddl-auto=update

2.2. Zagon backend strežnika
cd backend
mvn spring-boot:run
Backend bo tekel na:

http://localhost:8080
2.3. Namestitev in zagon frontenda
bash
Kopiraj kodo
cd ../frontend
npm install
npm start
Frontend bo na naslovu:

http://localhost:3000
3. Navodila za razvijalce (prispevanje)
Fork-aj repozitorij na GitHubu

Ustvari novo vejo:

git checkout -b feature/ime-funkcije
Naredi spremembe in commite:

git commit -m "Dodana nova funkcionalnost"
Push:

git push origin feature/ime-funkcije
Odpri Pull Request

Pravila prispevanja
Ne briši obstoječe funkcionalnosti brez utemeljitve.

Pred PR preveri, da sistem teče brez napak.

Koda naj bo berljiva in strukturirana.

4. API (osnovni endpoints)
Metoda	Endpoint	Opis
GET	/api/todos	Pridobi vsa opravila
POST	/api/todos	Dodaj novo opravilo
PUT	/api/todos/{id}	Posodobi določeno opravilo
DELETE	/api/todos/{id}	Odstrani opravilo
