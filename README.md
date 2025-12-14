# ToDo App

ToDo App je spletna aplikacija za upravljanje opravil, razvita kot del učne naloge. 
Projekt je sestavljen iz **Spring Boot** backend-a, **Node.js/Express** frontend-a in **MySQL** podatkovne baze. 
Aplikacija omogoča ustvarjanje, urejanje, označevanje dokončanih opravil ter brisanje opravil.

---

## 1. Dokumentacija za razvijalce

### Projektna struktura

todo-app/<br />
│<br />
├─ backend/ # Spring Boot REST API<br />
│ ├─ src/main/java/... # Kontrolerji, servisi, modeli, repozitoriji<br />
│ ├─ src/main/resources/ # application.properties (povezava na MySQL)<br />
│ ├─ src/test/java/... # Unit testi za backend funkcionalnosti<br />
│ └─ pom.xml # Maven odvisnosti in konfiguracija<br />
│<br />
├─ frontend/ # Node.js + Express strežnik<br />
│ ├─ public/ # Statične datoteke (HTML, CSS, JS)<br />
│ ├─ views/ # EJS predloge (če uporabljene)<br />
│ ├─ package.json # Node odvisnosti<br />
│ └─ server.js # Vstopna točka frontenda<br />
│<br />
├─ testiranje/ # Mapa z dokumentacijo o testiranju<br />
│ └─ porocilo_testiranja.md # Poročilo o unit testiranju<br />
│<br />
└─ docker-compose.yml # (Opcijsko) Docker orkestracija<br />

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
```
Nato v backend/src/main/resources/application.properties nastavite:


spring.datasource.url=jdbc:mysql://localhost:3306/todo_app
spring.datasource.username=VAŠ_UPORABNIK
spring.datasource.password=VAŠE_GESLO
spring.jpa.hibernate.ddl-auto=update

### 2.2. Zagon backend strežnika
cd backend
mvn spring-boot:run
Backend bo tekel na:

http://localhost:8080<br />
### 2.3. Namestitev in zagon frontenda
bash
Kopiraj kodo
cd ../frontend
npm install
npm start
Frontend bo na naslovu:

http://localhost:3000<br />
## 3. Navodila za razvijalce (prispevanje)
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

## 4. API (osnovni endpoints)
Metoda	Endpoint	Opis
GET	/api/todos	Pridobi vsa opravila
POST	/api/todos	Dodaj novo opravilo
PUT	/api/todos/{id}	Posodobi določeno opravilo
DELETE	/api/todos/{id}	Odstrani opravilo

## 5. Vizija projekta

Vizija projekta Todo aplikacije je uporabnikom omogočiti enostavno, pregledno in učinkovito upravljanje njihovih nalog v vsakodnevnem življenju. Aplikacija omogoča ustvarjanje, urejanje, pregledovanje, filtriranje in dokončanje nalog na zanimiv način.
Cilj aplikacije je izboljšati organizacijo in produktivnost uporabnika tako, da mu pomaga ohranjati pregled nad obveznostmi ter zmanjšati stres, ki nastane zaradi pozabljanja nalog. Aplikacija je zasnovana tako, da je preprosta za uporabo, vizualno prijetna in dostopna na različnih napravah.
Aplikacija je namenjena:<br />
 - študentom, ki želijo spremljati šolske obveznosti,<br />
 - zaposlenim, ki želijo organizirati delovne naloge,<br />
 - posameznikom, ki želijo strukturirati vsakodnevna opravila.<br />
V prihodnosti bi v aplikacijo vključili še prijavo in registracijo uporabnikov, da lahko shranijo vsa opravila. Uporabniki bi lahko tudi shranili vsa opravila.

## 6. Besednjak
| Izraz                 | Pomen                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------- |
| **Todo**              | Posamezna naloga ali opravilo, ki ga uporabnik želi spremljati.                          |
| **Seznam nalog**      | Prikaz vseh nalog, ki jih je uporabnik ustvaril.                                         |
| **Aktivna naloga**    | Naloga, ki še ni bila označena kot opravljena.                                           |
| **Opravljena naloga** | Naloga, ki jo je uporabnik označil kot končano.                                          |
| **Opis naloge**       | Dodatni opis, komentar ali opomba, povezana z nalogo.                                    |
| **Status naloge**     | Lastnost, ki označuje ali je naloga dokončana ali ne.                                    |
| **Filtriranje**       | Funkcionalnost, ki omogoča prikaz samo določenega tipa nalog (npr. opravljene, aktivne). |
| **API**               | Vmesnik med frontendom in backendom za izmenjavo podatkov.                               |
| **Backend**           | Strežniški del aplikacije, ki upravlja podatke in poslovno logiko.                       |
| **Frontend**          | Uporabniški del aplikacije, kjer uporabnik vidi in uporablja aplikacijo.                 |

## 7.DPU
<img width="693" height="701" alt="RIS drawio (2)" src="https://github.com/user-attachments/assets/7310f5f3-e5be-4b4a-9375-944da64c4569" />


## 8. Podrobni opisi
<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Dodaj opravilo</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 1</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Uporabnik želi ustvariti novo opravilo.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Aplikacija je zagnana, uporabnik ima dostop do obrazca za dodajanje nalog.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: V bazo se doda novo opravilo.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br>
         1.Korak: Uporabnik klikne »Dodaj opravilo«.<br> 
         2.Korak: Sistem prikaže obrazec.<br>
         3.Korak: Uporabnik vnese naslov, rok, kategorijo ipd.<br>
         4.Korak: Sistem preveri podatke.<br>
         5.Korak: Sistem shrani opravilo.<br>
         6.Korak: Sistem ponudi dodatne vključene korake: Dodaj opis opravila, Dodaj opravilo v koledar<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Neveljavni podatki → sistem vrne napako.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Napaka v bazi → obvestilo.</td>
    </tr>
</table>


<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Dodaj opis opravila</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 2</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Dodati podrobnejši opis opravila.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Opravilo je v postopku dodajanja ali urejanja.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Opis se zapiše k opravilu.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br>
         1.Korak: Uporabnik vnese opis..<br> 
         2.Korak: Sistem ga shrani.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Predolg opis → sistem vrne napako.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Prevelika dolžina opisa.</td>
    </tr>
</table>




<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Dodaj opravilo v koledar</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 3</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Uporabnik želi, da se opravilo prikaže tudi v koledarju.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Opravilo ima določen rok.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: V koledarju se ustvari dogodek povezan z opravilo.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Sistem preveri, ali je določen datum.<br>
         2.Korak: Sistem ustvari koledarski dogodek.<br>
         3.Korak: Dogodek se poveže z opravilom.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Uporabnik ne določi datuma → opozorilo.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Dogodek se ne ustvari — sistem izpiše napako, opravilo pa kljub temu ostane ustvarjeno.</td>
    </tr>
</table>





<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Uredi opravilo</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 4</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Spremeniti podatke obstoječega opravila.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Opravilo obstaja.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Podatki opravila se posodobijo.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Uporabnik klikne na opravilo.<br>
         2.Korak: Sistem prikaže obrazec.<br>
         3.Korak: Uporabnik spremeni podatke.<br>
         4.Korak: Sistem jih preveri in shrani.<br>
         5.Korak: Možnost označitve kot dokončano.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Urejeni podatki niso veljavni → opozorilo.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Neveljavni podatki → napaka. </td>
    </tr>
</table>


<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Označi kot dokončano</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 5</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Označiti, da je naloga opravljena.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Opravilo obstaja in trenutno ni označeno kot dokončano.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Opravilo se označi kot dokončano.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Uporabnik klikne na »Označi kot dokončano«.<br>
         2.Korak: Sistem spremeni status opravila v dokončano.<br>
         3.Korak: Sistem prikaže posodobljeni seznam opravil.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Opravilo je že dokončano → možnost se ne prikaže.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Napaka pri shranjevanju statusa → opozorilo uporabniku.</td>
    </tr>
</table>


<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Izbriši opravilo</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 6</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Uporabnik želi odstraniti opravilo iz sistema.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Opravilo obstaja in je prikazano uporabniku.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Opravilo je trajno izbrisano iz baze podatkov.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Uporabnik klikne »Izbriši«.<br>
         2.Korak: Sistem zahteva potrditev izbrisa.<br>
         3.Korak: Uporabnik potrdi izbris.<br>
         4.Korak: Sistem izbriše opravilo iz baze.<br>
         5.Korak: Sistem posodobi seznam opravil.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Uporabnik prekliče izbris → opravilo ostane nespremenjeno.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Napaka brisanja iz baze → sistem vrne napako.</td>
    </tr>
</table>


<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Prikaži opravila</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 7</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Prikazati uporabniku seznam vseh opravil.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik, Gost</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Opravila obstajajo v sistemu.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Sistem ostane nespremenjen.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Uporabnik odpre pogled opravil.<br>
         2.Korak: Sistem pridobi opravila iz baze.<br>
         3.Korak: Sistem jih prikaže uporabniku.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Ni opravil → prazen seznam.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Napaka pri pridobivanju iz baze → obvestilo uporabniku.</td>
    </tr>
</table>


<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Išči opravila</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 8</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Najti opravila glede na iskalni niz, ki ga vnese uporabnik.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik, Gost</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Iskalni niz je vnesen.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Sistem ostane nespremenjen – prikaže filtrirane rezultate.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Uporabnik vnese iskani niz.<br>
         2.Korak: Sistem poišče ujemanja v bazi.<br>
         3.Korak: Sistem prikaže rezultate iskanja.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Ni najdenih rezultatov → sistem prikaže "Ni zadetkov".</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Napaka pri iskanju v bazi → obvestilo uporabniku.</td>
    </tr>
</table>


<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Filtriraj opravila</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 9</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Prikazati le opravila, ki ustrezajo izbranim kriterijem.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik, Gost</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Opravila obstajajo v sistemu.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Sistem ostane nespremenjen – spremeni se samo prikaz.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Uporabnik odpre filtriranje.<br>
         2.Korak: Izbere filter (datum, status, kategorija).<br>
         3.Korak: Sistem prikaže filtrirana opravila.<br>
         4.Korak: Možnost izbire "Napredno filtriranje".<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Izbran filter ne vrne rezultatov → prikaže se prazen seznam.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Neveljaven filter → sistem izpiše opozorilo.</td>
    </tr>
</table>


<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Napredno filtriranje</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 10</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Omogočiti kombinacijo več naprednih filtrov za natančnejši prikaz opravil.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik, Gost</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Osnovno filtriranje je omogočeno.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Sistem ostane nespremenjen – prikaže rezultat naprednih filtrov.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Uporabnik izbere možnost »Napredno filtriranje«.<br>
         2.Korak: Sistem prikaže dodatne parametre (več filtrov).<br>
         3.Korak: Uporabnik vnese pogoje.<br>
         4.Korak: Sistem prikaže rezultat filtriranja.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Filter se med seboj izključuje → sistem opozori uporabnika.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Napaka pri filtriranju → prikaže se sporočilo o napaki.</td>
    </tr>
</table>


<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Prikaži opravila v koledarju</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 11</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Vizualni prikaz opravil v koledarskem pogledu.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik, Gost</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Opravila imajo določene datume.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Sistem ostane nespremenjen – prikaže koledarski pogled.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Uporabnik odpre pogled koledarja.<br>
         2.Korak: Sistem pridobi opravila z rokom.<br>
         3.Korak: Sistem prikaže opravila na ustreznih datumih.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Ni opravil z datumi → prikaže se prazen koledar.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Napaka pri nalaganju koledarja → sistem prikaže opozorilo.</td>
    </tr>
</table>

<table style="width:100%; border-collapse: collapse; border: 1px solid black;">
    <tr>
        <td style="border: 1px solid black; padding: 8px;">Primer uporabe: Reschedule</td>
        <td style="border: 1px solid black; padding: 8px; width: 30%;">ID: 12</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Cilj: Uporabnik želi spremeniti datum opravila neposredno iz koledarskega pogleda.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Akterji: Uporabnik</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Predpogoji: Opravilo je dodano v koledar in ima določen datum.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Stanje sistema po PU: Posodobi se rok opravila v bazi podatkov.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Scenariji: <br> 
         1.Korak: Uporabnik prestavi opravilo na drug dan (drag & drop).<br>
         2.Korak: Sistem preveri veljavnost novega datuma.<br>
         3.Korak: Sistem shrani spremembo v bazo.<br>
         4.Korak: Koledar se posodobi.<br>
        </td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Alternativni tokovi: Premik na neveljaven datum → sistem prepreči premik.</td>
    </tr>
    <tr>
        <td colspan="3" style="border: 1px solid black; padding: 8px;">Izjeme: Napaka pri shranjevanju novega datuma → opozorilo uporabniku.</td>
    </tr>
</table>
<br />

## 9. Razredni diagram
<img width="2041" height="1381" alt="image" src="https://github.com/user-attachments/assets/c53a2216-db46-492e-b8a1-df01b206cfa2" />

## 10. Opis razrednega diagrama

Ta dokument opisuje razrede aplikacije Todo, njihovo vlogo, namen in ključne metode, ki omogočajo izvedbo funkcionalnosti.

---

## Frontend

### `TodoClientApp`
- **Vloga in namen:** Glavna aplikacija na strani uporabnika, ki skrbi za uporabniški vmesnik, komunikacijo z backendom, prikaz opravil in preverjanje dovoljenj.
- **Ključne metode:**
  - `apiCall(endpoint, options)`: Pošilja HTTP zahteve na strežnik.
  - `loadTodo()`: Nalaganje opravil za trenutnega uporabnika.
  - `handleLogin(event)`, `handleLogout(event)`: Upravljanje prijave in odjave.
  - `checkPermission(action)`: Preveri, ali ima uporabnik pravico za določeno dejanje.
  - `renderClearAndViewTodos()`: Osveži pogled in prikaže opravila.
  - `handleReschedule(id, newDate)`: Pošlje zahtevo za spremembo roka opravila.

---

## Avtentikacija

### `AuthController`
- **Vloga in namen:** Sprejema zahteve za prijavo in registracijo ter jih posreduje v storitveni sloj.
- **Ključne metode:**
  - `login(loginRequest)`: Avtenticira uporabnika in vrne odgovor z žetonom ali napako.
  - `register(registerRequest)`: Ustvari novega uporabnika v sistemu.

### `UserService`
- **Vloga in namen:** Poslovna logika za uporabnike. Skrbi za registracijo in nalaganje uporabniških podatkov.
- **Ključne metode:**
  - `loadUserByUsername(username)`: Poišče uporabnika za prijavo.
  - `registerUser(user)`: Ustvari novega uporabnika in ga shrani v bazo.

### `UserRepository`
- **Vloga in namen:** Dostop do podatkovne baze uporabnikov.
- **Ključna metoda:**
  - `findByUsername(username)`: Vrne uporabnika glede na uporabniško ime.

### `User` (entiteta)
- **Vloga in namen:** Predstavlja uporabnika v sistemu, hrani identiteto in vlogo.
- **Ključne metode:** Getterji in setterji za atribute (`id`, `username`, `password`, `role`).

### `Role` (enum)
- **Vloga in namen:** Določa tip uporabnika.
- **Vrednosti:** 
  - `ADMIN`: polni dostop
  - `GUEST`: omejen dostop

---

## Upravljanje opravil (Todos)

### `TodoController`
- **Vloga in namen:** Sprejema REST zahteve za opravila in jih posreduje v storitveni sloj.
- **Ključne metode:**
  - `getAllTodos()`, `getTodoById(id)`: Pridobivanje opravil.
  - `createTodo(todo)`, `updateTodo(id, todo)`, `deleteTodo(id)`: CRUD operacije.
  - `getCompletedTodos()`, `getIncompleteTodos()`: Filtriranje po statusu.
  - `searchTodos(keyword)`, `filterTodos(criteria)`: Iskanje in filtriranje.
  - `rescheduleTodo(id, newDate, user)`: Sprememba roka opravila.

### `TodoService`
- **Vloga in namen:** Implementacija poslovnega sloja za opravila. Obdeluje zahteve, izvaja poslovno logiko, preverja pravice in koordinira dostop do podatkov preko repozitorija.
- **Ključne metode:** Enake kot v kontrolerju, vendar brez HTTP sloja – izvajajo dejanske operacije nad podatki.

### `TodoRepository`
- **Vloga in namen:** Dostop do podatkovne baze opravil.
- **Ključne metode:**
  - `findAllByUser(user)`: Vrne vsa opravila določenega uporabnika.
  - `findByIdAndUser(id, user)`: Vrne opravilo po ID-ju in uporabniku.
  - `findByCompletedAndUser(completed, user)`: Vrne opravila glede na status.
  - `findByUserAndDueDateBetween(user, start, end)`: Vrne opravila med določenima datumoma.
  - `findByUserAndKeyword(user, keyword)`: Iskanje po ključni besedi.

### `Todo` (entiteta)
- **Vloga in namen:** Predstavlja posamezno opravilo, hrani podatke o naslovu, opisu, statusu, datumih in povezavi z uporabnikom.
- **Ključne metode:** Getterji in setterji za atribute (`id`, `title`, `description`, `completed`, `createdAt`, `updatedAt`, `dueDate`, `user`).

---

## Obravnava napak

### `GlobalExceptionHandler`
- **Vloga in namen:** Centralizirano ravnanje z napakami, da se uporabniku vrne enoten odgovor.
- **Ključne metode:**
  - `handleValidationException(ex)`: Obdelava napak pri validaciji (npr. napačni podatki).
  - `handleGenericException(ex)`: Obdelava splošnih napak (npr. nepričakovane izjeme).

---

## Povzetek dinamike
1. Uporabnik preko `TodoClientApp` pošlje zahtevo.
2. Zahteva gre v `TodoController`, ki jo posreduje `TodoService`.
3. `TodoService` preveri pravice uporabnika in uporabi `TodoRepository` za dostop do podatkov.
4. Rezultat se vrne nazaj v frontend, kjer se prikaže uporabniku.
5. V primeru napak posreduje odgovor `GlobalExceptionHandler`.

---

## 11. Implementacija koledarskega prikaza

### 11.1. Opis funkcionalnosti

Implementirana je funkcionalnost **koledarskega prikaza nalog**, ki omogoča uporabnikom vizualni pregled vseh nalog z določenim rokom za trenutni mesec. Koledar prikazuje naloge na ustreznih datumih, omogoča navigacijo med meseci in vizualno označuje pretekle roke ter opravljene naloge.

### 11.2. Delovanje funkcionalnosti

#### Backend implementacija

Koledarski prikaz je implementiran v backend-u z naslednjimi funkcionalnostmi:

1. **TodoRepository** - Dodana metoda `findByDeadlineYearAndMonth()`:
   - Izvede SQL poizvedbo, ki vrne vse naloge z rokom za določen mesec in leto
   - Uporablja native query z MySQL funkcijama `YEAR()` in `MONTH()` za iskanje

2. **TodoService** - Dodana metoda `getTodosByMonth()`:
   - Pošlje zahtevo repozitoriju in vrača željene naloge

3. **TodoController** - Dodan endpoint `GET /api/todos/calendar`:
   - Sprejema parametra `year` (leto) in `month` (mesec, 1-12)
   - Preverja vhodne podatke
   - Vrne seznam nalog z rokom za trenutni mesec

#### Frontend implementacija

1. **UI komponente**:
   - Dodan gumb "Koledar"
   - Dodano okno v katerem se prikaže koledar
   - Dodani gumbi za premikanje med meseci

2. **JavaScript funkcionalnost**:
   - `showCalendar()` - Odpre okno in prikaže koledar
   - `renderCalendar()` - Generira koledarski prikaz in kliče API z backenda
   - `changeMonth()` - Omogoča premikanje med meseci

3. **Vizualne oznake**:
   - **Pretekle roke** - Rdeče barve za neopravljene naloge
   - **Opravljene naloge** - Zelene barve
   - **Aktivne naloge** - Modre barve
   - **Današnji dan** - Modra obroba
   - **Pretekli dnevi** - Svetlo siva obroba
   - **Prihodnji dnevi** - Temno siva obroba

#### API endpoint

```
GET /api/todos/calendar?year=2025&month=12
```

### 11.3. Prezkus nove funkcionalnosti

#### Korak 1: Dostop do koledarja

1. Odpri aplikacijo v brskalniku (http://localhost:3001)
2. V obrazcu za dodajanje nalog poišči gumb **"Koledar"**
3. Klikni na gumb **"Koledar"**

#### Korak 2: Pregled koledarja

1. Odpre se novo okno s koledarskim prikazom za **trenutni mesec**
2. V koledarju so prikazani:
   - Dnevi v mesecu (ponedeljek - nedelja)
   - Naloge z rokom na ustreznih dnevih
   - Vizualne oznake (danes, pretekle roke, opravljene naloge)

#### Korak 3: Navigacija med meseci

1. Uporabi puščici **←** (prejšnji mesec) in **→** (naslednji mesec) v zgornjem delu odprtega okna
2. Koledar se sproti posodobi z dodanimi novimi nalogami

#### Korak 4: Testiranje z nalogami

1. **Ustvari novo nalogo z rokom:**
   - Vnesi naslov naloge
   - V polju "Rok opravila" izberi datum
   - Klikni "Dodaj nalogo"
   - Odpri koledar in naloga se bo prikazala na ustreznem mestu

2. **Preveri vizualne oznake:**
   - Neopravljene naloge s preteklim rokom so označene rdeče
   - Opravljene naloge so zelene
   - Prihajajoče naloge so modre
   - Današnji dan je označen z modrim ozadjem
  
#### Korak 5: Drag and Drop funkcionalnost
1. Stisni in drži na izbrano nalogo
2. Probaj jo prestaviti na drugi datum
3. Potem ko jo spustiš, se bo njen rok posodobil na koledaru in na seznamu

#### Korak 6: Zapiranje koledarja

- Klikni na gumb **✕** v zgornjem desnem odprega okna za izhod iz koledara

#### Opombe za testiranje

- Koledar prikazuje **samo naloge z določenim rokom za dokončanje**
- Naloge brez roka se v koledarju ne prikažejo
- Če so v enem dnevu več kot 3 naloge se izpiše in več

---

## 12. Unit testiranje

### 12.1. Opis

Implementirani unit testi za funkcionalnost koledarja. Testi pokrivajo service sloj.

### 12.2. Lokacija testov

Unit testi se nahajajo v:
- `backend/src/test/java/com/todo/service/TodoServiceCalendarTest.java`

### 12.3. Zagon testov

Za zagon testov uporabite Maven:

```bash
cd backend
mvn test
```

Za zagon le testov koledarske funkcionalnosti:

```bash
.\mvnw.cmd test -Dtest=TodoServiceCalendarTest
```

### 12.4. Poročilo o testiranju

Poročilo o testiranju je na voljo v mapi `testiranje/porocilo_testiranja.md`.

---




